import React from 'react'
import { useState } from 'react'
import axios from 'axios'


function Login() {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")


  function handleLogin(e) {
    e.preventDefault();
    const obj = {}
    obj.name = name;
    obj.password = password;

    axios.post("http://localhost:8080/loginMessage", { ...obj })
      .then(result => {
        if (result.data && result.status === 200) window.location.href = "/table"
      })
      .catch(error => console.log(error))
  }


  return (
    <>
      <form action="" onSubmit={handleLogin}>
        <input type="text" placeholder='Enter Your userName' name='name' value={name} onChange={(e) => setName(e.target.value)} /><br />
        <input type="password" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} /><br />
        <button type='submit' id='log'>Login</button>
      </form>
    </>
  )
}

export default Login
