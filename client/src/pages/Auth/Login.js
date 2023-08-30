import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import toast from 'react-hot-toast'
import axios from 'axios'
import './register.css'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth'


const Login = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth()

    //======form function//======
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, { email, password });
            if (res.data.success) {
                toast.success(res.data.message)
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                })
                localStorage.setItem("auth", JSON.stringify(res.data));
                navigate('/');
            }
            else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong')
        }
    }
    return (
        <Layout title="register-Ecom app">
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <h2 align="center"> Login
                        </h2>
                    </div>
                    <div className="mb-3">

                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" placeholder='Enter your E-mail:' required />
                    </div>

                    <div className="mb-3">

                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="password" placeholder='Enter password' required />
                    </div>


                    <button type="submit" className="btn btn-primary">Login</button>
                </form>

            </div>
        </Layout>

    )
}

export default Login
