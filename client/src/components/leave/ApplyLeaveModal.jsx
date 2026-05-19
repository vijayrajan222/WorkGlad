
import {
    X,
    Loader2Icon
} from 'lucide-react'

import React, { useState } from 'react'

const ApplyLeaveModal = ({
    open,
    onClose,
    onSuccess
}) => {

    const [loading, setLoading] = useState(false)

    const today = new Date()

    const tomorrow = new Date(today)

    tomorrow.setDate(today.getDate() + 1)

    const minDate = tomorrow
        .toISOString()
        .split("T")[0]

    const handleSubmit = async (e) => {

        e.preventDefault()

        setLoading(true)

        // Fake API Delay
        setTimeout(() => {

            if (onSuccess) {
                onSuccess()
            }

            setLoading(false)

            onClose()

        }, 1000)

    }

    // Hide Modal
    if (!open) return null

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
                    className='w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-fade-in'
                    onClick={(e) => e.stopPropagation()}
                >

                    {/* Header */}
                    <div className='flex items-start justify-between px-6 py-5 border-b border-slate-100'>

                        <div>

                            <h2 className='text-xl font-semibold text-slate-900'>
                                Apply for Leave
                            </h2>

                            <p className='text-sm text-slate-500 mt-1'>
                                Submit your leave request for approval
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
                        className='p-6 space-y-5'
                    >

                        {/* Leave Type */}
                        <div>

                            <label className='block mb-2 text-sm font-medium text-slate-700'>
                                Leave Type
                            </label>

                            <select
                                required
                                className='w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500'
                            >

                                <option value="">
                                    Select Leave Type
                                </option>

                                <option value="SICK">
                                    Sick Leave
                                </option>

                                <option value="CASUAL">
                                    Casual Leave
                                </option>

                                <option value="ANNUAL">
                                    Annual Leave
                                </option>

                            </select>

                        </div>

                        {/* Start Date */}
                        <div>

                            <label className='block mb-2 text-sm font-medium text-slate-700'>
                                Start Date
                            </label>

                            <input
                                type='date'
                                min={minDate}
                                required
                                className='w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500'
                            />

                        </div>

                        {/* End Date */}
                        <div>

                            <label className='block mb-2 text-sm font-medium text-slate-700'>
                                End Date
                            </label>

                            <input
                                type='date'
                                min={minDate}
                                required
                                className='w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500'
                            />

                        </div>

                        {/* Reason */}
                        <div>

                            <label className='block mb-2 text-sm font-medium text-slate-700'>
                                Reason
                            </label>

                            <textarea
                                rows={4}
                                required
                                placeholder='Briefly explain your reason...'
                                className='w-full border border-slate-200 rounded-xl px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-indigo-500'
                            />

                        </div>

                        {/* Buttons */}
                        <div className='flex flex-col sm:flex-row gap-3 pt-2'>

                            <button
                                type='button'
                                onClick={onClose}
                                className='w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors'
                            >

                                Cancel

                            </button>

                            <button
                                type='submit'
                                disabled={loading}
                                className='btn-primary flex-1 flex items-center justify-center gap-2'
                            >

                                {loading ? (

                                    <>
                                        <Loader2Icon className='w-4 h-4 animate-spin' />
                                        Submitting...
                                    </>

                                ) : (

                                    "Submit Leave Request"

                                )}

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </>

    )
}

export default ApplyLeaveModal