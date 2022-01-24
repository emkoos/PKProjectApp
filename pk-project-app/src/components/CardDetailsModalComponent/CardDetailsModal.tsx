import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { editCard } from "../../api/cards";
import { getStatus, getStatuses } from "../../api/statuses";
import { ICard, IState, IUser } from "../../state";
import { Status } from "./constants";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DateTimePicker } from "@mui/lab";
import { TextField } from "@mui/material";

const CardDetailsModal = () => {
    const [statuses, setStatuses] = useState<Status[] | undefined>();
    const [date, setDate] = useState<Date | null | undefined>();
    const selectedCard = useSelector<IState, ICard>((state) => state.card);

    useEffect(() => {
      getStatuses().then((response) => {
        setStatuses(response)
      }).catch(err => console.log(err))
    }, [])

    const submitHandler = (values: any, handlers: any) => {
      console.log(date);
      let month: any =(date) ? date.getMonth() + 1 : undefined;
      let dateString: any = (date) ? date.getFullYear().toString() + '-' + month + '-' + date.getDate().toString() : undefined;

      // editCard(selectedCard.id, values.title, values.description, values.userEmail, selectedCard.columnId, values.statusId, dateString, values.priority, values.estimate, "");
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
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label="DateTimePicker"
              value={date}
              onChange={(date) => {
                setDate(date);
              }}
            />
          </LocalizationProvider>
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