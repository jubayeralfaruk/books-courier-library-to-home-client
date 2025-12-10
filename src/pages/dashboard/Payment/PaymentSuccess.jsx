import React, { use, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const [paymentInfo, setPaymentInfo] = useState({});
    const sessionId = searchParams.get('session_id');
    const axiosSecure = useAxiosSecure();
    console.log(sessionId);
    

    useEffect(() => {
        if (sessionId) {
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
                .then((res) => {
                    console.log('Payment success updated:', res.data);
                    setPaymentInfo(res.data);
                })
        }
    }, [sessionId, axiosSecure]);

    return (
        <div>
            <h2 className='text-green-600 text-center text-2xl font-semibold'>Payment Successful</h2>
            <div className="">
                <p className='text-center mt-4'>Thank you for your payment! Your transaction has been completed successfully.</p>
                
            </div>
            <div className="">
                <p>Your transaction ID: {paymentInfo?.transactionId}</p>
                <p>Your tracking number: {paymentInfo?.trackingId}</p>
            </div>
            <Link to="/dashboard/my-orders" className='btn btn-primary mt-4 block mx-auto'>Go to My Orders</Link>
        </div>
    );
};

export default PaymentSuccess;