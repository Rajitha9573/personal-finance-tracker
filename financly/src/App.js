import logo from './logo.svg';
import './App.css';
import Signup from './Pages/Signup';
import Dashboard from './Pages/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
     <Router>
      <ToastContainer />
      <Routes>
        <Route path= "/" element = {<Signup />} />
        <Route path= "/dashboard" element = {<Dashboard />} />
      </Routes>
     </Router>
     </>
  );
}

export default App;
