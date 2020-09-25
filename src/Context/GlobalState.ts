import React, {createContext, useReducer, ReactElement} from 'react';

interface initial {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirm_password: string;
    contact: string;
    designation: string;
    name: string;
    card: string;
    cvc: string;
}

interface Props {
    children: any;
}

const initialState : initial = {
    first_name : "",
    last_name: "",
    email : "",
    password: "",
    confirm_password: "",
    contact: "",
    designation: "",
    name: "",
    card: "",
    cvc: ""
}

const ActionContext: React.Context<initial> = createContext(initialState);

// const GlobalState = ({children}: Props): ReactElement => {
//     const [state, dispatch] = useReducer(Reducer, initialState);

//     return (
//         <ActionContext.Provider value={{
//             data : state,
//             dispatch
//         }}
//         >
//             {children}
//         </ActionContext.Provider>
//     )
// }

// export {
//     ActionContext,
//     GlobalState
// }