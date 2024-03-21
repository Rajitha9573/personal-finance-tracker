import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Cards from "../components/Cards/Cards";
import { auth, db } from "../FireBase";
import { toast } from "react-toastify";
import { addDoc, collection, getDocs, query } from "firebase/firestore";

import AddIncome from "../components/Modal/AddIncome";
import AddExpense from "../components/Modal/AddExpense";
import { useAuthState } from "react-firebase-hooks/auth";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [incomeModel, setIncomeModal] = useState(false);
  const [expenseModal, setExpenceModal] = useState(false);
  const [transaction, setTransaction] = useState([]);
  const [loading, setLoading] = useState(false)

  function showIncomeModel() {
    setIncomeModal(true);
  }
  function showExpenceModel() {
    setExpenceModal(true);
  }

  function handleIncome() {
    setIncomeModal(false);
  }

  function handleExpense() {
    setExpenceModal(false);
  }

  function onFinish(values, type) {
    console.log("on Finish", values, type);

    const newTransaction = {
      type: type,
      date: values.date,
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };
    addTransaction(newTransaction);
    console.log(newTransaction);
  }
  async function addTransaction(transaction) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("document written id", docRef.id);
      toast.success("Transaction added!");
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(()=>{
    fetchTransaction();
  },[])

  async function fetchTransaction(){
    setLoading(true)
        if(user){
            const q = query(collection(db, `users/${user.uid}/transactions`));
            const querySnapshot =await getDocs(q);
            let transactionArray = [];
            querySnapshot.forEach((doc) => {
                transactionArray.push(doc.data())
            })
            setTransaction(transactionArray)
            console.log("transaction Array", transaction)
            toast.success("Transaction Fetched!")
        }
        setLoading(false)
  }

  return (
    <div>
      <Header />
      {
        loading ? (<p>loading ....</p>) :(
        
        <><Cards
        showIncomeModel={showIncomeModel}
        showExpenceModel={showExpenceModel}
      />
      <AddIncome
        incomeModel={incomeModel}
        handleIncome={handleIncome}
        onFinish={onFinish}
      />
      <AddExpense
        expenseModal={expenseModal}
        handleExpense={handleExpense}
        onFinish={onFinish}
      />
      </>)
      }
      
      {/* <Modal visible={incomeModel} onCancel={handleIncome} title="Add Income">Income</Modal> */}
      {/* <Modal visible={expenseModal} onCancel={handleExpense} title="Add Expense">Expense</Modal> */}
    </div>
  );
};

export default Dashboard;
