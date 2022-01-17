import { useEffect, useRef, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import './Style.css';
import { editCard, getCardByColumnId, getCardById } from "../../api/cards";
import { getColumnByBoardId } from "../../api/columns";
import { IBoard, IState } from "../../state";
import AddNewCardButton from "../Buttons/AddNewCardButton";
import AddNewColumnButton from "../Buttons/AddNewColumnButton";
import { Columns } from "./constants";

const DefaultKanbanBoardComponent = () =>{
    const scrumBoard = useSelector<IState, IBoard>((state) => state.board);

    const [columns1, setColumns1] = useState<Columns[]>();
    const [columnsWithCards, setColumnsWithCards] = useState<Columns[]>();
    const refOld = useRef("");
    const refNew = useRef("");
    const refCardId = useRef("");

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
        if(refNew.current !== refOld.current)
            event.currentTarget.outerHTML = "";

        refOld.current = "";
    };

    const dropHandler = async (event: React.DragEvent<HTMLElement>, columnId:any) => {
        event.preventDefault();
        if(columnId !== refOld.current) {
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
                refCardId.current = ""
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
        <>
            <Container> 
                    <h3>Tablica Kanban</h3>
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
                                                            
                            </Card.Body>
                        </Card>
                            )}
                        </Col>
                    )}         
                </Row>
                <span className="mt-4 mt-md-0 me-5"><AddNewColumnButton route={"/add-new-column"} selectedBoard={scrumBoard} /></span>
            </Container>
        </>
    )
}

export default DefaultKanbanBoardComponent;