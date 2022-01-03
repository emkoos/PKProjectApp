import { useEffect, useState } from "react";
import { getBoardTypes } from "../../api/boardTypes";
import { BoardTypes, Cards, Columns } from './constants';
import { Container, Row, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getColumnByBoardId } from "../../api/columns";
import { getCardByColumnId } from "../../api/cards";

const DefaultScrumBoardComponent = () =>{
    const scrumBoardId = "a921cea9-6be0-4de3-b6d7-4f9d67096cf9"; 

    const [boardTypes, setBoardTypes] = useState<BoardTypes[]>();
    const [columns, setColumns] = useState<Columns[]>();
    const [cards, setCards] = useState<Cards[]>([]);

    useEffect(() => {
        getColumnByBoardId(scrumBoardId).then(response => {
            setColumns(response);
            loadCards();
        }).catch(err => console.error(err));
    }, [])

    const loadCards = () => {
        {columns?.map((column, index) =>
            getCardByColumnId(column.id).then(response => {
                setCards([...cards, response]);
            }).catch(err => console.error(err)) 
        )}     
    };

    return (
        <>
            <Container>
                    <h3>Kolumny</h3>
                <Row>
                    {columns?.map((column, index) =>
                        <Col>
                            {column.position} - {column.title}

                            <div>
                                {cards?.map((card, key) => 
                                    <>
                                        {card.title}
                                    </>
                                )}
                            </div>
                        </Col>
                    )}                
                </Row>
            </Container>
        </>
    )
}

export default DefaultScrumBoardComponent;