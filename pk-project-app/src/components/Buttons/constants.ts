import { IBoard, IColumn } from "../../state";

export interface ICardButtonProps {
    route: string,
    selectedColumn: IColumn
}

export interface IColumnButtonProps {
    route: string,
    selectedBoard: IBoard
}