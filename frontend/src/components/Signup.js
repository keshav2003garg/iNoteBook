import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'

export default function Signup(props) {
    const host = process.env.REACT_APP_HOST
    const [credentials, setCredentials] = useState({name: "", email: "", password: "", confirmpassword: ""})
    let history = useHistory()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`${host}/api/auth/create-user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        })
        const json = await response.json()
        console.log(json)
        if(json.success===true){
            history.push("/login")
            props.showAlert("SignUp Successfully", "success")
        }
        else{
            alert(json.error)
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className="container my-4">
            <h1 className="my-3">Signup - To create your Own Notes</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group my-2">
                    <label htmlFor="name">Name</label>
                    <input onChange={onChange} value={credentials.name} type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" placeholder="Enter your Name" />
                </div>
                <div className="form-group my-2">
                    <label htmlFor="email">Email address</label>
                    <input onChange={onChange} value={credentials.email} type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter your Email" required />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group my-2">
                    <label htmlFor="password">Password</label>
                    <input onChange={onChange} value={credentials.password} type="password" className="form-control" id="password" name="password" placeholder=" Enter your Password" minLength={5} required />
                </div>
                <div className="form-group my-2">
                    <label htmlFor="password">Confirm Password</label>
                    <input onChange={onChange} value={credentials.confirmpassword} type="password" className="form-control" id="confirmpassword" name="confirmpassword" placeholder=" Enter your Password again" minLength={5} required />
                </div>
                <button type="submit" className="btn btn-primary my-2">Signup</button>
            </form>
        </div>
    )
}
