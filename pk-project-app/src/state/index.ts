import { combineReducers } from "redux";
import { Cards } from "../components/DefaultScrumBoard/constants";
import boardReducer from "./boardColumns/reducers";
import columnReducer from "./columnCards/reducers";

export interface IColumn {
    id: string;
    title: string;
    position: number;
    boardId: string;
    cards: Cards[];
}

export interface IBoard {
    id: string;
    name: string;
    teamId: string;
    boardTypeId: string;
}

export interface IState {
    column: IColumn,
    board: IBoard
}

export const rootReducer = combineReducers({
    column: columnReducer,
    board: boardReducer
});