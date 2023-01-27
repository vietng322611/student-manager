import React, { useRef, useState } from 'react';
import {Card, Form, Button, Alert} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ForgotPassword() {
  
  const usernameRef = useRef();
  const [status, setStatus] = useState('');
  const [waiting, setWaiting] = useState(false);
  const {forgotPassword} = useAuth();
  

  async function submitHandler(e) {
    e.preventDefault()
    setWaiting(true)

    try {
      forgotPassword(usernameRef.current.value)
      setStatus({type:"success"})
    } 
    catch (error) {
      setStatus({type:"error", error})
    } 
    setWaiting(false)
  }

  return (
  <>
  <Card>
  <Card.Body>
    <h3 className='text-center mb-2'>Contact Admin</h3>
    {status.type === "success" && <Alert variant='success'>
      Request sent successfully!
    </Alert>}
    {status.type === "error" && <Alert variant='danger'>
      Failed to sent request! Error: {status.error.message}
    </Alert>}
    <Form onSubmit={submitHandler}>
    <Form.Group id='username'>
      <Form.Label>Username</Form.Label>
      <Form.Control type='username' ref={usernameRef} required></Form.Control>
    </Form.Group>
      <Button type='submit' className='w-100 mt-2' disabled={waiting}>Sent</Button>
    </Form>
  </Card.Body>
  </Card>
  <div className='w-100 text-center mt-2'>
    Got your password? Go to <Link to='/login'>Sign In</Link>.
  </div>
  </>);
}
