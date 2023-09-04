import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'
import { useAuth } from '../../context/auth'
import axios from 'axios'
import toast from 'react-hot-toast'

const Profile = () => {
    //context
    const [auth, setAuth] = useAuth()

    //states
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");



    //get user data
    useEffect(() => {
        const { email, name, phone, address } = auth.user
        setEmail(email)
        setName(name)
        setPhone(phone)
        setAddress(address)
    }, [])
    //======form function//======
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, { name, email, password, phone, address });

        } catch (error) {
            console.log(error);
            toast.error('Something went wrong')
        }
    }



    return (
        <Layout title={"Your Profile"}>
            <div className="container-flui p-3 m-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>

                    <div className="col-md-9">
                        <div className="form-container">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <h2 align="center"> USER PROFILE
                                    </h2>

                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="name" placeholder='Enter your name:' required />
                                </div>
                                <div className="mb-3">

                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" placeholder='Enter your E-mail:' required disabled />
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


                                <button type="submit" className="btn btn-primary">Update</button>
                            </form>

                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    )
}

export default Profile
