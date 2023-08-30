import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import toast from 'react-hot-toast'
import axios from 'axios'
import './register.css'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");

    //======form function//======
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, { name, email, password, phone, address, answer });
            if (res.data.success) {
                toast.success(res.data.message)
                navigate('/login');
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
                        <h2 align="center"> Create Account
                        </h2>

                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="name" placeholder='Enter your name:' required />
                    </div>
                    <div className="mb-3">

                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" placeholder='Enter your E-mail:' required />
                    </div>

                    <div className="mb-3">

                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="password" placeholder='Enter password' required />
                    </div>
                    <div className="mb-3">

                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" id="phone" placeholder='Enter Phone no' required />
                    </div>
                    <div className="mb-3">

                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" id="address" placeholder='Enter your address' required />
                    </div>
                    <div className="mb-3">

                        <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} className="form-control" id="answer" placeholder='What is your friend name' required />
                    </div>

                    <button type="submit" className="btn btn-primary">Register</button>
                </form>

            </div>
        </Layout>

    )
}

export default Register
