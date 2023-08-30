import React from 'react'
import Layout from './../components/layout/Layout';
import { BiMailSend, BiPhoneCall, BiSupport } from 'react-icons/bi';

const Contact = () => {
    return (
        <Layout title={"Contact us - Shop_Ware"}>
            <div className="row contactus">
                <div className="col-md-6">
                    <img src="/images/support-img.png" alt="contactus" style={{ width: "100%" }} />
                </div>
                <div className="col-md-4">
                    <h1 className='bg-dark p-2 text-white text-center'> CONTACT US</h1>
                    <p className="text-justify mt-2"> Any query and info about products feel free to call anytime we 24x7 available.</p>
                    <p className='mt-3'>
                        <BiMailSend /> :www.help@Shopwearapp.com
                    </p>
                    <p className='mt-3'>
                        <BiPhoneCall /> :87983-99876
                    </p>
                    <p className='mt-3'>
                        <BiSupport /> :1800-0000-4509(toll free)
                    </p>
                </div>

            </div>
        </Layout>
    )
}

export default Contact
