import {combineReducers, createStore} from "redux";
import {profileReducer} from "./profile-reducer";
import {dialogsReducer} from "./dialogs-reducer";
import {usersReducer} from "./users-reducer";

const reducers = combineReducers({
    profilePage:profileReducer,
    dialogsPage:dialogsReducer,
    usersPage:usersReducer
})


export const store = createStore(reducers)


//определить автоматически тип объекта store
export type ReduxStoreType = typeof store

//определить тип объекта состояния
export type AppStateType = ReturnType<typeof reducers>


//стучимся до стора с любого места
// @ts-ignore
window.store = store