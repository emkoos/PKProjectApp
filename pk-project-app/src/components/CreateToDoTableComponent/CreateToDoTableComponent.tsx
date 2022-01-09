import { Formik } from "formik"
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router"
import { createBoard } from "../../api/boards";
import { createCard } from "../../api/cards";
import { IColumn, IState } from "../../state";
import { setColumns } from "../../state/columnCards/action";
import { IForm } from "./constants";


const AddNewCardComponent = () => {
    const navigate = useNavigate();
    const defaultBoardTypeId = "83615ffa-f6b8-4657-a9f5-40fc10921735";

    const [initialValues, setInitialValues] = useState<IForm>({
        localisation: 3
    })

    const submitHandler = (values: any, handlers: any) => {
        createBoard(values.name, "4c977dd4-e2de-4809-9d98-91137c966d52", defaultBoardTypeId)
            .then(() => {
                navigate('/my-todo');
            }).catch(error => {
                console.log(error);
            });
    };

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

export default AddNewCardComponent;