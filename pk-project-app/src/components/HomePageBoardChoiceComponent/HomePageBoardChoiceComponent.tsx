import { useEffect, useState } from "react";
import { getBoardTypes } from "../../api/boardTypes";
import { BoardTypes } from './constants';
import { Container, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Board } from "../CreateScrumTableComponent/constants";
import { getBoardByTeamId } from "../../api/boards";
import SelectBoardButton from "../Buttons/SelectBoardButton";

const HomePageBoardChoiceComponent = () =>{
    const [boardTypes, setBoardTypes] = useState<BoardTypes[]>();
    const [boards, setBoards] = useState<Board[]>();
    const defaultTeamId = "2fec32ab-53a1-467e-a714-b50ea50b49e8";
    let boardType = "";

    useEffect(() => {
        getBoardTypesAndBoards();
    }, [])

    const getBoardTypesAndBoards = async () => {
        const boardTypesResponse = await getBoardTypes();
        setBoardTypes(boardTypesResponse);
        
        const boardsResponse = await getBoardByTeamId(defaultTeamId);
        setBoards(boardsResponse);
    }

    const setBoardType = (boardTypeId: string) => {
        if(boardTypeId == "21adbda8-c90d-49dd-9778-e9ab9ac86d46")
            boardType = "scrum";
        else if(boardTypeId == "83615ffa-f6b8-4657-a9f5-40fc10921735")
            boardType = "todo";
        else if(boardTypeId == "f6afea8f-17ce-4a31-9227-ba426f7ba78b")
            boardType = "kanban";
        else boardType = "";
    }

    return (
        <>
            <Container>
                <Row>
                    <h3>Wybierz na jakiej tablicy chcesz działać</h3>
                </Row>
                <Row>
                    {boardTypes?.map((boardType, index) =>
                        <Link to={`/new-${boardType.name}`}>
                            <Button key={index} type="submit">{boardType.name}</Button>
                        </Link>
                    )}
                    
                </Row>

                <Row>
                    <h3>Twoje tablice:</h3>
                </Row>
                <Row>
                    {boards?.map((board, index) =>     
                        <span className="mt-4 mt-md-0 me-5"><SelectBoardButton route={`/table`} selectedBoard={board} /></span>
                    )}           
                </Row>
            </Container>
        </>
    )
}

export default HomePageBoardChoiceComponent;