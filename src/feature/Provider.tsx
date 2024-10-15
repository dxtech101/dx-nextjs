import React from 'react'
import { Provider } from "react-redux";
import { persistor, store } from "@/feature/store";
import { PersistGate } from "redux-persist/integration/react"

const StateProvider = ({ children }: any) => {
    return (
        <Provider store={store}>
            <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    )
}

export default StateProvider
