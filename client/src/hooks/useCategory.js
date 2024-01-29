import { useEffect, useState } from "react";
import axios from "axios";

export default function useCategory() {
    const [categories, setcategories] = useState([])

    //get categories
    const getCategories = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/categories')
            if (data?.success) {
                setcategories(data?.category)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getCategories()
    }, [])


    // const getAllCategory = async () => {
    //     try {
    //         const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/categories`)
    //         if (data?.success) {
    //             setCategories(data?.category)
    //         }
    //     } catch (error) {
    //         console.log(error)
    //         toast.error("Something went wrong in getting category")
    //     }
    // };
    // //to get the category at initial time we have to use lifecycle method ie useEffect
    // useEffect(() => {
    //     getAllCategory();
    //     getTotal();
    // }, []);

    return categories;
}