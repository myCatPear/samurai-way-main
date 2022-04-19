import React from "react";
import {ReducersType, store} from "./redux/redux-store";

export const StoreContext = React.createContext<ReducersType>(store)

type ProviderPropsType = {
    store: ReducersType
    children: any
}

export const Provider: React.FC<ProviderPropsType> = (
    {
        store,
        children
    }
) => {
    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    )
}