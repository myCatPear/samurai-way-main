import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {ProfileActionsType, profileReducer} from "./profile-reducer";
import {DialogsActionsType, dialogsReducer} from "./dialogs-reducer";
import {UsersActionType, usersReducer} from "./users-reducer";
import {AuthActionType, authReducer} from "./auth-reducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {FormAction, reducer as formReducer} from 'redux-form'
import {AppActionType, appReducer} from "./app-reducer";

const reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

//export const store = createStore(reducers, applyMiddleware(thunkMiddleware))


//определить автоматически тип объекта store
export type ReduxStoreType = typeof store

//определить тип объекта состояния
export type AppStateType = ReturnType<typeof reducers>

export type AppActionsType = AuthActionType |
    DialogsActionsType |
    ProfileActionsType |
    UsersActionType
    | FormAction
    | AppActionType

export type AppDispatch = ThunkDispatch<AppStateType, unknown, AppActionsType>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppActionsType>

//стучимся до стора с любого места
// @ts-ignore
window.store = store