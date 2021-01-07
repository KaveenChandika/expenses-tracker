import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

//Initial state
const initialState = {
  transactions: [],
  error: null,
  loading: true,
};

//Create Context
export const GlobalContext = createContext(initialState);

//Provider
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //Action
  async function getTransactions() {
    try {
      const res = await axios.get("api/v1/transactions");
      dispatch({
        type: "GET_TRANSACTION",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  async function deleteTransaction(id) {
    try {
      await axios.delete(`/api/v1/transactions/${id}`);
      dispatch({
        type: "DELETE_TRANSACTION",
        payload: id,
      });

    } catch (err) {
        dispatch({
          type: "TRANSACTION_ERROR",
          payload: err.response.data.error,
        });
    }
  }

  async function addTransaction(transaction) {
    const config = {
      headers:{
        'Content-Type':'application/json'
      }
    }

    try {
      const res = await axios.post('/api/v1/transactions',transaction,config);

      dispatch({
        type: "ADD_TRANSACTION",
        payload: res.data.data,
      });

    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response.data.error,
      });
    }

    
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction,
        getTransactions,
        error: state.error,
        loading: state.loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
