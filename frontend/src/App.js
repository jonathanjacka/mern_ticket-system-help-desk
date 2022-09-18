import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './views/Home';
import Register from './views/Register';
import Login from './views/Login';
import NewTicket from './views/NewTicket';
import PrivateRoute from './components/PrivateRoute';

import Header from './components/Header';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />

            <Route path='/new-ticket' element={<PrivateRoute />}>
              <Route path='/new-ticket' element={<NewTicket />} />
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer
        position='top-center'
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme='dark'
      />
    </>
  );
}

export default App;
