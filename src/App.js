import React from 'react'
import { Container } from 'react-bootstrap';
import ForgotPassword from './components/ForgotPassword';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import AuthProvider from './contexts/AuthContext';
import Login from './components/Login';
import PrivateRouteDashboard from './components/PrivateRouteDashboard'


function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{maxWidth:"500px"}}>
        <Router>
        <AuthProvider>
          <Routes>
            <Route path="/forgotPassword" element={<ForgotPassword/>}></Route>
            <Route path="/Login" element={<Login/>}></Route>
            <Route path="/" element={<PrivateRouteDashboard/>}></Route>
          </Routes>
        </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
