import React from 'react'
import { Link, useHistory } from 'react-router-dom'

export default function Navbar() {
    const history = useHistory()
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Navbar</Link>
                {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                    </ul> */}
                    {localStorage.getItem("token")!==null?  <form className="d-flex"><Link role="button" className="btn btn-primary mx-2" to="/login" onClick={()=>{localStorage.removeItem("token");history.push("/login")}}>Logout</Link></form> : <form className="d-flex">
                        <Link role="button" className="btn btn-primary mx-2" to="/login">Login</Link>
                        <Link role="button" className="btn btn-primary mx-2" to="/signup">Signup</Link>
                    </form>}
                {/* </div> */}
            </div>
        </nav>
    )
}
