import React from 'react';
import logo from './logo.svg';
import './App.css';
import { LoginForm } from './components/LoginForm';
import { Route, Routes } from 'react-router-dom';
import { Shop } from './pages/Shop';
import { PrivatRoutes } from './components/route/PrivatRoute';

function App() {
  const token = localStorage.getItem('token');
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <LoginForm/>}/>
        <Route element={<PrivatRoutes isAuthenticated={token ? true : false } redirectPath={'/'}/>}>
           <Route path='/shop' element={ <Shop/>}/>
        </Route>
        
      </Routes>
    
    </div>
  );
}

export default App;
