import React, { useContext} from 'react'
import './Component.css'
import { useState } from "react";
import { TextField } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginAPI, registerAPI } from '../API/api';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthTokenContext } from '../ContextShare/Context';


function Authentication() {

    const { isAuthToken, setIsAuthToken } = useContext(isAuthTokenContext)

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })

    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    const register = async (e) => {
        e.preventDefault()
        const { username, email, password } = userData
        if (!username || !email || !password) {
            toast.warning('Please Fill the Form Completely..!')
        }
        else {
            const result = await registerAPI(userData)
            console.log(result.data);
            if (result.status === 200) {
                toast.success(`${result.data.username} Registered Successfully`)
                setUserData({
                    username: "",
                    email: "",
                    password: ""
                })
                handleFlip()
            }
            else {
                toast.error(result.response.data)
            }
        }
    }

    const login = async (e) => {
        e.preventDefault()
        const { email, password } = loginData
        if (!email || !password) {
            toast.warning('Please Fill the Form Completely..!')
        }
        else {
            const result = await loginAPI(loginData)
            console.log(result.data);
            if (result.status === 200) {
                //alert
                toast.success('Login Successfull')
                setIsAuthToken(true)
                //store
                sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
                sessionStorage.setItem("token", result.data.token)
                //empty state
                setLoginData({
                    email: "",
                    password: ""
                })
                if (result.data.existingUser.email === 'admin@gmail.com' && result.data.existingUser.password === "admin123") {
                    setTimeout(() => {
                        navigate('/admin-home')
                    }, 2500)

                }
                else {
                    setTimeout(() => {
                        navigate('/')
                    }, 2500)
                }
                //navigate

            }
            else {
                toast.error(result.response.data)
            }
        }
    }

    const [isFlipped, setFlipped] = useState(false);
    const handleFlip = () => {
        setFlipped(!isFlipped);
    };

    return (
        <>
            <div className="auth">
                <div className="d-flex justify-content-center align-items-center flex-column" style={{ height: '100vh' }}>
                    <Link to={'/'} style={{ textDecoration: 'none', color: 'green' }}><h4 style={{ marginRight: "220px" }}><i class="fa-solid fa-arrow-left me-2"></i>Back To Home</h4></Link>
                    <div className={`flip-card ${isFlipped ? "flipped" : ""}`}>
                        <div className="flip-card-inner">
                            <div className="flip-card-front">
                                <div className="card-content">
                                    <h2 className='text-center mt-3 mb-4'>LOGIN </h2>
                                    <TextField id="filled-basic" value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} className='w-100 rounded' label="Email Address" variant="filled" />
                                    <TextField id="filled-basic" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} className='mt-3 w-100 rounded' type='password' label="Password" variant="filled" /> <br />
                                    <div className='d-flex justify-content-center align-items-center mt-4'>
                                        <button onClick={login} className='me-3 w-100 btn btn-success rounded'>LOGIN</button>
                                    </div>
                                    <p className="mt-3">Don't Have an Account ? <button className='btn btn-primary' onClick={handleFlip}>Register</button></p>
                                </div>

                            </div>
                            <div className="flip-card-back">
                                <div className="card-content">
                                    <h2 className='text-center mt-3 mb-4'>REGISTER </h2>
                                    <TextField id="filled-basic" value={userData.username} onChange={(e) => setUserData({ ...userData, username: e.target.value })} className='w-100 mb-3 rounded' label="Username" variant="filled" />
                                    <TextField id="filled-basic" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} className='w-100 rounded' label="Email Address" variant="filled" />
                                    <TextField id="filled-basic" value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} className='mt-3 w-100 rounded' type='password' label="Password" variant="filled" /> <br />
                                    <div className='d-flex justify-content-center align-items-center mt-4'>
                                        <button className='me-3 w-100 btn btn-success rounded ' onClick={register}>REGISTER</button>
                                    </div>
                                    <p className="mt-3">Already Have an Account ? <button className='btn btn-primary' onClick={handleFlip}>Login</button></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer position='top-center' theme='colored' autoClose={2000} />
        </>
    )
}

export default Authentication