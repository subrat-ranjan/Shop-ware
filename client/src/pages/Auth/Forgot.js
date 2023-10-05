import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import toast from 'react-hot-toast'
import axios from 'axios'
import './register.css'
import { useNavigate } from 'react-router-dom'
import "../../styles/AuthStyle.css"

const Forgot = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");

    //======form function//======
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`/api/v1/auth/forgot-password`, { email, newPassword, answer });
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
        <Layout title={'Forgot Password E-com app'}>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <h2 align="center"> RESET PASSWORD
                        </h2>
                    </div>
                    <div className="mb-3">

                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" placeholder='Enter your E-mail' required />
                    </div>


                    <div className="mb-3">

                        <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} className="form-control" id="answer" placeholder='Enter your friend name ' required />
                    </div>

                    <div className="mb-3">

                        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="form-control" id="password" placeholder='Enter new password' required />
                    </div>

                    <button type="submit" className="btn btn-primary">Reset</button>
                </form>

            </div>
        </Layout>
    )
}

export default Forgot
