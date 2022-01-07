import { useEffect, useState } from "react";
import { Columns } from './constants';
import { Container, Row, Button, Col, Card } from 'react-bootstrap';
import { getColumnByBoardId } from "../../api/columns";
import { getCardByColumnId } from "../../api/cards";
import AddNewCardButton from "../AddNewCardButton/AddNewCardButton";

const DefaultScrumBoardComponent = () =>{
    const scrumBoardId = "a921cea9-6be0-4de3-b6d7-4f9d67096cf9"; 
    const [columns1, setColumns1] = useState<Columns[]>();
    const [columnsWithCards, setColumnsWithCards] = useState<Columns[]>();

    useEffect(() => {
        getColumnsAndCards();
    }, [])

    const getColumnsAndCards = async () => {
        const columnsResult = await getColumnByBoardId(scrumBoardId);
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

                            {column.cards.map((card, key) =>
                                <p><b>{card.title}</b></p>
                            )}

                            <span className="mt-4 mt-md-0 me-5"><AddNewCardButton route={"/add-new-card"} selectedColumn={column} /></span>
                        </Col>
                    )}                
                </Row>
            </Container>
        </>
    )
}

export default DefaultScrumBoardComponent;