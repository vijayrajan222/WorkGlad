import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DEPARTMENTS } from '../assets/assets'

const EmployeeForm = ({
    initialData,
    onSuccess,
    onCancel
}) => {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    // Convert value to boolean
    const isEditMode = !!initialData

    // Form Submit
    const handleSubmit = async (e) => {

        // Prevent page refresh
        e.preventDefault()

        setLoading(true)

        // Get form data
        const formData = new FormData(e.target)

        const employeeData = {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            phone: formData.get("phone"),
            joinDate: formData.get("joinDate"),
            bio: formData.get("bio")
        }

        console.log(employeeData)

        // Fake API delay
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
            className='space-y-6 max-w-3xl animate-fade-in'
        >

            {/* Personal Information */}
            <div className='border border-slate-200 rounded-2xl p-6'>

                <h3 className='text-lg font-semibold text-slate-900 mb-6'>
                    Personal Information
                </h3>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>

                    {/* First Name */}
                    <div>

                        <label className="block mb-2 text-sm font-medium text-slate-700">
                            First Name
                        </label>

                        <input
                            name="firstName"
                            required
                            defaultValue={initialData?.firstName}
                            className='w-full border border-slate-200 rounded-xl px-4 py-2 outline-none'
                        />

                    </div>

                    {/* Last Name */}
                    <div>

                        <label className="block mb-2 text-sm font-medium text-slate-700">
                            Last Name
                        </label>

                        <input
                            name="lastName"
                            required
                            defaultValue={initialData?.lastName}
                            className='w-full border border-slate-200 rounded-xl px-4 py-2 outline-none'
                        />

                    </div>

                    {/* Phone */}
                    <div>

                        <label className="block mb-2 text-sm font-medium text-slate-700">
                            Phone Number
                        </label>

                        <input
                            name="phone"
                            required
                            defaultValue={initialData?.phone}
                            className='w-full border border-slate-200 rounded-xl px-4 py-2 outline-none'
                        />

                    </div>

                    {/* Join Date */}
                    <div>

                        <label className="block mb-2 text-sm font-medium text-slate-700">
                            Join Date
                        </label>

                        <input
                            name="joinDate"
                            type='date'
                            required
                            defaultValue={
                                initialData?.joinDate
                                    ? new Date(initialData.joinDate)
                                        .toISOString()
                                        .split("T")[0]
                                    : ""
                            }
                            className='w-full border border-slate-200 rounded-xl px-4 py-2 outline-none'
                        />

                    </div>

                    {/* Bio */}
                    <div className='sm:col-span-2'>

                        <label className="block mb-2 text-sm font-medium text-slate-700">
                            Bio (Optional)
                        </label>

                        <textarea
                            name="bio"
                            rows={3}
                            defaultValue={initialData?.bio}
                            className='w-full border border-slate-200 rounded-xl px-4 py-3 outline-none resize-none'
                            placeholder='Brief description...'
                        />

                    </div>

                </div>

            </div>

            {/* Employment Details */}
            <div className='border border-slate-200 rounded-2xl p-6 bg-white shadow-sm'>

                {/* Header */}
                <div className='flex items-center justify-between mb-6'>

                    <div>

                        <h3 className='text-lg font-semibold text-slate-900'>
                            Employment Details
                        </h3>

                        <p className='text-sm text-slate-500 mt-1'>
                            Manage employee role and salary information
                        </p>

                    </div>

                </div>

                {/* Form Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700'>

                    {/* Department */}
                    <div>

                        <label className='block mb-2 text-sm font-medium text-slate-700'>
                            Department
                        </label>

                        <select
                            name="department"
                            defaultValue={initialData?.department || ""}
                            className='w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all'
                        >

                            <option value="">
                                Select Department
                            </option>

                            {DEPARTMENTS.map((deptName) => (

                                <option
                                    key={deptName}
                                    value={deptName}
                                >
                                    {deptName}
                                </option>

                            ))}

                        </select>

                    </div>

                    {/* Position */}
                    <div>

                        <label className="block mb-2 text-sm font-medium text-slate-700">
                            Position
                        </label>

                        <input
                            name="position"
                            required
                            defaultValue={initialData?.position}
                            className='w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all'
                        />

                    </div>

                    {/* Basic Salary */}
                    <div>

                        <label className="block mb-2 text-sm font-medium text-slate-700">
                            Basic Salary
                        </label>

                        <input
                            name="basicSalary"
                            type='number'
                            required
                            min="0"
                            step="0.01"
                            defaultValue={initialData?.basicSalary || 0}
                            className='w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all'
                        />

                    </div>

                    {/* Allowances */}
                    <div>

                        <label className="block mb-2 text-sm font-medium text-slate-700">
                            Allowances
                        </label>

                        <input
                            name="allowances"
                            type='number'
                            required
                            min="0"
                            step="0.01"
                            defaultValue={initialData?.allowances || 0}
                            className='w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all'
                        />

                    </div>

                    {/* Deductions */}
                    <div>

                        <label className="block mb-2 text-sm font-medium text-slate-700">
                            Deductions
                        </label>

                        <input
                            name="deductions"
                            type='number'
                            required
                            min="0"
                            step="0.01"
                            defaultValue={initialData?.deductions || 0}
                            className='w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all'
                        />

                    </div>

                    {/* Status */}
                    {isEditMode && (

                        <div>

                            <label className="block mb-2 text-sm font-medium text-slate-700">
                                Status
                            </label>

                            <select
                                name="employmentStatus"
                                required
                                defaultValue={initialData?.employmentStatus}
                                className='w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all'
                            >

                                <option value="ACTIVE">
                                    Active
                                </option>

                                <option value="INACTIVE">
                                    Inactive
                                </option>

                            </select>

                        </div>

                    )}

                </div>

            </div>


            {/* Account Setup */}
            <div className='border border-slate-200 rounded-2xl p-6'>

                <h3 className='text-lg font-semibold text-slate-900 mb-6'>
                    Account Setup
                </h3>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>

                    {/* First Name */}
                    <div>

                        <label className="block mb-2 text-sm font-medium text-slate-700">
                            First Name
                        </label>

                        <input
                            name="firstName"
                            required
                            defaultValue={initialData?.firstName}
                            className='w-full border border-slate-200 rounded-xl px-4 py-2 outline-none'
                        />

                    </div>

                    {/* Last Name */}
                    <div>

                        <label className="block mb-2 text-sm font-medium text-slate-700">
                            Last Name
                        </label>

                        <input
                            name="lastName"
                            required
                            defaultValue={initialData?.lastName}
                            className='w-full border border-slate-200 rounded-xl px-4 py-2 outline-none'
                        />

                    </div>

                    {/* Phone */}
                    <div>

                        <label className="block mb-2 text-sm font-medium text-slate-700">
                            Phone Number
                        </label>

                        <input
                            name="phone"
                            required
                            defaultValue={initialData?.phone}
                            className='w-full border border-slate-200 rounded-xl px-4 py-2 outline-none'
                        />

                    </div>

                    {/* Join Date */}
                    <div>

                        <label className="block mb-2 text-sm font-medium text-slate-700">
                            Join Date
                        </label>

                        <input
                            name="joinDate"
                            type='date'
                            required
                            defaultValue={
                                initialData?.joinDate
                                    ? new Date(initialData.joinDate)
                                        .toISOString()
                                        .split("T")[0]
                                    : ""
                            }
                            className='w-full border border-slate-200 rounded-xl px-4 py-2 outline-none'
                        />

                    </div>

                    {/* Bio */}
                    <div className='sm:col-span-2'>

                        <label className="block mb-2 text-sm font-medium text-slate-700">
                            Bio (Optional)
                        </label>

                        <textarea
                            name="bio"
                            rows={3}
                            defaultValue={initialData?.bio}
                            className='w-full border border-slate-200 rounded-xl px-4 py-3 outline-none resize-none'
                            placeholder='Brief description...'
                        />

                    </div>

                </div>

            </div>







            {/* Buttons */}
            <div className='flex justify-end gap-3'>

                <button
                    type='button'
                    onClick={onCancel}
                    className='px-5 py-2 rounded-xl border border-slate-200'
                >
                    Cancel
                </button>

                <button
                    type='submit'
                    disabled={loading}
                    className='btn-primary'
                >
                    {loading
                        ? "Saving..."
                        : isEditMode
                            ? "Update Employee"
                            : "Create Employee"}
                </button>

            </div>

        </form>
    )
}

export default EmployeeForm