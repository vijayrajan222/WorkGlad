// components/settings/ChangePasswordModal.jsx

import React, { useState } from 'react'

import {
    X,
    Loader2,
    CheckCircle2,
    AlertCircle
} from 'lucide-react'

import PasswordInput from './PasswordInput'
import { authService } from '../../services'

const ChangePasswordModal = ({ onClose }) => {

    const [form, setForm] = useState({

        currentPassword: '',

        newPassword: '',

        confirmPassword: ''

    })

    const [show, setShow] = useState({

        current: false,

        new: false,

        confirm: false

    })

    const [loading, setLoading] = useState(false)

    const [message, setMessage] = useState({

        type: '',

        text: ''

    })

    // Handle Input
    const handleChange = (e) => {

        const { name, value } = e.target

        setForm((prev) => ({

            ...prev,

            [name]: value

        }))

        setMessage({

            type: '',

            text: ''

        })

    }

    // Toggle Password Visibility
    const toggleShow = (field) => {

        setShow((prev) => ({

            ...prev,

            [field]: !prev[field]

        }))

    }

    // Submit
    const handleSubmit = async (e) => {

        e.preventDefault()

        // Validation
        if (!form.currentPassword) {

            setMessage({

                type: 'error',

                text: 'Current password is required.'

            })

            return

        }

        if (form.newPassword.length < 8) {

            setMessage({

                type: 'error',

                text: 'Password must be at least 8 characters.'

            })

            return

        }

        if (form.newPassword !== form.confirmPassword) {

            setMessage({

                type: 'error',

                text: 'Passwords do not match.'

            })

            return

        }

        setLoading(true)

        try {
            await authService.changePassword({
                currentPassword: form.currentPassword,
                newPassword: form.newPassword,
            })

            setMessage({

                type: 'success',

                text: 'Password updated successfully!'

            })

            setLoading(false)

            setTimeout(() => {

                onClose()

            }, 1200)
        } catch (err) {
            setMessage({
                type: 'error',
                text: err.message || 'Failed to update password.'
            })
            setLoading(false)
        }

    }

    return (

        <>

            {/* Overlay */}
            <div
                className='fixed inset-0 z-40 bg-black/60 backdrop-blur-sm'
                onClick={onClose}
            />

            {/* Modal */}
            <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>

                <div
                    className='w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-fade-in'
                    onClick={(e) => e.stopPropagation()}
                >

                    {/* Header */}
                    <div className='flex items-start justify-between px-6 py-5 border-b border-slate-100'>

                        <div>

                            <h2 className='text-xl font-semibold text-slate-900'>
                                Change Password
                            </h2>

                            <p className='text-sm text-slate-500 mt-1'>
                                Choose a strong and secure password
                            </p>

                        </div>

                        <button
                            onClick={onClose}
                            className='p-2 rounded-xl hover:bg-slate-100 transition-colors'
                        >

                            <X className='w-5 h-5 text-slate-500' />

                        </button>

                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className='p-6 space-y-4'
                    >

                        {/* Current Password */}
                        <PasswordInput
                            label='Current Password'
                            name='currentPassword'
                            value={form.currentPassword}
                            onChange={handleChange}
                            show={show.current}
                            toggleShow={() => toggleShow("current")}
                        />

                        {/* New Password */}
                        <PasswordInput
                            label='New Password'
                            name='newPassword'
                            value={form.newPassword}
                            onChange={handleChange}
                            show={show.new}
                            toggleShow={() => toggleShow("new")}
                        />

                        {/* Confirm Password */}
                        <PasswordInput
                            label='Confirm Password'
                            name='confirmPassword'
                            value={form.confirmPassword}
                            onChange={handleChange}
                            show={show.confirm}
                            toggleShow={() => toggleShow("confirm")}
                        />

                        {/* Password Hint */}
                        {form.newPassword && (

                            <p
                                className={`text-xs ${
                                    form.newPassword.length >= 8
                                        ? "text-emerald-600"
                                        : "text-amber-500"
                                }`}
                            >

                                {form.newPassword.length >= 8
                                    ? "✓ Password length looks good"
                                    : `${8 - form.newPassword.length} more characters needed`
                                }

                            </p>

                        )}

                        {/* Message */}
                        {message.text && (

                            <div
                                className={`flex items-center gap-2 text-sm px-4 py-3 rounded-xl ${
                                    message.type === "success"
                                        ? "bg-emerald-50 text-emerald-700"
                                        : "bg-red-50 text-red-600"
                                }`}
                            >

                                {message.type === "success"
                                    ? <CheckCircle2 className='w-4 h-4 shrink-0' />
                                    : <AlertCircle className='w-4 h-4 shrink-0' />
                                }

                                {message.text}

                            </div>

                        )}

                        {/* Buttons */}
                        <div className='flex gap-3 pt-2'>

                            {/* Cancel */}
                            <button
                                type='button'
                                onClick={onClose}
                                className='flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 hover:bg-slate-50 transition-colors'
                            >

                                Cancel

                            </button>

                            {/* Submit */}
                            <button
                                type='submit'
                                disabled={loading}
                                className='btn-primary flex-1 flex items-center justify-center gap-2'
                            >

                                {loading ? (

                                    <>
                                        <Loader2 className='w-4 h-4 animate-spin' />
                                        Updating...
                                    </>

                                ) : (

                                    "Update Password"

                                )}

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </>

    )
}

export default ChangePasswordModal
