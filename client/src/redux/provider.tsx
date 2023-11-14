import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import React from "react";
import { Provider } from "react-redux";



export default function ReduxProvider({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store} >
            <PersistGate loading={null} persistor={persistor} >
                {children}
            </PersistGate>
        </Provider>
    );
}