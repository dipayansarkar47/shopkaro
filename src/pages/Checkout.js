import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectItems, updateCartAsync, deleteItemFromCartAsync } from '../features/cart/cartSlice';
import { Link, Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { selectLoggedInUser, updateUserAsync } from '../features/auth/authSlice';
import { createOrderAsync, selectCurrentOrder } from '../features/order/orderSlice';
import { discountedPrice } from '../app/constants';



function Checkout() {
    const dispatch = useDispatch();
    const { register, reset, handleSubmit } = useForm();
    const user = useSelector(selectLoggedInUser)
    // eslint-disable-next-line
    const [open, setOpen] = useState(true)
    const items = useSelector(selectItems)
    const currentOrder = useSelector(selectCurrentOrder)
    const totalAmount = items.reduce((amount, item) => discountedPrice(item) * item.quantity + amount, 0)
    const totalItems = items.reduce((total, item) => item.quantity + total, 0)
    const [selectedAddress, setselectedAddress] = useState(null)
    const [paymentMethod, setPaymentMethod] = useState('cash')
    const handleQuantity = (e, item) => {
        dispatch(updateCartAsync({ ...item, quantity: +e.target.value }));
    };
    const handleRemove = (e, id) => {
        dispatch(deleteItemFromCartAsync(id))
    }
    const handleAddress = (e) => {
        console.log(e.target.value)
        setselectedAddress(user.addresses[e.target.value])
    }
    const handlePayment = (e) => {
        console.log(e.target.value)
        setPaymentMethod(e.target.value)
    }
    const handleOrder = (e) => {
        const order = { items, totalAmount, totalItems, user, paymentMethod, selectedAddress, status: 'pending' }
        dispatch(createOrderAsync(order))
    }
    return (
        <>
            {!items.length && <Navigate to='/' replace={true}></Navigate>}
            {currentOrder && <Navigate to={`/order-success/${currentOrder.id}`} replace={true}></Navigate>}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
                    <div className="lg:col-span-3">
                        <form noValidate className='bg-white px-5 mt-12 py-5' onSubmit={handleSubmit((data) => {
                            dispatch(
                                updateUserAsync({ ...user, addresses: [...user.addresses, data] })

                            );
                            reset();
                            console.log(data);
                        })}>
                            <div className="space-y-12">

                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-2xl font-semibold leading-7 text-gray-900">Personal Information</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">Your information is 100% safe here</p>

                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 text-left">
                                        <div className="sm:col-span-4">
                                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                                Full Name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register('name', { required: 'Name is required...' })}
                                                    id="name"
                                                    autoComplete="given-name"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-4">
                                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                Email address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="email"
                                                    {...register('email', { required: 'Email is required...' })}
                                                    type="email"
                                                    autoComplete="email"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                                Phone number
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="phone"
                                                    {...register('phone', { required: 'Phone is required...' })}
                                                    type="tel"
                                                    autoComplete="phone"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-full">
                                            <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                                Street address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register('street', { required: 'Street is required...' })}
                                                    id="street"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2 sm:col-start-1">
                                            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                                City
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register('city', { required: 'City is required...' })}
                                                    id="city"
                                                    autoComplete="address-level2"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                                                State / Province
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register('state', { required: 'State is required...' })}
                                                    id="state"
                                                    autoComplete="address-level1"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="pinCode" className="block text-sm font-medium leading-6 text-gray-900">
                                                ZIP / Postal code
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register('pinCode', { required: 'Pincode is required...' })}
                                                    id="pinCode"
                                                    autoComplete="pinCode"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex items-center justify-end gap-x-6">
                                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                                            Reset
                                        </button>
                                        <button
                                            type="submit"
                                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Save Address
                                        </button>
                                    </div>
                                </div>


                                <div className="border-b border-gray-900/10 pb-12">
                                    <div className="border-b border-gray-900/10 pb-12">
                                        <h2 className="text-left text-base font-semibold leading-7 text-gray-900">Address</h2>
                                        <p className="text-left mt-1 text-sm leading-6 text-gray-600">
                                            Choose from existing addresses...
                                        </p>
                                        <ul className="divide-y divide-gray-100">
                                            {user.addresses.map((address, index) => (
                                                <li key={index} className="flex justify-between gap-x-6 py-5 px-5">
                                                    <div className="flex gap-x-4">
                                                        <input
                                                            onChange={handleAddress}
                                                            name="address"
                                                            type="radio"
                                                            value={index}
                                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        />
                                                        <div className="min-w-0 flex-auto">
                                                            <p className="text-left text-sm font-semibold leading-6 text-gray-900">{address.name}</p>
                                                            <p className="text-left mt-1 truncate text-xs leading-5 text-gray-500">Phn: {address.phone}</p>
                                                        </div>
                                                    </div>
                                                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                                                        <p className="text-sm text-right leading-6 text-gray-500">{address.street},{address.state}</p>
                                                        <p className="text-sm text-right leading-6 text-gray-500">Pincode: {address.pinCode}</p>

                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="mt-10 space-y-10">

                                        <fieldset>
                                            <legend className="text-left text-sm font-semibold leading-6 text-gray-900">Payment Method</legend>
                                            <p className="text-left mt-1 text-sm leading-6 text-gray-600">Choose any one payment method</p>
                                            <div className="mt-6 space-y-6">
                                                <div className="flex items-center gap-x-3">
                                                    <input
                                                        id="cash"
                                                        name="payments"
                                                        onChange={handlePayment}
                                                        checked={paymentMethod === "cash"}
                                                        value="cash"
                                                        type="radio"
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <label htmlFor="cash" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Cash on Delivery
                                                    </label>
                                                </div>
                                                <div className="flex items-center gap-x-3">
                                                    <input
                                                        id="card"
                                                        name="payments"
                                                        onChange={handlePayment}
                                                        value="card"
                                                        checked={paymentMethod === "card"}
                                                        type="radio"
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <label htmlFor="card" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Card Payment
                                                    </label>
                                                </div>

                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>


                        </form>
                    </div>

                    <div className="lg:col-span-2">
                        {/* Cart Page */}
                        <div className="mx-auto h-full mt-12 bg-white max-w-7xl px-4 sm:px-0 lg:px-0">
                            <h1 className='text-4xl p-5 tracking-tight font-bold'>Your Cart</h1>
                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                <div className="flow-root">
                                    <ul className="-my-6 divide-y divide-gray-200">
                                        {items.map((
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
                                    <div
                                        onClick={handleOrder}
                                        className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-purple-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-purple-700"
                                    >
                                        Order Now
                                    </div>
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
                    </div>
                </div>
            </div>
        </>
    );
}

export default Checkout;