import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

const user = {
  name: 'Dipayan Sarkar',
  email: 'biki@codewithbiki.com',
  imageUrl:
    'https://avatars.githubusercontent.com/u/77672753?v=4',
}
const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Navbar({ children }) {
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
                          className="h-8 "
                          src="data:image/png;base64,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"
                          alt="Your Company"
                        />
                      </Link>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? 'bg-purple-700 text-white'
                                : 'text-black hover:text-purple-700',
                              'rounded-md px-3 py-2 text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <Link to="/cart">
                        <button
                          type="button"
                          className="rounded-full bg-purple-700 p-1 text-white  focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />

                        </button>
                      </Link>
                      <span className="inline-flex items-center rounded-md text-pink-600 mb-5 -ml-3 px-2 py-1 text-xs font-medium ring-1 ring-inset bg-purple-300 ring-pink-700/10">
                        2
                      </span>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
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
                                  <a
                                    href={item.href}
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    {item.name}
                                  </a>
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

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">{user.name}</div>
                      <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                    </div>
                    <Link to="/cart">

                      <button
                        type="button"
                        className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="sr-only">View notifications</span>
                        <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />

                      </button>
                    </Link>
                    <span className="inline-flex items-center rounded-md text-pink-600 mb-5 -ml-3 px-2 py-1 text-xs font-medium ring-1 ring-inset bg-pink-200 ring-pink-700/10">
                      2
                    </span>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
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