import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  checkUserAsync, selectError, selectLoggedInUser
} from '../authSlice';
import {Link, Navigate} from 'react-router-dom'
import { useForm } from "react-hook-form";


export default function Login() {
  const dispatch = useDispatch();
  const error = useSelector(selectError)
  const user = useSelector(selectLoggedInUser)
  const { register, handleSubmit,formState: { errors } } = useForm();
  return (
    <>
    {user && <Navigate to='/' replace={true}></Navigate>}
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
            className="mx-auto h-20 w-auto"
            src="../ShopKaro.png"
            alt="Your Company"
          />
          <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form noValidate className="space-y-6" onSubmit={handleSubmit((data)=>{
              dispatch(checkUserAsync({email:data.email, password: data.password}))
              console.log(data);
          })}>
            <div>
              <label htmlFor="email" className="block text-sm text-left font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
              <input
                  id="email"
                  {...register("email",{required: "E-mail is Required", pattern: {value: 
                    // eslint-disable-next-line
                    /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi, message: 'Email is invalid!'}, })}
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <p className='text-red-500 text-right'>{errors?.email?.message}</p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <Link to="/forgot-password" className="font-semibold text-purple-600 hover:text-purple-500">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
              <input
                  id="password"
                  {...register("password",{required: "Password is Required" })}
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && <p className='text-red-500 text-right'>{errors.password.message}</p>}
              </div>
              {error && <p className='text-red-500 text-right'>{error.message}</p>}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold leading-6 text-purple-600 hover:text-purple-500">
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
