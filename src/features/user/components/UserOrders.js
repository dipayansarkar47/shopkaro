import React, { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLoggedInUserOrderAsync,   selectUserOrderLoaded,  selectUserOrders } from '../userSlice';
import { Navigate } from 'react-router-dom';
import { discountedPrice } from '../../../app/constants';

export default function UserOrders() {
  const dispatch = useDispatch();

  const orders = useSelector(selectUserOrders);
  const userOrderLoaded = useSelector(selectUserOrderLoaded);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrderAsync());
  }, 
  // eslint-disable-next-line
  [dispatch]);

  return (
    <>
      {!orders && <Navigate to='/' replace={true}></Navigate>}
      <div>
        {orders && userOrderLoaded && orders.map((order) => 
        (
          <div>

            <div  key={order.id}>
              <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
                    Order # {order?.id}
                  </h1>
                  <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
                    Order Status : {order?.status}
                  </h3>
                  <div className="flow-root">
                    <ul className="-my-6 divide-y divide-gray-200">
                      {order?.items.map((item) => (
                        <li key={item.id} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={item.product.thumbnail}
                              alt={item.product.title}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-2xl font-medium text-purple-900">
                                <h3>
                                  <a href={item.product.href}>{item.product.title}</a>
                                </h3>
                                <p className="ml-4">₹{discountedPrice(item.product)}</p>
                              </div>
                              <p className="mt-1 text-left text-sm font-semibold text-gray-500">
                                {item.product.brand}
                              </p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="text-gray-500">
                                <label
                                  htmlFor="quantity"
                                  className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                                >
                                  Qty :{item.quantity}
                                </label>

                              </div>

                              <div className="flex">

                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                    <p>Subtotal:</p>
                    <p className='text-2xl font-bold text-purple-600'>₹{order.totalAmount}</p>
                  </div>
                  <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                    <p>Total Items in Cart:</p>
                    <p>{order.totalItems} items</p>
                  </div>
                  <p className='text-left text-base font-medium text-gray-900'>Shipping details:</p>
                        <br />
                  <div
                    className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-purple-100"
                  >
                    <div className="flex gap-x-4">

                      <div className="min-w-0 flex-auto">
                        <p className="text-md text-left font-semibold leading-6 text-gray-900">
                          {order.selectedAddress.name}
                        </p>
                        <p className="mt-1 truncate text-left text-md leading-5 text-gray-500">
                          {order.selectedAddress.street}
                        </p>
                        <p className="mt-1 truncate text-left text-md leading-5 text-gray-500">
                          {order.selectedAddress.pinCode}
                        </p>
                      </div>
                    </div>
                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                      <p className="text-md leading-6 text-gray-900">
                        Phone: {order.selectedAddress.phone}
                      </p>
                      <p className="text-md leading-6 text-gray-500">
                        {order.selectedAddress.city}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>


          </div>

        ))}

      </div>
    </>
  );
}