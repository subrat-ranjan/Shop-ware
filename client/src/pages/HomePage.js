import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'

import axios from 'axios'
import { Checkbox, Radio } from 'antd'
import { toast } from 'react-hot-toast'
import { Prices } from '../components/Prices'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/cart'
import "../styles/Homepage.css";


// import { Link } from 'react-router-dom'

const HomePage = () => {
    const navigate = useNavigate()

    const [cart, setCart] = useCart()
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [checked, setChecked] = useState([])
    const [radio, setRadio] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)




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
        getTotal();
    }, []);



    //get products
    const getAllProduct = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/Product/product-list/${page}`)
            setLoading(false)
            setProducts(data?.products)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    };


    //gettotal count
    const getTotal = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/Product/product-count`)
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
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/Product/product-list/${page}`)
            setLoading(false)
            setProducts([...products, ...data?.products])
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    //filter by category
    const handleFilter = (value, id) => {
        let all = [...checked]
        if (value) {
            all.push(id)
        } else {
            all = all.filter(c => c !== id)
        }
        setChecked(all)
    }
    //initial time get
    useEffect(() => {
        if (!checked.length || !radio.length) getAllProduct()

    }, [checked.length, radio.length])
    // get products by properties of checked and radio 
    useEffect(() => {
        if (checked.lenght || radio.length) filterProduct()
    }, [checked, radio])

    //get filtered products
    const filterProduct = async () => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/Product/product-filters`, { checked, radio })
            setProducts(data?.products)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Layout title={" All Products -Shop_Ware"}>
            <img
                src="/images/nanner1.jpg"
                className="banner-img object-fit-cover"
                alt="bannerimage"
                width={"100%"}
            />

            <div className="container-fluid row mt-3 home-page">
                <div className="col-md-3 filters">
                    <h4 className='text-center'>
                        Filter By Category
                    </h4>
                    <div className="d-flex flex-column m-3 ">
                        {categories?.map((c) => (
                            <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}> {c.name}

                            </Checkbox>
                        ))}

                    </div>
                    {/* //Price Filter */}
                    <h4 className='text-center mt-4'>Filter By Price</h4>
                    <div className="d-flex flex-column m-3">
                        <Radio.Group onChange={e => setRadio(e.target.value)}>
                            {
                                Prices?.map((p) => (
                                    <div key={p._id}>
                                        <Radio value={p.array}>{p.name}</Radio>
                                    </div>
                                ))
                            }
                        </Radio.Group>


                    </div>
                    <div className="d-flex flex-column">
                        <button className='btn btn-danger' onClick={() => window.location.reload()}>RESET FILTER</button>
                    </div>
                </div>

                <div className="col-md-9">
                    {/* {JSON.stringify(radio, null, 4)} */}
                    <h1 className='text-center'>All Products</h1>
                    <div className="d-flex flex-wrap  ">
                        {products?.map((p) => (
                            <div className="card m-2 " key={p._id}  >

                                <img src={`${process.env.REACT_APP_API}/api/v1/product//product-photo/${p._id}`} className='card-img-top' alt={p.name} />

                                <div className="card-body">
                                    <div className="card-name-price">
                                        <h5 className="card-title">{p.name}</h5>
                                        <h5 className="card-title card-price">
                                            {p.price.toLocaleString("en-US", {
                                                style: "currency",
                                                currency: "USD",
                                            })}
                                        </h5>
                                    </div>
                                    <p className="card-text ">
                                        {p.description.substring(0, 60)}...
                                    </p>
                                    <div className="card-name-price">
                                        <button
                                            className="btn btn-info ms-1"
                                            onClick={() => navigate(`/product/${p.slug}`)}
                                        >
                                            More Details
                                        </button>
                                        <button className='btn btn-secondary ms-2'
                                            onClick={() => {
                                                setCart([...cart, p])
                                                localStorage.setItem('cart', JSON.stringify([...cart, p]))
                                                toast.success("Item added to cart")
                                            }}>ADD TO CART
                                        </button>

                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='m-2 p-3'>
                        {products && products.length < total && (
                            <button onClick={(e) => { e.preventDefault(); setPage(page + 1) }} className='btn btn-warning'>{loading ? "Loading..." : "Loadmore"}</button>
                        )}
                    </div>
                </div>
            </div>

            {/* <pre> {JSON.stringify(auth, null, 4)}</pre> */}

        </Layout>
    )
}

export default HomePage
