import React from 'react';
import { Link } from 'react-router';

const PaymentCancelled = () => {
    return (
        <div>
            <h2 className='text-red-600 text-center text-2xl font-semibold'>Payment Cancelled</h2>
            <Link to="/dashboard/my-orders" className='btn btn-primary mt-4 block mx-auto'>Go to My Orders</Link>
        </div>
    );
};

export default PaymentCancelled;