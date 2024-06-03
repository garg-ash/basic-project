function Message(){

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [message, setMessage] = useState("")
    const [isDataSubmitted, setIsDataSubmitted] = useState(null)
    
    function handleSubmit(e) {
        e.preventDefault();
        const obj = {}
        obj.name = name;
        obj.email = email;
        obj.phone = phone;
        obj.message = message;
        
        axios
        .post("http://localhost:8080/sendMessage", { ...obj })
        .then((res) => { if (res.status === 200 && res.data === "Data Submitted") setIsDataSubmitted(true) })
            .catch((err) => console.log(err))
    }
    return (
        <>
    {isDataSubmitted ? <p className='alert alert-success'>Data Submitted</p> : ""}
    <form action="" onSubmit={handleSubmit}>
      <input type="text" placeholder='Enter Your Name' value={name} name='name' onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder='Enter your mail' value={email} name='email' onChange={(e) => setEmail(e.target.value)} />
      <input type="number" placeholder='Enter your contact no.' value={phone} name="phone" onChange={(e) => setPhone(e.target.value)} />
      <input type="textarea" placeholder='Your message' name='message' onChange={(e) => setMessage(e.target.value)} /><br />
      <button type='submit'>Send Message</button>
    </form>
    <Link to="/Login">Login</Link>
    <Link to="/Register">Register</Link>

  </>
)
}
export default Message