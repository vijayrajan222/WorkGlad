// components/settings/ProfileForm.jsx

import React, { useState } from 'react'
import {
    User,
    Mail,
    Briefcase,
    FileText,
    Save,
    Loader2
} from 'lucide-react'

const ProfileForm = ({
    initialData,
    onSuccess
}) => {

    const [form, setForm] = useState({

        fullName:
            `${initialData?.firstName || ""} ${initialData?.lastName || ""}`,

        email:
            initialData?.email || "",

        position:
            initialData?.designation || "",

        bio:
            initialData?.bio || ""

    })

    const [loading, setLoading] = useState(false)

    // Handle Input
    const handleChange = (e) => {

        const { name, value } = e.target

        setForm((prev) => ({
            ...prev,
            [name]: value
        }))

    }

    // Submit
    const handleSubmit = async (e) => {

        e.preventDefault()

        setLoading(true)

        // Fake API
        setTimeout(() => {

            setLoading(false)

            if (onSuccess) {
                onSuccess()
            }

        }, 1000)

    }

    return (

        <form
            onSubmit={handleSubmit}
            className='card p-6 mb-8'
        >

            {/* Header */}
            <div className='flex items-center gap-2 pb-5 border-b border-slate-100 mb-6'>

                <User className='w-5 h-5 text-slate-400' />

                <h2 className='text-lg font-semibold text-slate-900'>
                    Public Profile
                </h2>

            </div>

            {/* Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mb-5'>

                {/* Full Name */}
                <div>

                    <label className='block text-sm font-medium text-slate-700 mb-2'>
                        Full Name
                    </label>

                    <div className='relative'>

                        <input
                            type='text'
                            name='fullName'
                            value={form.fullName}
                            onChange={handleChange}
                            placeholder='John Doe'
                            className='w-full border border-slate-200 rounded-xl px-4 py-3 pl-11 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition'
                        />

                        <User className='w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2' />

                    </div>

                </div>

                {/* Email */}
                <div>

                    <label className='block text-sm font-medium text-slate-700 mb-2'>
                        Email
                    </label>

                    <div className='relative'>

                        <input
                            type='email'
                            name='email'
                            value={form.email}
                            onChange={handleChange}
                            placeholder='johndoe@example.com'
                            className='w-full border border-slate-200 rounded-xl px-4 py-3 pl-11 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition'
                        />

                        <Mail className='w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2' />

                    </div>

                </div>

            </div>

            {/* Position */}
            <div className='mb-5'>

                <label className='block text-sm font-medium text-slate-700 mb-2'>
                    Position
                </label>

                <div className='relative'>

                    <input
                        type='text'
                        name='position'
                        value={form.position}
                        onChange={handleChange}
                        placeholder='Product Manager'
                        className='w-full border border-slate-200 rounded-xl px-4 py-3 pl-11 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition'
                    />

                    <Briefcase className='w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2' />

                </div>

            </div>

            {/* Bio */}
            <div className='mb-6'>

                <label className='block text-sm font-medium text-slate-700 mb-2'>
                    Bio
                </label>

                <div className='relative'>

                    <textarea
                        rows={5}
                        name='bio'
                        value={form.bio}
                        onChange={handleChange}
                        placeholder='Write a brief bio...'
                        className='w-full border border-slate-200 rounded-xl px-4 py-3 pl-11 outline-none resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition'
                    />

                    <FileText className='w-4 h-4 text-slate-400 absolute left-4 top-5' />

                </div>

                <p className='text-xs text-slate-400 mt-2'>
                    This will be displayed on your profile.
                </p>

            </div>

            {/* Button */}
            <div className='flex justify-end'>

                <button
                    type='submit'
                    disabled={loading}
                    className='btn-primary flex items-center gap-2 px-5 py-3'
                >

                    {loading ? (

                        <>
                            <Loader2 className='w-4 h-4 animate-spin' />
                            Saving...
                        </>

                    ) : (

                        <>
                            <Save className='w-4 h-4' />
                            Save Changes
                        </>

                    )}

                </button>

            </div>

        </form>

    )
}

export default ProfileForm