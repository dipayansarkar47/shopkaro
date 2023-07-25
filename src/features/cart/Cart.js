import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Fragment } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { selectItems, updateCartAsync, deleteItemFromCartAsync } from './cartSlice';
import { discountedPrice } from '../../app/constants';



export default function Cart() {
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const [open, setOpen] = useState(true)
  const items = useSelector(selectItems)
  const totalAmount = items.reduce((amount, item) => discountedPrice(item) * item.quantity + amount, 0)
  const totalItems = items.reduce((total, item) => item.quantity + total, 0)
  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ ...item, quantity: +e.target.value }));
  };
  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id))
  }
  return (
    <>
      {!items.length && <Navigate to='/' replace={true}></Navigate>}
      <div className="mx-auto h-full mt-24 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className='text-4xl p-5 tracking-tight font-bold'>Your Cart</h1>
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flow-root">
            <ul className="-my-6 divide-y divide-gray-200">
              {items?.map((
                item
              ) => (
                <li key={item.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href={item.href}>{item.title}</a>
                        </h3>
                        <p className="ml-4">${discountedPrice(item)}</p>
                      </div>
                      <p className="mt-1 text-left text-sm text-gray-500">{item.brand}</p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="text-gray-500">
                        <label htmlFor="quantity" className="mr-3 inline text-sm font-medium leading-6 text-gray-900">
                          Qty
                        </label>
                        <select
                          onChange={(e) => handleQuantity(e, item)} value={item.quantity}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="10">10</option>
                        </select>
                      </div>

                      <div className="flex">
                        <button
                          onClick={e => handleRemove(e, item.id)}
                          type="button"
                          className="font-medium text-purple-600 hover:text-purple-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between font-bold">
            <p>Subtotal of {totalItems} items:</p>
            <p className='text-2xl font-bold text-purple-600'>${totalAmount}</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500 text-left">Shipping and taxes calculated at checkout.</p>
          <div className="mt-6">
            <Link
              to="/checkout"
              className="flex items-center justify-center rounded-md border border-transparent bg-purple-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-purple-700"
            >
              Checkout
            </Link>
          </div>
          <div className="mt-6flex justify-center text-center text-sm text-gray-500">
            <p>
              or
              <Link to="/">


                <button
                  type="button"
                  className="font-medium ml-1 mt-5 text-purple-600 hover:text-purple-500"
                  onClick={() => setOpen(false)}
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
