import React from 'react'
import Layout from './../components/layout/Layout';

const Policy = () => {
    return (
        <Layout title={"Privacy Policy - Shop_Ware"}>
            <div className="row contactus">
                <div className="col-md-6">
                    <img src="/images/privacy.jpg" alt="contactus" style={{ width: "100%" }} />
                </div>
                <div className="col-md-4">
                    <h1 className='bg-dark p-2 text-white text-center'> Privacy Policy</h1>
                    <p className="text-justify mt-2">Our privacy policy is designed to protect your personal information. We collect and use data to process orders, provide customer support, and personalize your experience. We prioritize data security and employ industry-standard measures to safeguard your information. We may share data with trusted partners for essential services. You have the right to access, update, or delete your information, and we respect your preferences. Our privacy policy may be updated periodically to align with our practices and legal requirements. Your privacy matters to us, and we are committed to ensuring the confidentiality and security of your data when using our ecommerce app.</p>

                </div>

            </div>
        </Layout>
    )
}

export default Policy 
