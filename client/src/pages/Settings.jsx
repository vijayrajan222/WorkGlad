// pages/Settings.jsx

import React, { useEffect, useState } from 'react'

import { Lock } from 'lucide-react'

import Loading from '../components/Loading'

import ProfileForm from '../components/settings/ProfileForm'

import ChangePasswordModal from '../components/settings/ChangePasswordModal'
import { profileService } from '../services'

const Settings = () => {

    const [profile, setProfile] = useState(null)

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const [showPasswordModal, setShowPasswordModal] = useState(false)

    // Fetch Profile
    const fetchProfile = async () => {

        setLoading(true)
        setError("")

        try {
            const data = await profileService.getProfile()
            setProfile(data)
        } catch (err) {
            setError(err.message || "Failed to load profile")
        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {

        fetchProfile()

    }, [])

    // Loading Screen
    if (loading) return <Loading />
    if (error) return <p className='text-center text-rose-500 py-12'>{error}</p>

    return (

        <div className='animate-fade-in'>

            {/* Page Header */}
            <div className='page-header mb-8'>

                <h1 className='page-title'>
                    Settings
                </h1>

                <p className='page-subtitle'>
                    Manage your account and preferences
                </p>

            </div>

            {/* Profile Form */}
            {profile && (

                <ProfileForm
                    initialData={profile}
                    onSuccess={fetchProfile}
                />

            )}

            {/* Password Card */}
            <div className='card max-w-2xl p-6 flex items-center justify-between gap-4'>

                {/* Left */}
                <div className='flex items-center gap-4'>

                    <div className='p-2.5 bg-slate-100 rounded-lg shrink-0'>

                        <Lock className='w-5 h-5 text-slate-600' />

                    </div>

                    <div>

                        <p className='font-medium text-slate-900'>
                            Password
                        </p>

                        <p className='text-sm text-slate-500'>
                            Update your account password
                        </p>

                    </div>

                </div>

                {/* Button */}
                <button
                    onClick={() => setShowPasswordModal(true)}
                    className='btn-secondary text-sm shrink-0'
                >

                    Change

                </button>

            </div>

            {/* Password Modal */}
            {showPasswordModal && (

                <ChangePasswordModal
                    onClose={() => setShowPasswordModal(false)}
                />

            )}

        </div>

    )
}

export default Settings
