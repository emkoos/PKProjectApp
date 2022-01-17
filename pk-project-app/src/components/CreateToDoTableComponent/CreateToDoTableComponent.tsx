import { Formik } from "formik"
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router"
import { createBoard } from "../../api/boards";
import { createCard } from "../../api/cards";
import { createColumn } from "../../api/columns";
import { IColumn, IState } from "../../state";
import { setBoard } from "../../state/boardColumns/action";
import { setColumns } from "../../state/columnCards/action";
import { Board, IForm } from "./constants";


const CreateToDoTableComponent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const defaultBoardTypeId = "83615ffa-f6b8-4657-a9f5-40fc10921735";
    const defaultTeamId = "2fec32ab-53a1-467e-a714-b50ea50b49e8";

    const [initialValues, setInitialValues] = useState<IForm>({
        localisation: 3
    })

    const submitHandler = (values: any, handlers: any) => {
        createBoard(values.name, defaultTeamId, defaultBoardTypeId)
            .then(response => {
                createNewBoard(response, values.name);
            }).catch(error => {
                console.log(error);
            });
    };

    const createNewBoard = async (newBoardId: any, newBoardName: string) => {
        await createColumn("ToDo", 1, newBoardId);
        await createColumn("Done", 3, newBoardId);

        const newBoard: Board = {
            id: newBoardId,
            name: newBoardName,
            teamId: defaultTeamId,
            boardTypeId: defaultBoardTypeId
        }

        await dispatch(setBoard(newBoard));

        await navigate(`/table-${defaultBoardTypeId}`)
    }

    return (
        <Container>
            <>
                <h1 className="fs-3 fw-bold d-flex justify-content-center">Dodaj tablicę ToDo</h1>
                <h3 className="fs-6 fw-light m-0 d-flex justify-content-center">Uzupełnij formularz</h3>
                <Formik
                    onSubmit={submitHandler}
                    initialValues={initialValues}
                    enableReinitialize
                >
                    {({handleSubmit, handleChange, handleBlur, values, touched, errors}) => (
                        <Form onSubmit={handleSubmit}>
                            <Row className="mt-3">
                                <Form.Label className="w-100 text-start px-0">Nazwa tablicy</Form.Label>
                                <Form.Control type="textarea" name="name" className="w-100 text-start px-0 ps-3" onChange={handleChange} />
                            </Row>

                            <Row>
                                <Col className="my-3 d-flex justify-content-center justify-content-md-center align-items-stretch px-0">
                                    <Button type="submit" className="w-100 px-0">Dodaj nową tablicę ToDo</Button>
                                </Col>
                            </Row>
                        </Form>
                    )}
                </Formik>
            </>
        </Container>
    )
}

export default CreateToDoTableComponent;