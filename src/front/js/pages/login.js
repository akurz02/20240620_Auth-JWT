import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import '../../styles/login.css'

export const Login = () => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const navigate = useNavigate();
    const { store, actions } = useContext(Context); 

    const handleClick = () => {
        actions.login(email, password)
    }

    useEffect(() => {
        if(store.isLoginSuccessful){
            navigate("/private")
        }
    }, [store.isLoginSuccessful])

    return (
        <>
            <div className="login-page">
                {(store.token && store.token !== "" && store.token != undefined) ? (
                    <>
                        <h1>You've logged in!</h1>
                        <Link to='/private'>
                            <button>View your Invoices</button>
                        </Link>
                    </>
                ) : (
                    <>
                    <div>
                        <h1>Login</h1>
                    </div>
                    <div>
                        {store.loginMessage || ""}
                    </div>
                    <div>
                        <input 
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        /> 
                        <input 
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="button">
                        <button
                        onClick={handleClick} 
                        >Login</button>
                    </div>
                    </>
                )}
            </div>
        </>
    );
}