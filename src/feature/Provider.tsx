import React from 'react'
import { Provider } from "react-redux";
import { persistor, store } from "@/feature/store";
import { PersistGate } from "redux-persist/integration/react"
import { LoaderCircle } from 'lucide-react';

const StateProvider = ({ children }: any) => {
    return (
        <Provider store={store}>
            <PersistGate
                loading={
                    <div className='w-screen h-screen flex items-center justify-center'>
                        <LoaderCircle className='w-8 h-8 animate-spin mr-2' strokeWidth={2} /> Loading...
                    </div>
                }
                persistor={persistor}
            >
                {children}
            </PersistGate>
        </Provider>
    )
}

export default StateProvider
