import {
    BadgeDollarSignIcon,
    CalendarIcon,
    ChevronRightIcon,
    FileTextIcon,
    LayoutGridIcon,
    LogOutIcon,
    MenuIcon,
    SettingsIcon,
    UsersIcon,
    XIcon
} from 'lucide-react'

import React, { useEffect, useState } from 'react'

import {
    Link,
    useLocation
} from 'react-router-dom'

import { dummyProfileData } from '../assets/assets'

const Sidebar = () => {

    const { pathname } = useLocation()

    const [userName, setUserName] = useState("")

    const [mobileOpen, setMobileOpen] = useState(false)

    const role = "ADMIN"

    // Navigation
    const navItems = [

        {
            name: "Dashboard",
            href: "/Dashboard",
            icon: LayoutGridIcon
        },

        role === "ADMIN"
            ? {
                name: "Employees",
                href: "/Employees",
                icon: UsersIcon
            }
            : {
                name: "Attendance",
                href: "/Attendance",
                icon: CalendarIcon
            },

        {
            name: "Leave",
            href: "/Leave",
            icon: FileTextIcon
        },

        {
            name: "Payslips",
            href: "/Payslips",
            icon: BadgeDollarSignIcon
        },

        {
            name: "Settings",
            href: "/Settings",
            icon: SettingsIcon
        }

    ]

    // Logout
    const handleLogout = () => {

        window.location.href = "/login"

    }

    // Set Username
    useEffect(() => {

        setUserName(
            `${dummyProfileData.firstName} ${dummyProfileData.lastName}`
        )

    }, [])

    // Close mobile sidebar on route change
    useEffect(() => {

        setMobileOpen(false)

    }, [pathname])

    // Sidebar Content
    const sidebarContent = (

        <>

            {/* Brand Header */}
            <div className='px-5 pt-6 pb-5 border-b border-white/5'>

                <div className='flex items-center justify-between'>

                    {/* Brand */}
                    <div className='flex items-center gap-3'>

                        {/* Logo */}
                        <div className='relative w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 shrink-0 overflow-hidden'>

                            {/* Glow */}
                            <div className='absolute inset-0 bg-white/10 backdrop-blur-sm' />

                            <span className='relative text-white font-black text-lg tracking-wide'>
                                W
                            </span>

                        </div>

                        {/* Text */}
                        <div>

                            <h1 className='text-[15px] font-bold text-white tracking-wide leading-none'>

                                WorkGlad

                            </h1>

                            <p className='mt-1 text-[11px] text-indigo-300/70 font-medium tracking-wide'>

                                Workforce Platform

                            </p>

                        </div>

                    </div>

                    {/* Mobile Close */}
                    <button
                        onClick={() => setMobileOpen(false)}
                        className='lg:hidden text-slate-400 hover:text-white transition-colors p-1'
                    >

                        <XIcon size={20} />

                    </button>

                </div>

            </div>

            {/* User Card */}
            {userName && (

                <div className='mx-3 mt-4 mb-1 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.05] backdrop-blur-sm'>

                    <div className='flex items-center gap-3'>

                        {/* Avatar */}
                        <div className='w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center ring-1 ring-white/10 shrink-0 shadow-inner'>

                            <span className='text-slate-200 text-sm font-semibold'>

                                {userName.charAt(0).toUpperCase()}

                            </span>

                        </div>

                        {/* User Info */}
                        <div className='min-w-0'>

                            <p className='text-[13px] font-medium text-slate-100 truncate'>

                                {userName}

                            </p>

                            <p className='text-[11px] text-slate-500 truncate'>

                                {role === "ADMIN"
                                    ? "Administrator"
                                    : "Employee"}

                            </p>

                        </div>

                    </div>

                </div>

            )}

            {/* Section */}
            <div className='px-5 pt-5 pb-2'>

                <p className='text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500'>

                    Navigation

                </p>

            </div>

            {/* Navigation */}
            <div className='flex-1 px-3 space-y-1 overflow-y-auto'>

                {navItems.map((item) => {

                    const isActive = pathname.startsWith(item.href)

                    return (

                        <Link
                            key={item.name}
                            to={item.href}
                            className={`group relative flex items-center gap-3 px-3 py-3 rounded-xl text-[13px] font-medium transition-all duration-200 ${isActive
                                    ? "bg-indigo-500/10 text-indigo-300 border border-indigo-500/10"
                                    : "text-slate-300 hover:text-white hover:bg-white/[0.04]"
                                }`}
                        >

                            {/* Active Indicator */}
                            {isActive && (

                                <div className='absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.7)]' />

                            )}

                            {/* Icon */}
                            <item.icon
                                className={`w-[18px] h-[18px] shrink-0 transition-colors ${isActive
                                        ? "text-indigo-300"
                                        : "text-slate-400 group-hover:text-slate-200"
                                    }`}
                            />

                            {/* Label */}
                            <span className='flex-1'>

                                {item.name}

                            </span>

                            {/* Arrow */}
                            {isActive && (

                                <ChevronRightIcon className='w-4 h-4 text-indigo-400/60' />

                            )}

                        </Link>

                    )

                })}

            </div>

            {/* Footer */}
            <div className='p-3 border-t border-white/5'>

                <button
                    onClick={handleLogout}
                    className='flex items-center gap-3 w-full px-3 py-3 rounded-xl text-[13px] font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all duration-200'
                >

                    <LogOutIcon className='w-[18px] h-[18px]' />

                    <span>

                        Log out

                    </span>

                </button>

            </div>

        </>

    )

    return (

        <>

            {/* Mobile Hamburger */}
            <button
                onClick={() => setMobileOpen(true)}
                className='lg:hidden fixed top-4 left-4 z-50 p-2.5 bg-slate-900 text-white rounded-xl shadow-xl border border-white/10'
            >

                <MenuIcon size={20} />

            </button>

            {/* Overlay */}
            {mobileOpen && (

                <div
                    className='lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40'
                    onClick={() => setMobileOpen(false)}
                />

            )}

            {/* Desktop Sidebar */}
            <aside className='hidden lg:flex flex-col h-full w-72 bg-[#0B1120] text-white shrink-0 border-r border-white/[0.05]'>

                {sidebarContent}

            </aside>

            {/* Mobile Sidebar */}
            <aside
                className={`lg:hidden fixed inset-y-0 left-0 w-72 bg-[#0B1120] text-white z-50 flex flex-col transform transition-transform duration-300 ${mobileOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                    }`}
            >

                {sidebarContent}

            </aside>

        </>

    )
}

export default Sidebar