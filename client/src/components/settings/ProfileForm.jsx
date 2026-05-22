// components/settings/ProfileForm.jsx

import React, { useState } from 'react'
import {
    FileText,
    Save,
    Loader2
} from 'lucide-react'
import { profileService } from '../../services'

const ProfileForm = ({
    initialData,
    onSuccess
}) => {

    const [form, setForm] = useState({
        bio:
            initialData?.bio || ""

    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

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
        setError("")

        try {
            await profileService.updateProfile({
                bio: form.bio
            })
            if (onSuccess) {
                onSuccess()
            }
        } catch (err) {
            setError(err.message || "Failed to update profile")
        } finally {
            setLoading(false)
        }

    }

    return (

        <form
            onSubmit={handleSubmit}
            className='card p-6 mb-8'
        >
            {error && (
                <div className='mb-4 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl'>
                    {error}
                </div>
            )}

            {/* Header */}
            <div className='flex items-center gap-2 pb-5 border-b border-slate-100 mb-6'>

                <FileText className='w-5 h-5 text-slate-400' />

                <h2 className='text-lg font-semibold text-slate-900'>
                    Profile Bio
                </h2>

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
                        minLength={0}
                        maxLength={500}
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
