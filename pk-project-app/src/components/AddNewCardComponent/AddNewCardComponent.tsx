import { Formik } from "formik"
import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { useNavigate } from "react-router"
import { IForm } from "./constants";


const AddNewCardComponent = () => {
    const navigate = useNavigate();

    const [initialValues, setInitialValues] = useState<IForm>({
        localisation: 3
    })

    const submitHandler = (values: any, handlers: any) => {
        navigate('/my-scrum');
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
                                <Form.Label className="w-100 text-start px-0">Lokalizacja</Form.Label>
                                <Form.Select name="localisation" className="w-100 text-start px-0 ps-3" value={values.localisation} onChange={handleChange}>
                                    <option value={"elo"}>elos</option>
                                    <option value={"elo1"}>elos1</option>
                                    <option value={"elo2"}>elos2</option>
                                </Form.Select>
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