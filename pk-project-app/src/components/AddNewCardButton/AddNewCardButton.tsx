import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { IColumn } from "../../state";
import { setColumns } from "../../state/columnCards/action";
import { IButtonProps } from "./constants";

const AddNewCardButton= (props: IButtonProps) => {
    const dispatch = useDispatch();

    const setSelectedColumn = () => {
        dispatch(setColumns(props.selectedColumn));
    }

    return (
        <Link to={{pathname: props.route}}>
            <Button onClick={setSelectedColumn} variant="primary">Dodaj kartę +</Button>
        </Link>
    )
}

export default AddNewCardButton;