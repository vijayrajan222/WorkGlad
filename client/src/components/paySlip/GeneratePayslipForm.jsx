import { Plus, X, Loader2Icon } from 'lucide-react'
import React, { useState } from 'react'
 
const EMPTY_FORM = {
    employeeId: '',
    basicSalary: '',
    month: '',
    bonus: '',
    deductions: '',
}
 
const GeneratePayslipForm = ({ employees = [], onSuccess }) => {
 
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
 
    // FIX: controlled form state — values are now readable on submit
    const [form, setForm] = useState(EMPTY_FORM)
 
    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }
 
    const handleClose = () => {
        setIsOpen(false)
        setForm(EMPTY_FORM)   // reset form on close
    }
 
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
 
        // Replace this block with your real API call, e.g.:
        // await axios.post('/api/payslips', form) 
        setTimeout(() => {
            if (onSuccess) onSuccess()
            setLoading(false)
            handleClose()
        }, 1000)
    }
 
    // Button View
    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className='btn-primary flex items-center gap-2 w-full sm:w-auto justify-center'
            >
                <Plus className='w-4 h-4' />
                Generate Payslip
            </button>
        )
    }
 
    return (
        <>
            {/* Overlay */}
            <div
                className='fixed inset-0 z-40 bg-black/60 backdrop-blur-sm'
                onClick={handleClose}
            />
 
            {/* Modal */}
            <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
 
                <div
                    className='w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-fade-in'
                    onClick={(e) => e.stopPropagation()}
                >
 
                    {/* Header */}
                    <div className='flex items-start justify-between px-6 py-5 border-b border-slate-100'>
                        <div>
                            <h2 className='text-xl font-semibold text-slate-900'>
                                Generate Payslip
                            </h2>
                            <p className='text-sm text-slate-500 mt-1'>
                                Create employee salary slip
                            </p>
                        </div>
                        <button
                            type='button'
                            onClick={handleClose}
                            className='p-2 rounded-xl hover:bg-slate-100 transition-colors'
                        >
                            <X className='w-5 h-5 text-slate-500' />
                        </button>
                    </div>
 
                    {/* Form */}
                    <form onSubmit={handleSubmit} className='p-6 space-y-5'>
 
                        {/* Employee */}
                        <div>
                            <label className='block mb-2 text-sm font-medium text-slate-700'>
                                Employee
                            </label>
                            <select
                                name='employeeId'
                                required
                                value={form.employeeId}
                                onChange={handleChange}
                                className='w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500'
                            >
                                <option value=''>Select Employee</option>
                                {employees.map((emp) => (
                                    <option key={emp.id} value={emp.id}>
                                        {emp.firstName} {emp.lastName}
                                    </option>
                                ))}
                            </select>
                        </div>
 
                        {/* Basic Salary */}
                        <div>
                            <label className='block mb-2 text-sm font-medium text-slate-700'>
                                Basic Salary
                            </label>
                            <input
                                type='number'
                                name='basicSalary'
                                required
                                min={0}
                                placeholder='Enter salary amount'
                                value={form.basicSalary}
                                onChange={handleChange}
                                className='w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500'
                            />
                        </div>
 
                        {/* Month */}
                        <div>
                            <label className='block mb-2 text-sm font-medium text-slate-700'>
                                Salary Month
                            </label>
                            <input
                                type='month'
                                name='month'
                                required
                                value={form.month}
                                onChange={handleChange}
                                className='w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500'
                            />
                        </div>
 
                        {/* Bonus */}
                        <div>
                            <label className='block mb-2 text-sm font-medium text-slate-700'>
                                Bonus
                            </label>
                            <input
                                type='number'
                                name='bonus'
                                min={0}
                                placeholder='Optional bonus'
                                value={form.bonus}
                                onChange={handleChange}
                                className='w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500'
                            />
                        </div>
 
                        {/* Deductions */}
                        <div>
                            <label className='block mb-2 text-sm font-medium text-slate-700'>
                                Deductions
                            </label>
                            <input
                                type='number'
                                name='deductions'
                                min={0}
                                placeholder='Optional deductions'
                                value={form.deductions}
                                onChange={handleChange}
                                className='w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500'
                            />
                        </div>
 
                        {/* Buttons */}
                        <div className='flex flex-col sm:flex-row gap-3 pt-2'>
                            <button
                                type='button'
                                onClick={handleClose}
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
                                        Generating...
                                    </>
                                ) : (
                                    "Generate Payslip"
                                )}
                            </button>
                        </div>
 
                    </form>
 
                </div>
            </div>
        </>
    )
}
 
export default GeneratePayslipForm