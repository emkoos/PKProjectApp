import { combineReducers } from "redux";
import { Cards } from "../components/DefaultScrumBoard/constants";
import boardReducer from "./boardColumns/reducers";
import columnReducer from "./columnCards/reducers";
import tokenReducer from "./userToken/reducers";
import infoUserReducer from "./userInfo/reducers";
import cardReducer from "./cardInfo/reducers";

export interface IColumn {
    id: string;
    title: string;
    position: number;
    boardId: string;
    cards: Cards[];
}

export interface ICard {
    id: string;
    title: string;
    description: string;
    userEmail: string;
    columnId: string;
    statusId: string;
    deadlineDate: string;
    priority: number;
    estimate: number;
    attachement: string;
}

export interface IBoard {
    id: string;
    name: string;
    teamId: string;
    boardTypeId: string;
}

export interface IState {
    column: IColumn,
    board: IBoard,
    card: ICard,
    userInfo: IUser
}

export interface IToken {
    token: string
}

export interface IUser {
    email: string,
    username: string,
    firstname: string,
    lastname: string,
    photo: string,
    userTeams: [],
    comments: [],
    cards: []
}

export const rootReducer = combineReducers({
    column: columnReducer,
    board: boardReducer,
    token: tokenReducer,
    card: cardReducer,
    userInfo: infoUserReducer
});