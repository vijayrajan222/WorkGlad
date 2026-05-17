import React from 'react'
// Fixed typo: Link must be imported from 'react-router-dom' (or your router library)
import { Link } from 'react-router-dom'
import { ArrowRightIcon, ShieldIcon, UserIcon } from "lucide-react"
import LoginLeftSide from '../components/LoginLeftSide'

const LoginLanding = () => {
  const portalOption = [
    {
      to: "/login/admin",
      title: "Admin Portal", // Fixed typo: 'titile' -> 'title'
      description: "Manage employees departments, payroll, and system configurations.",
      icon: ShieldIcon
    },
    {
      to: "/login/employee",
      title: "Employee Portal", // Fixed typo: 'titile' -> 'title'
      description: "View your profile, track attendance, request time off, and access payslips.",
      icon: UserIcon
    }
  ]

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <LoginLeftSide />
      <div className='w-full md:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-16 relative overflow-y-auto min-h-screen'>

        <div className="w-full max-w-md animate-fade-in relative z-10">

          {/* Headers */}
          <div className='mb-10 text-center md:text-left'>
            {/* Fixed typo: 'font medium' -> 'font-medium' */}
            <h2 className='text-3xl font-medium text-slate-900 tracking-tight mb-3'>Welcome Back</h2>
            <p className='text-slate-500'>Select your portal to securely access the system.</p>
          </div>

          {/* PortalsList */}
          <div className='space-y-4'>
            {portalOption.map((portal) => (
              /* Fixed: Capitalized <Link> and fixed typo 'bg-state-50' -> 'bg-slate-50' */
              <Link
                key={portal.to}
                to={portal.to}
                className="group block bg-slate-50 border border-slate-200 rounded-xl p-5 sm:p-6 transition-all duration-300 hover:border-indigo-400 hover:bg-indigo-50/50"
              >
                {/* Fixed space: 'sm: gap-5' -> 'sm:gap-5' */}
                <div className="relative z-10 flex items-center justify-between gap-4 sm:gap-5">
                  <div className="flex items-start gap-4">
                    {/* OPTIONAL FEATURE: Adding the portal icon if you want it to render */}
                    <div className="p-2.5 bg-white border border-slate-100 rounded-lg text-slate-600 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-colors shadow-sm">
                      <portal.icon className="w-5 h-5" />
                    </div>
                    <div>
                      {/* Fixed typo: 'text-1g' -> 'text-lg', and removed space in 'group-hover: text-indigo-600' */}
                      <h3 className="text-lg font-medium text-slate-800 group-hover:text-indigo-600 mb-1 transition-colors">
                        {portal.title}
                      </h3>
                      <p className="text-sm text-slate-500 leading-relaxed">
                        {portal.description}
                      </p>
                    </div>
                  </div>
                  {/* Fixed space typo: 'group-hover : translate-x-1' -> 'group-hover:translate-x-1' */}
                  <ArrowRightIcon className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transform group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
                </div>
              </Link>
            ))}
          </div>

          {/* footer */}

          <div className="mt-12 text-center md:text-left text-sm text-slate-400">

            <p>© {new Date().getFullYear()} WorkGlad. All rights reserved</p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default LoginLanding