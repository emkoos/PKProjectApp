import { useEffect, useState } from "react";
import { Columns } from './constants';
import { Container, Row, Button, Col, Card } from 'react-bootstrap';
import { getColumnByBoardId } from "../../api/columns";
import { getCardByColumnId } from "../../api/cards";
import AddNewCardButton from "../Buttons/AddNewCardButton";
import AddNewColumnButton from "../Buttons/AddNewColumnButton";

const DefaultScrumBoardComponent = () =>{
    
    const scrumBoard: any = {
        id: "a921cea9-6be0-4de3-b6d7-4f9d67096cf9",
        name: "Moja Tablica",
        teamId: "2fec32ab-53a1-467e-a714-b50ea50b49e8",
        boardTypeId: "21adbda8-c90d-49dd-9778-e9ab9ac86d46"
    };
    
    
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