import React from 'react'
import { Link, useHistory } from 'react-router-dom'

export default function Navbar() {
    const history = useHistory()
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNoteBook</Link>
                {localStorage.getItem("token") !== null ?
                    <form className="d-flex">
                        <Link role="button" className="btn btn-primary mx-2" to="/login" onClick={() => { localStorage.removeItem("token"); history.push("/login") }}>Logout</Link>
                    </form>
                    :
                    <form className="d-flex">
                        <Link role="button" className="btn btn-primary mx-2" to="/login">Login</Link>
                        <Link role="button" className="btn btn-primary mx-2" to="/signup">Signup</Link>
                    </form>}
            </div>
        </nav>
    )
}
