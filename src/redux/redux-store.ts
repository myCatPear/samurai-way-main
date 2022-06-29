import {applyMiddleware, combineReducers, createStore} from "redux";
import {ProfileActionsType, profileReducer} from "./profile-reducer";
import {DialogsActionsType, dialogsReducer} from "./dialogs-reducer";
import {UsersActionType, usersReducer} from "./users-reducer";
import {AuthActionType, authReducer} from "./auth-reducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk";
import { reducer as formReducer } from 'redux-form'

const reducers = combineReducers({
    profilePage:profileReducer,
    dialogsPage:dialogsReducer,
    usersPage:usersReducer,
    auth:authReducer,
    form:formReducer
})


export const store = createStore(reducers, applyMiddleware(thunkMiddleware))


//определить автоматически тип объекта store
export type ReduxStoreType = typeof store

//определить тип объекта состояния
export type AppStateType = ReturnType<typeof reducers>

export type AppActionsType = AuthActionType |
    DialogsActionsType |
    ProfileActionsType |
    UsersActionType

export type AppDispatch = ThunkDispatch<AppStateType, unknown, AppActionsType>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppActionsType>

//стучимся до стора с любого места
// @ts-ignore
window.store = store