// components/settings/PasswordInput.jsx

import React from 'react'

import {
    Eye,
    EyeOff
} from 'lucide-react'

const PasswordInput = ({
    label,
    name,
    value,
    onChange,
    show,
    toggleShow
}) => {

    return (

        <div>

            {/* Label */}
            <label className='block mb-1.5 text-sm font-medium text-slate-700'>

                {label}

            </label>

            {/* Input */}
            <div className='relative'>

                <input
                    type={show ? "text" : "password"}
                    name={name}
                    required
                    value={value}
                    onChange={onChange}
                    placeholder='••••••••'
                    className='w-full border border-slate-200 rounded-xl px-4 py-2.5 pr-10 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition'
                />

                {/* Toggle Button */}
                <button
                    type='button'
                    onClick={toggleShow}
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600'
                >

                    {show
                        ? <EyeOff className='w-4 h-4' />
                        : <Eye className='w-4 h-4' />
                    }

                </button>

            </div>

        </div>

    )
}

export default PasswordInput