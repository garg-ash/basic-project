import axios from 'axios'
import React, { useState } from 'react'


function Register() {
    const [name, setName] = useState("")
    const [userName, setuserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cpassword, setCPassword] = useState("")
    const [isDataSubmitted, setIsDataSubmitted] = useState(null)

    function handleRegister(e) {
        e.preventDefault();
        const obj = {}
        obj.name = name;
        obj.userName = userName;
        obj.email = email;
        obj.password = password;

        axios
            .post("http://localhost:8080/registerMessage", { ...obj })
            .then((res) => { if (res.status === 200 && res.data === "Data Submitted") setIsDataSubmitted(true) })
            .catch((err) => console.log(err))
    }
    return (
        <>
            {isDataSubmitted ? <p>Registration Successful</p> : ""}
            <form action="" onSubmit={handleRegister}
                method='post'>
                <input type="text" placeholder='Enter Your name' name='name' value={name} onChange={(e) => setName(e.target.value)} /><br />
                <input type="text" placeholder='Enter your userName' name='userName' value={userName} onChange={(e) => setuserName(e.target.value)} /><br />
                <input type="email" placeholder='Enter Mail id' name='email' value={email} onChange={(e) => setEmail(e.target.value)} /><br />
                <input type="password" placeholder='Enter Password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} /><br />
                <input type="password" placeholder='Enter confirm password' name='confirmPassword' value={cpassword} onChange={(e) => setCPassword(e.target.value)} /><br />
                <button type='submit' id='sign'>Sign up</button>

            </form>
        </>
    )
}

export default Register
