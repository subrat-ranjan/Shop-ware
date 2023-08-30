import React from 'react'
import Layout from './../components/layout/Layout';

const About = () => {
    return (
        <Layout title={"About us - Shop_Ware"}>
            <div className="row contactus">
                <div className="col-md-6">
                    <img src="/images/abut.jpg" alt="contactus" style={{ width: "100%" }} />
                </div>
                <div className="col-md-4">
                    <h1 className='bg-dark p-2 text-white text-center'> About Us</h1>
                    <p className="text-justify mt-2"> Welcome to our SHOP-WARE ecommerce app! We're dedicated to revolutionizing your shopping experience. Discover a vast selection of products from top brands and emerging designers. Our user-friendly interface, advanced search options, and personalized recommendations make finding the perfect item effortless. We prioritize your security and privacy, implementing robust encryption and trusted payment partners. Our dedicated support team is available 24/7. Customer satisfaction is our top priority, exceeding expectations at every touchpoint. Join our vibrant community of savvy shoppers. Download our app today and redefine convenience, innovation, and personalized service in your shopping journey.</p>


                </div>

            </div>
        </Layout>
    )
}

export default About
