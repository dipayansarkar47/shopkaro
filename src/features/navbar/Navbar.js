import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectItems } from '../cart/cartSlice'
// import { selectUserInfo } from '../user/userSlice'

const user = {
  name: 'Dipayan Sarkar',
  email: 'biki@codewithbiki.com',
  imageUrl: 'https://www.citypng.com/public/uploads/preview/download-profile-user-round-purple-icon-symbol-png-11639594314uv1zwqsazt.png'
}

const userNavigation = [
  { name: 'My Profile', link: '/profile',user:true },
  { name: 'My Orders', link: '/my-orders',user:true },
  { name: 'Sign out', link: '/logout',user:true },
  // { name: 'Admin Login', link: '/admin',admin:true },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Navbar({ children }) {
  const items = useSelector(selectItems)
  // const userInfo = useSelector(selectUserInfo)
  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Link to="/">

                        <img
                          className="h-28 mt-4 "
                          src="../ShopKaro.png"
                          alt="ShopKaro"
                        />
                      </Link>
                    </div>
                    
                    
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <Link to="/cart">
                        <button
                          type="button"
                          className="rounded-full  p-1 text-white bg-purple-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />

                        </button>
                      </Link>
                      {items.length>0 && <span className="inline-flex items-center rounded-md text-pink-600 mb-5 -ml-3 px-2 py-1 text-xs font-medium ring-1 ring-inset bg-purple-300 ring-pink-700/10">
                        {items.length}
                      </span>}

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex max-w-xs items-center rounded-full bg-none text-sm focus:outline-none  focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            <img className="h-9 w-9 rounded-full" src={user.imageUrl} alt="" />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <Link
                                    to={item.link}
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    {item.name}
                                  </Link>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              
            </>
          )}
        </Disclosure>


        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </>
  );
}

export default Navbar;