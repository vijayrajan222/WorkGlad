
import {
    X,
    Loader2Icon
} from 'lucide-react'

import React, { useState } from 'react'
import { leaveService } from '../../services'

const ApplyLeaveModal = ({
    open,
    onClose,
    onSuccess
}) => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const today = new Date()

    const tomorrow = new Date(today)

    tomorrow.setDate(today.getDate() + 1)

    const minDate = tomorrow
        .toISOString()
        .split("T")[0]

    const handleSubmit = async (e) => {

        e.preventDefault()

        setLoading(true)
        setError("")

        const formData = new FormData(e.target)

        try {
            await leaveService.createLeave({
                type: String(formData.get("type") || "").trim(),
                startDate: String(formData.get("startDate") || "").trim(),
                endDate: String(formData.get("endDate") || "").trim(),
                reason: String(formData.get("reason") || "").trim(),
            })
            if (onSuccess) {
                onSuccess()
            }
            onClose()
        } catch (err) {
            setError(err.message || "Failed to submit leave request")
        } finally {
            setLoading(false)
        }

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
                        {error && (
                            <div className='p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl'>
                                {error}
                            </div>
                        )}

                        {/* Leave Type */}
                        <div>

                            <label className='block mb-2 text-sm font-medium text-slate-700'>
                                Leave Type
                            </label>

                            <select
                                name='type'
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
                                name='startDate'
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
                                name='endDate'
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
                                name='reason'
                                rows={4}
                                required
                                minLength={5}
                                maxLength={300}
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
