import React, { useEffect, useState } from 'react'
import Layout from './../../components/layout/Layout';
import AdminMenu from '../../components/layout/AdminMenu';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Select } from 'antd';
const { Option } = Select//with this we can make dropdown menu


const CreateProduct = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [photo, setPhoto] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setprice] = useState("")
    const [category, setCategory] = useState("")
    const [quantity, setQuantity] = useState("")
    const [shipping, setShipping] = useState("")

    //get all category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`/api/v1/category/categories`)
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


    //create product
    const handleCreate = async (e) => {
        e.preventDefault()
        try {
            const productData = new FormData()
            productData.append("name", name)
            productData.append("description", description)
            productData.append("price", price)
            productData.append("quantity", quantity)
            productData.append("photo", photo)
            productData.append("category", category)
            const { data } = await axios.post(`/api/v1/product/create-product`, productData);
            if (data?.success) {
                toast.success("Product Created Successfully")
                navigate('/dashboard/admin/products')

            } else {
                toast.error(data?.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }

    return (
        <Layout title={"Dashboard - All Create Product"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Create Product</h1>
                        <div className="m-1 w-75">
                            <Select optionLabelProp="children"
                                bordered={false}
                                placeholder="Select a Category"
                                size='large'
                                showSearch
                                className='form-select mb-3' onChange={(value) => { setCategory(value) }}>{categories?.map((c) => (
                                    <Option key={c._id} value={c._id}> {c.name}

                                    </Option>
                                ))}
                            </Select>
                            <div className="mb-3">
                                <label aria-label='' className='btn btn-outline-secondary col-md-12'>{photo ? photo.name : "Upload Photo"}
                                    {/* //if you got photo then show name of the photo */}
                                    <input type="file" name="photo" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} hidden />
                                </label>
                            </div>
                            <div className="mb-3">
                                {photo && (
                                    <div className="text-center">
                                        <img src={URL.createObjectURL(photo)} alt="product Photo" height={"200px"} className='img img-responsive' />
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <input type="text" value={name} placeholder='Write a name' className='form-control' onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <textarea type="text" value={description} placeholder='Write Product Description' className='form-control' onChange={(e) => setDescription(e.target.value)} />
                            </div>

                            <div className="mb-3">
                                <input type="number" value={price} placeholder='Write a price' className='form-control' onChange={(e) => setprice(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <input type="number" value={quantity} placeholder='Write quantity' className='form-control' onChange={(e) => setQuantity(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <Select bordered={false} placeholder="Select Shipping" size='large' showSearch className='form-select mb-3' onChange={(value) => setShipping(value)}>
                                    <Option value="0">No </Option>
                                    <Option value="1">Yes </Option>

                                </Select>
                            </div>
                            <div className="mb-3">
                                <button className='btn btn-primary' onClick={handleCreate}>CREATE PRODUCT</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateProduct
