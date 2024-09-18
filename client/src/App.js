import {Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import UserLogin from './component/UserLogin';
import UserRegister from './component/UserRegister';
import Navbar from './component/Navbar';
import AddHealthRecord from './component/AddHealthRecord';
import GetAllRecords from './component/GetAllRecords';
import UpdateHealthRecord from './component/UpdateHealthRecord';
import GetRecordById from './component/GetRecordById';

function App() {
  return (
    <div className="App">
        <Router>
          <Navbar/>
          <Routes>
            <Route path="/" element={<GetAllRecords/>} />
            <Route path="/record/addrecord" element={<AddHealthRecord/>} />
            <Route path="/record/updaterecord/:id" element={<UpdateHealthRecord/>} />
            <Route path="/record/getrecordbyid/:id" element={<GetRecordById/>} />
            <Route path="/user/login" element={<UserLogin />} />
            <Route path="/user/register" element={<UserRegister/>} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
