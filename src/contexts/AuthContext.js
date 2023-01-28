import React, { useState, useContext } from 'react';
import emailjs from '@emailjs/browser';
import {users, email} from '../data'

const authContext = React.createContext();

export function useAuth() {
  return useContext(authContext)
}

export default function AuthProvider({children}) {

  const [user, setUser] = useState()

  function login (username, password) {
    const foundUser = users.filter((user) =>
      (
        user.username === username ||
        user.email === username 
      ) && user.password === password
    )
    if (foundUser.length)
      setUser(foundUser[0])
    else
      throw new Error('Wrong username/email or password!')
  }

  function forgotPassword (username) {
    const foundUser = users.filter((user) => user.username === username)
    if (!foundUser.length)
      throw new Error('Username does not exist!')
    emailjs.send(
      email.serviceId,
      email.templateId,
      {
        username: username,
        email: foundUser[0].email
      },
      email.publicKey
    )
      .then(() => (error) => {throw new Error(error.text)})
  }

  function logout() { setUser(false) }

  const value = {user, login, forgotPassword, logout};

  return <authContext.Provider value={value}>{children}</authContext.Provider>
}
