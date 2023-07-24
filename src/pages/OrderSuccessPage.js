import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useParams } from 'react-router-dom'
import { resetCartAsync } from '../features/cart/cartSlice';
import { selectLoggedInUser } from '../features/auth/authSlice';
import { resetOrder } from '../features/order/orderSlice';

function OrderSuccessPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser)
  useEffect(()=>{
    dispatch(resetCartAsync(user.id))
    dispatch(resetOrder())
  },[dispatch,user])
    return ( 
        <>
        {!params.id && <Navigate to='/' replace={true}></Navigate>}
      <main className="flex flex-col items-center justify-center min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-purple-600">Order Successfully Placed!</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Order Number #{params?.id}</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">You can check your order in My Account</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
    </>
     );
}

export default OrderSuccessPage;