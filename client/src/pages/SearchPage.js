
import React, { useState, useEffect } from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/cart'
import { useSearch } from '../context/Search'

const SearchPage = () => {
    const [values, setValues] = useSearch()
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



    //get products
    const getAllProduct = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`/api/v1/Product/product-list/${page}`)
            setLoading(false)
            setProducts(data?.products)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    };


    //gettotal count

    //load more

    //filter by category

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
            const { data } = await axios.post(`/api/v1/Product/product-filters`, { checked, radio })
            setProducts(data?.products)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Layout title={"Search result"}>
            <div className="container">
                <div className="text-center">
                    <h1>Search Result</h1>
                    <h6>{values?.results.length < 1 ? "No Product Found" : `Found ${values?.results.length}`}</h6>
                    <div className="d-flex flex-wrap  ">
                        {values?.results.map((p) => (
                            <div className="card m-2 " key={p._id}  >

                                <img src={`/api/v1/product//product-photo/${p._id}`} className='card-img-top' alt={p.name} />

                                <div className="card-body ">
                                    <h5 className='card-title '>{p.name}</h5>
                                    <p className='card-text'>{p.description.substring(0, 30)}...</p>
                                    <p className='card-text'> $ {p.price}</p>
                                    <button className='btn btn-primary ms-1' onClick={() => navigate(`/product/${p.slug}`)}> More Details
                                    </button>
                                    <button className='btn btn-secondary ms-2' onClick={() => {
                                        setCart([...cart, p])
                                        localStorage.setItem('cart', JSON.stringify([...cart, p]))
                                        toast.success("Item added to cart")
                                    }}>ADD TO CART
                                    </button>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default SearchPage
