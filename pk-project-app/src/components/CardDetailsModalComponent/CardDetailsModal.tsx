import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { editCard } from "../../api/cards";
import { getStatus, getStatuses } from "../../api/statuses";
import { ICard, IState, IUser } from "../../state";
import { Status } from "./constants";

const CardDetailsModal = () => {
    const [statuses, setStatuses] = useState<Status[] | undefined>();
    const selectedCard = useSelector<IState, ICard>((state) => state.card);

    useEffect(() => {
      getStatuses().then((response) => {
        setStatuses(response)
      }).catch(err => console.log(err))
    }, [])

    const submitHandler = (values: any, handlers: any) => {
      editCard(selectedCard.id, values.title, values.description, values.userEmail, selectedCard.columnId, values.statusId, values.deadlineDate, values.priority, values.estimate, "");
    }

    return (
      <Formik 
        onSubmit={submitHandler}
        initialValues={selectedCard}
        enableReinitialize>
      {({ handleSubmit, handleChange, handleBlur, values, touched, errors}) => (
        <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Nazwa karty</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder={selectedCard.title}
            defaultValue={selectedCard.title}
            onChange={handleChange}
          />
        </Form.Group>
  
        <Form.Group>
          <Form.Label>Przypisany użytkownik</Form.Label>
          <Form.Control
            type="text"
            name="userEmail"
            placeholder={selectedCard.userEmail}
            defaultValue={selectedCard.userEmail}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Opis</Form.Label>
          <Form.Control
            type="text"
            name="description"
            placeholder={selectedCard.description}
            defaultValue={selectedCard.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Termin</Form.Label>
          <Form.Control
            type="text"
            name="deadlineDate"
            placeholder={selectedCard.deadlineDate}
            defaultValue={selectedCard.deadlineDate}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Priorytet</Form.Label>
          <Form.Control
            type="number"
            name="priority"
            defaultValue={selectedCard.priority}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Effort</Form.Label>
          <Form.Control
            type="number"
            name="estimate"
            defaultValue={selectedCard.estimate}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Status</Form.Label>
          <Form.Select name="statusId" className="select-input" value={values.statusId} onChange={handleChange}>
            {statuses?.map((status, index) =>
              <option key={index} value={status.id}>{status.name}</option>
            )}
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
      )}
      </Formik>
    );
  };

  export default CardDetailsModal;