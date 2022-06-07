import {applyMiddleware, combineReducers, createStore} from "redux";
import {profileReducer} from "./profile-reducer";
import {dialogsReducer} from "./dialogs-reducer";
import {usersReducer} from "./users-reducer";
import {authReducer} from "./auth-reducer";
import thunkMiddleware from "redux-thunk";
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


//стучимся до стора с любого места
// @ts-ignore
window.store = store