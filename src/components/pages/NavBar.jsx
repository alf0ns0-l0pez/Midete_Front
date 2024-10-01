import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'
import { useUserContext, useUserToggleContext } from '../../context/userProvided'

import { navigationUser, navigationVistor } from '../../utils/constans'
import { classNamesBuilder } from '../../utils/utils'
import Login from '../forms/Login'
import Expenses from './Expenses'

export default function NavBar({ darkMode, setDarkMode }) {
    const [isOpenLogin, setIsOpenLogin] = useState(false);
    const user = useUserContext();
    const [navigation, setNavigation] = useState(navigationVistor);
    const changeLogin = useUserToggleContext();
    const viewClick = (name) => {
        const newNav = navigation.map((navig) => {
            return {
                name: navig.name,
                current: navig.name === name
            }
        });
        setNavigation(newNav);
    }
    const singoutClick = () => {
        localStorage.clear();
        changeLogin(null);
        viewClick("Introduccion")
    }
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const clickLoginHandle = (value) => {
        setIsOpenLogin(value);
    }

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);
    useEffect(() => {
        if (user) {
            setNavigation(navigationUser);
        } else {
            setNavigation(navigationVistor);
        }

    }, [user])
    const viewSelector = () => {
        const newNav = navigation.filter((navig) =>navig.current);
        return newNav[0].name
    }
    return (
        <>
            <div className="min-h-full border-b-2 border-gray-900 dark:border-gray-100 mb-6">
                <Disclosure as="nav" >
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <img
                                        alt="Your Company"
                                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                        className="h-8 w-8"
                                    />
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-10 flex items-baseline space-x-4">
                                        {navigation.map((item) => (
                                            <button
                                                onClick={() => viewClick(item.name)}
                                                key={item.name}
                                                aria-current={item.current ? 'page' : undefined}
                                                className={classNamesBuilder(
                                                    item.current ? 'bg-gray-900 text-white border-2 dark:border-gray-100' : 'dark:text-gray-300 hover:bg-gray-700 hover:text-white text-black',
                                                    'rounded-md px-3 py-2 text-sm font-medium',
                                                )}
                                            >
                                                {item.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-4 flex items-center md:ml-6">
                                    <button
                                        onClick={toggleDarkMode}
                                        type="button"
                                        className="relative rounded-full bg-gray-800 dark:bg-white p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    >
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">View notifications</span>
                                        {
                                            !darkMode ?
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                                                </svg> :
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                                                </svg>
                                        }


                                    </button>
                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                <span className="absolute -inset-1.5" />
                                                <span className="sr-only">Open user menu</span>
                                                <img alt="" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" className="h-8 w-8 rounded-full" />
                                            </MenuButton>
                                        </div>
                                        <MenuItems
                                            transition
                                            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                        >
                                            <MenuItem>
                                                {
                                                    user ?
                                                        <button className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100" onClick={singoutClick}>
                                                            Sing Out
                                                        </button> :
                                                        <button className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100" onClick={() => clickLoginHandle(true)}>
                                                            Log In
                                                        </button>
                                                }

                                            </MenuItem>
                                        </MenuItems>
                                    </Menu>
                                </div>
                            </div>
                            <div className="-mr-2 flex md:hidden">
                                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                                    <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                                </DisclosureButton>
                            </div>
                        </div>
                    </div>

                    <DisclosurePanel className="md:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                            {navigation.map((item) => (
                                <DisclosureButton
                                    onClick={() => viewClick(item.name)}
                                    key={item.name}
                                    as="a"
                                    aria-current={item.current ? 'page' : undefined}
                                    className={classNamesBuilder(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium',
                                    )}
                                >
                                    {item.name}
                                </DisclosureButton>
                            ))}
                        </div>
                        <div className="border-t border-gray-700 pb-3 pt-4">
                            <div className="flex items-center px-5">
                                <div className="flex-shrink-0">
                                    <img alt="" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" className="h-10 w-10 rounded-full" />
                                </div>
                                {
                                    user && (<div className="ml-3">
                                        <div className="text-base font-medium leading-none text-white">{user.userName}</div>
                                        <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                                    </div>)}
                                <button
                                    onClick={toggleDarkMode}
                                    type="button"
                                    className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                >
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">View notifications</span>
                                    {
                                        !darkMode ?
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                                            </svg> :
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                                            </svg>
                                    }
                                </button>
                            </div>
                            <div className="mt-3 space-y-1 px-2">
                                <DisclosureButton
                                    as="a"
                                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                >
                                    {
                                        user ?
                                            <button onClick={singoutClick}>
                                                Sing Out
                                            </button> :
                                            <button onClick={() => clickLoginHandle(true)}>
                                                Log In
                                            </button>
                                    }

                                </DisclosureButton>
                            </div>
                        </div>
                    </DisclosurePanel>
                </Disclosure>
            </div>
            <Login
                isOpen={isOpenLogin}
                clickHandle={clickLoginHandle} />
            <div className='px-6 max-w-full m-auto'>
                {
                    {
                        'Gastos':<Expenses/>
                    }[viewSelector()]
                }
            </div>
        </>
    )
}
