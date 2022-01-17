import React, { useEffect, useState, useRef } from "react";
import './Style.css';
import { Columns } from './constants';
import { Container, Row, Button, Col, Card, Modal } from 'react-bootstrap';
import { getColumnByBoardId } from "../../api/columns";
import { getCardByColumnId, getCardById, editCard } from "../../api/cards";
import AddNewCardButton from "../Buttons/AddNewCardButton";
import AddNewColumnButton from "../Buttons/AddNewColumnButton";
import { IBoard, ICard, IState } from "../../state";
import { useDispatch, useSelector } from "react-redux";
import columnReducer from "../../state/columnCards/reducers";
import { reduceEachTrailingCommentRange } from "typescript";
import { setCard } from "../../state/cardInfo/action";
import CardDetailsModal from "../CardDetailsModalComponent/CardDetailsModal";

const DefaultScrumBoardComponent = () =>{
    const scrumBoard = useSelector<IState, IBoard>((state) => state.board);
    
    const dispatch = useDispatch();
    const [columns1, setColumns1] = useState<Columns[]>();
    const [columnsWithCards, setColumnsWithCards] = useState<Columns[]>();
    const [show, setShow] = useState(false);

    const handleShow = async (card: any) => {
        await dispatch(setCard(card));
        await setShow(true);
    };
    const handleClose = () => setShow(false);
    const refOld = useRef("");
    const refNew = useRef("");
    const refCardId = useRef("");
    const refOutSide = useRef(false);

    useEffect(() => {
        getColumnsAndCards();
    }, [])

    const getColumnsAndCards = async () => {
        const columnsResult = await getColumnByBoardId(scrumBoard.id);
        setColumns1(columnsResult);
        const values = await Promise.all<Columns>(columnsResult?.map(async (result: any) => {
            const response = await getCardByColumnId(result.id);

            return {
                ...result,
                cards: response
            }
        }));
        setColumnsWithCards(values);    
    }

    const dragStartHandler = async (event: React.DragEvent<HTMLElement>, cId:any, oldCId:any) => {
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData("text/html", event.currentTarget.outerHTML);

        refOld.current = oldCId;
        refCardId.current = cId;
        refNew.current = "";
    };

    const dragEndHandler = (event: React.DragEvent<HTMLElement>, columnId:any) => {
        if(refOutSide.current === true) {
            if(refNew.current !== refOld.current)
                event.currentTarget.outerHTML = "";

            refOld.current = "";
            refOutSide.current = false;
        }
    };

    const dropHandler = async (event: React.DragEvent<HTMLElement>, columnId:any) => {
        event.preventDefault();
        if(columnId !== "" && refOld.current !== "") {
            if(columnId !== refOld.current) {
                refOutSide.current = true;
                event.currentTarget.innerHTML += event.dataTransfer.getData("text/html");

                //@ts-ignore
                let childNodes = event.nativeEvent.path[event.nativeEvent.path.length - 9].childNodes;
                for(let i = 0; i < childNodes.length; i++) {
                    if(i > 1) {
                        let cardId = childNodes[i].attributes[0].value;
                        childNodes[i].attributes[1].value = columnId;
                        childNodes[i].addEventListener('dragstart', (e: React.DragEvent<HTMLElement>) => dragStartHandler(e, cardId, columnId));
                        childNodes[i].addEventListener('dragend', (e: React.DragEvent<HTMLElement>) => dragEndHandler(e, columnId))
                    }
                }

                if(refCardId.current !== "") {
                    let response = await getCardById(refCardId.current);
                    await editCard(response.id, response.title, response.description, response.userEmail, columnId, response.statusId, response.deadlineDate, response.priority, response.estimate, response.attachment);
                    refCardId.current = "";
                    refOld.current = "";
                }
            }
        }
    };

    const allowDrop = (event: React.DragEvent<HTMLElement>) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };

    const dragEnterHandler = (event: React.DragEvent<HTMLElement>) => {
        //@ts-ignore
        let newcolumnid = event.nativeEvent.path[event.nativeEvent.path.length - 9].attributes[0].value
        refNew.current = newcolumnid
    }

    return (
            <Container> 
                    <h3>Tablica Scrum</h3>
                <Row>
                    {columnsWithCards?.sort((a, b) => a.position-b.position)
                    .map((column, index) =>
                        <Col className="table-column border bg-dark" key={index} data-columnid={column.id} onDragEnter={dragEnterHandler} onDragOver={allowDrop} onDrop={(event) => dropHandler(event, column.id)} draggable={false}>
                            {column.position} - {column.title}
                            <span className="mt-4 mt-md-0 me-5"><AddNewCardButton route={"/add-new-card"} selectedColumn={column} /></span>
                            {column.cards?.sort((a,b) => a.priority-b.priority)
                            .map((card, key) =>
                            <Card className="column-card" key={key} data-cardid={card.id} data-columnid={card.columnId} onDragStart={(event) => dragStartHandler(event, card.id, card.columnId)} onDragEnd={(event) => dragEndHandler(event, column.id)} draggable={true} >
                            <Card.Body>
                                <Card.Title>{card.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{card.deadlineDate}</Card.Subtitle>
                                <Card.Text >{card.userEmail}</Card.Text>
                                <Card.Text>
                                    {card.description}
                                </Card.Text>
                                <Button variant="primary" onClick={() => handleShow(card)}>
                                    Szczegóły
                                </Button>                            
                            </Card.Body>
                        </Card>
                            )}
                        </Col>
                    )}         
                </Row>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Login Form</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <CardDetailsModal />
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close Modal</Button>
                    </Modal.Footer>
                </Modal>
                <span className="mt-4 mt-md-0 me-5"><AddNewColumnButton route={"/add-new-column"} selectedBoard={scrumBoard} /></span>
            </Container>
    )
}

export default DefaultScrumBoardComponent;