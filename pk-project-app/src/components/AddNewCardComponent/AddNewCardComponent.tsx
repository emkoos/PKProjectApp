import { Formik } from "formik"
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router"
import { createCard } from "../../api/cards";
import { IColumn, IState } from "../../state";
import { setColumns } from "../../state/columnCards/action";
import { IForm } from "./constants";


const AddNewCardComponent = () => {
    const navigate = useNavigate();
    const [columnId, setColumnId] = useState<string>();
    const column = useSelector<IState, IColumn>((state) => state.column);

    const [initialValues, setInitialValues] = useState<IForm>({
        localisation: 3
    })

    useEffect(() => {
        setColumnId(column.id);
    }, [])

    const submitHandler = (values: any, handlers: any) => {
        console.log(values.title);
        console.log(values.description);
        console.log(values.email);
        console.log(columnId);
        console.log(values.status);
        console.log(new Date().toString());
        console.log(values.priority);
        console.log(values.estimate);

        createCard(values.title, values.description, values.email, columnId, values.status, "18.11.2021 20:30:03", values.priority, values.estimate, "2")
            .then(() => {
                navigate('/my-scrum');
            }).catch(error => {
                console.log(error);
            });
    };

    return (
        <Container>
            <>
                <h1 className="fs-3 fw-bold d-flex justify-content-center">Dodaj swoją kartę</h1>
                <h3 className="fs-6 fw-light m-0 d-flex justify-content-center">Uzupełnij formularz</h3>
                <Formik
                    onSubmit={submitHandler}
                    initialValues={initialValues}
                    enableReinitialize
                >
                    {({handleSubmit, handleChange, handleBlur, values, touched, errors}) => (
                        <Form onSubmit={handleSubmit}>
                            <Row className="mt-3">
                                <Form.Label className="w-100 text-start px-0">Tytuł</Form.Label>
                                <Form.Control type="textarea" name="title" className="w-100 text-start px-0 ps-3" onChange={handleChange} />
                            </Row>
                            <Row className="mt-3">
                                <Form.Label className="w-100 text-start px-0">Opis</Form.Label>
                                <Form.Control type="textarea" name="description" className="w-100 text-start px-0 ps-3" onChange={handleChange} />
                            </Row>
                            <Row className="mt-3">
                                <Form.Label className="w-100 text-start px-0">Email</Form.Label>
                                <Form.Control type="textarea" name="email" className="w-100 text-start px-0 ps-3" onChange={handleChange} />
                            </Row>
                            <Row className="mt-3">
                                <Form.Label className="w-100 text-start px-0">Status ID</Form.Label>
                                <Form.Control type="textarea" name="status" className="w-100 text-start px-0 ps-3" onChange={handleChange} />
                            </Row>

                            <Row className="mt-3">
                                <Form.Label className="w-100 text-start px-0">Priorytet</Form.Label>
                                <Form.Control type="number" min="1" name="priority" className="w-100 text-start px-0 ps-3" onChange={handleChange} />
                            </Row>
                            <Row className="mt-3">
                                <Form.Label className="w-100 text-start px-0">Estymata</Form.Label>
                                <Form.Control type="number" min="1" name="estimate" className="w-100 text-start px-0 ps-3" onChange={handleChange} />
                            </Row>

                            <Row>
                                <Col className="my-3 d-flex justify-content-center justify-content-md-center align-items-stretch px-0">
                                    <Button type="submit" className="w-100 px-0">Dodaj nową karte</Button>
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