import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { ICard, IState, IUser } from "../../state";

const CardDetailsModal = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const selectedCard = useSelector<IState, ICard>((state) => state.card);

    return (
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder={selectedCard.title}
            value={selectedCard.title}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
  
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="text"
            placeholder={selectedCard.userEmail}
            value={selectedCard.userEmail}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remember Me!" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    );
  };

  export default CardDetailsModal;