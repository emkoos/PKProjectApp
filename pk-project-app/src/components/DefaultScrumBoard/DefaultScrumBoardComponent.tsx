import { useEffect, useState } from "react";
import { Columns } from './constants';
import { Container, Row, Button, Col, Card } from 'react-bootstrap';
import { getColumnByBoardId } from "../../api/columns";
import { getCardByColumnId } from "../../api/cards";
import AddNewCardButton from "../Buttons/AddNewCardButton";
import AddNewColumnButton from "../Buttons/AddNewColumnButton";
import { IBoard, IState } from "../../state";
import { useSelector } from "react-redux";

const DefaultScrumBoardComponent = () =>{
    const scrumBoard = useSelector<IState, IBoard>((state) => state.board);

    const [columns1, setColumns1] = useState<Columns[]>();
    const [columnsWithCards, setColumnsWithCards] = useState<Columns[]>();

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

    return (
        <>
            <Container> 
                    <h3>Kolumny</h3>
                <Row>
                    {columnsWithCards?.map((column, index) =>
                        <Col>
                            {column.position} - {column.title}

                            {column.cards?.map((card, key) =>
                                <p><b>{card.title}</b></p>
                            )}

                            <span className="mt-4 mt-md-0 me-5"><AddNewCardButton route={"/add-new-card"} selectedColumn={column} /></span>
                        </Col>
                    )}                
                </Row>
                <span className="mt-4 mt-md-0 me-5"><AddNewColumnButton route={"/add-new-column"} selectedBoard={scrumBoard} /></span>
            </Container>
        </>
    )
}

export default DefaultScrumBoardComponent;