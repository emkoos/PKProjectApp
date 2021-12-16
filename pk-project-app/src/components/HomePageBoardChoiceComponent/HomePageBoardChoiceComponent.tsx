import { useEffect, useState } from "react";
import { getBoardTypes } from "../../api/boardTypes";
import { BoardTypes } from './constants';
import { Container, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomePageBoardChoiceComponent = () =>{
    const [boardTypes, setBoardTypes] = useState<BoardTypes[]>();

    useEffect(() => {
        getBoardTypes().then(response => {
            setBoardTypes(response)
        }).catch(err => console.error(err));
    })

    return (
        <>
            <Container>
                <Row>
                    <h3>Wybierz na jakiej tablicy chcesz działać</h3>
                </Row>
                <Row>
                    {boardTypes?.map((boardType, index) =>
                        <Button key={index} type="submit">{boardType.name}</Button>
                    )}
                    <Link to = "/utworz-tablice">
                        <Button type="submit">Własna</Button>
                    </Link>
                    
                </Row>
            </Container>
        </>
    )
}

export default HomePageBoardChoiceComponent;