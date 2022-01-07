import { combineReducers } from "redux";
import { Cards } from "../components/DefaultScrumBoard/constants";
import columnReducer from "./columnCards/reducers";

export interface IColumn {
    id: string;
    title: string;
    position: number;
    boardId: string;
    cards: Cards[];
}

export interface IState {
    column: IColumn
}

export const rootReducer = combineReducers({
    column: columnReducer
});