import { IColumn } from "../../state";
import { Columns } from "../DefaultScrumBoard/constants";

export interface IButtonProps {
    route: string,
    selectedColumn: IColumn
}