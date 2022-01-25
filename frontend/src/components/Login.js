import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'

export default function Login(props) {
    const host = "http://localhost"
    const [credentials, setCredentials] = useState({email: "", password: ""})
    let history = useHistory()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`${host}/api/auth/login-user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        })
        const json = await response.json()
        if(json.success===true){
            history.push("/")
            localStorage.setItem("token", json.authToken)
            props.showAlert("Login Successfully", "success")
        }
        else{
            alert("Invalid Credentials")
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className="container my-5">
            <h1 className="my-3">Login - To make your own Notes</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input value={credentials.email} onChange={onChange} type="email" className="form-control" name="email" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input value={credentials.password} onChange={onChange} type="password" className="form-control" name="password" id="password" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary my-2">Submit</button>
            </form>
        </div>
    )
}
