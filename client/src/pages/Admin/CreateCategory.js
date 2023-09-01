import React, { useEffect, useState } from 'react'
import Layout from './../../components/layout/Layout';
import AdminMenu from '../../components/layout/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import CategoryForm from '../../components/Form/CategoryForm';

const CreateCategory = () => {
    const [categories, setCategories] = useState([])
    const [name, setName] = useState("")

    //handle Form
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`, { name, })
            if (data?.success) {
                toast.success(`${data.name}is created`)
                getAllCategory();
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in input form")
        }
    }

    //get all category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/categories`)
            if (data?.success) {
                setCategories(data?.category)
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong in getting category")
        }
    };
    //to get the category at initial time we have to use lifecycle method ie useEffect
    useEffect(() => {
        getAllCategory();
    }, []);
    return (
        <Layout title={"Dashboard - Create Category"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Manage Category</h1>
                        <div className="p-3 w-75">
                            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
                        </div>
                        <div className='w-75'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th scope='col'>Name</th>
                                        <th scope='col'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories?.map((c) => (

                                        <tr key={c._id} >
                                            <td >{c.name}</td>
                                            <td>
                                                <button className='btn btn-primary'>Edit</button>
                                            </td>


                                        </tr>

                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateCategory
