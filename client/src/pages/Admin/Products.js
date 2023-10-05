import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/layout/AdminMenu'
import Layout from './../../components/layout/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Products = () => {
    const [products, setProducts] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])





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
        getTotal();
    }, []);

    //get all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`/api/v1/Product/get-product`)
            setProducts(data.products)
        } catch (error) {
            console.log(error)
            toast.error("Something went Wrong")
        }
    }
    //for initial time call use lifecycle hook ie useEffect
    useEffect(() => {
        getAllProducts()
    }, [])

    //gettotal count
    const getTotal = async () => {
        try {
            const { data } = await axios.get(`/api/v1/Product/product-count`)
            setTotal(data?.total)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (page === 1) return
        loadMore()
    }, [page])

    //load more
    const loadMore = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`/api/v1/Product/product-list/${page}`)
            setLoading(false)
            setProducts([...products, ...data?.products])
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }





    return (
        <Layout>
            <div className="container-fluid m-3 p-3">


                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1 className='text-center'>All Products List</h1>
                        <div className="d-flex flex-wrap">
                            {products?.map((p) => (
                                <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className='product-link'>

                                    <div className="card m-2" style={{ width: "18rem" }} >
                                        <img src={`/api/v1/product//product-photo/${p._id}`} className='card-img-top' alt={p.name} />
                                        <div className="card-body">
                                            <h5 className='card-title'>{p.name}</h5>
                                            <p className='card-text'>{p.description}</p>
                                        </div>

                                    </div>
                                </Link>
                            ))}

                        </div>
                        <div className='m-2 p-3'>
                            {products && products.length < total && (
                                <button onClick={(e) => { e.preventDefault(); setPage(page + 1) }} className='btn btn-warning'>{loading ? "Loading..." : "Loadmore"}</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>

    )
}

export default Products
