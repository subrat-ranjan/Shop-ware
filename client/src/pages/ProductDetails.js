import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import "../styles/ProductDetailsStyle.css";
import { useCart } from '../context/cart';
import { toast } from 'react-hot-toast';



const ProductDetails = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [product, setProduct] = useState({})
    const [relatedProducts, setRelatedProducts] = useState([])
    const [cart, setCart] = useCart()

    //  getting initial details of product
    useEffect(() => {
        if (params?.slug) getProduct();
    }, [params?.slug])

    //get Product
    const getProduct = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`)
            setProduct(data?.product)
            getSimilarProduct(data?.product._id, data?.product.category._id)
        } catch (error) {
            console.log(error)
        }
    }

    //get similar product
    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`)

            setRelatedProducts(data?.products)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Layout>

            <div className="row container product-details">
                <div className="col-md-6">
                    <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`} className='card-img-top' alt=
                        {product.name}
                        height={"300px"} width={"300px"}
                    />
                </div>

                <div className="col-md-6 product-details-info">
                    <h1 className='text-center'>Product Details</h1>

                    <h6>Name:{product.name}</h6>
                    <h6>Description:{product.description}</h6>
                    <h6>Price:{product.price}</h6>
                    <h6>Quantity:{product.quantity}</h6>
                    <h6>Category:{product.category?.name}</h6>
                    <button className='btn btn-secondary ms-1' onClick={() => {
                        setCart([...cart, product])
                        localStorage.setItem('cart', JSON.stringify([...cart, product]))
                        toast.success("Item added to cart")
                    }}>ADD TO CART</button>
                </div>
            </div>
            <hr />
            <div className="row container similar-products">
                <h6>Similar Product</h6>

                {relatedProducts.length < 1 && (<p className='text-center'>No similar Products Found</p>)}
                <div className="d-flex flex-wrap  ">

                    {relatedProducts?.map((p) => (
                        <div className="card m-2 " key={p._id}  >

                            <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className='card-img-top' alt={p.name} />

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
                                    {/* <button
                  className="btn btn-dark ms-1"
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, p])
                    );
                    toast.success("Item Added to cart");
                  }}
                >
                  ADD TO CART
                </button> */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

        </Layout>
    )
}

export default ProductDetails
