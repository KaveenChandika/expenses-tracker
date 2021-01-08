import React,{useContext,useEffect} from 'react'
import {GlobalContext} from '../context/GlobalState';
import Transaction from './Transaction';
function TransactionList() {
    const {transactions} = useContext(GlobalContext);
    const {getTransactions} = useContext(GlobalContext);
    useEffect(()=>{
        getTransactions();
    },[])
    return (
        <div>
            <h3>History</h3>
            <ul className="list">
                {transactions.map(transaction => (
                     <Transaction key={transaction.id} transaction={transaction} />
                ))}
               
            </ul>
        </div>
    )
}

export default TransactionList
