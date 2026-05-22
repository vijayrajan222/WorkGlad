import { Plus, X, Loader2Icon } from 'lucide-react'
import React, { useMemo, useState } from 'react'
import { payslipService } from '../../services'

const EMPTY_FORM = {
    employeeId: '',
    month: '',
}

const getMonthValue = (date) => {
    const month = String(date.getMonth() + 1).padStart(2, "0")
    return `${date.getFullYear()}-${month}`
}

const GeneratePayslipForm = ({ employees = [], onSuccess }) => {

    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [form, setForm] = useState(EMPTY_FORM)

    const currentMonth = useMemo(() => {
        const date = new Date()
        date.setDate(1)
        return getMonthValue(date)
    }, [])

    const minMonth = useMemo(() => {
        const date = new Date()
        date.setDate(1)
        date.setFullYear(date.getFullYear() - 1)
        return getMonthValue(date)
    }, [])

    const selectedEmployee = employees.find((emp) => String(emp.id || emp._id) === String(form.employeeId))
    const basicSalary = Number(selectedEmployee?.basicSalary || 0)
    const allowances = Number(selectedEmployee?.allowances || 0)
    const deductions = Number(selectedEmployee?.deductions || 0)
    const netSalary = basicSalary + allowances - deductions

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
        setError("")
    }

    const handleClose = () => {
        setIsOpen(false)
        setError("")
        setForm(EMPTY_FORM)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        const [year, month] = form.month.split("-")

        try {
            await payslipService.createPayslip({
                employeeId: form.employeeId,
                month,
                year,
            })
            if (onSuccess) onSuccess()
            handleClose()
        } catch (err) {
            setError(err.message || "Failed to generate payslip")
        } finally {
            setLoading(false)
        }
    }

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
            <div
                className='fixed inset-0 z-40 bg-black/60 backdrop-blur-sm'
                onClick={handleClose}
            />

            <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
                <div
                    className='w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-fade-in'
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className='flex items-start justify-between px-6 py-5 border-b border-slate-100'>
                        <div>
                            <h2 className='text-xl font-semibold text-slate-900'>
                                Generate Payslip
                            </h2>
                            <p className='text-sm text-slate-500 mt-1'>
                                Uses salary details configured in employee management
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

                    <form onSubmit={handleSubmit} className='p-6 space-y-5'>
                        {error && (
                            <div className='p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl'>
                                {error}
                            </div>
                        )}

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
                                    <option key={emp.id || emp._id} value={emp.id || emp._id}>
                                        {emp.firstName} {emp.lastName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className='block mb-2 text-sm font-medium text-slate-700'>
                                Salary Month
                            </label>
                            <input
                                type='month'
                                name='month'
                                required
                                min={minMonth}
                                max={currentMonth}
                                value={form.month}
                                onChange={handleChange}
                                className='w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500'
                            />
                        </div>

                        {selectedEmployee && (
                            <div className='grid grid-cols-1 sm:grid-cols-4 gap-3 rounded-2xl border border-slate-200 p-4 bg-slate-50'>
                                <div>
                                    <p className='text-xs text-slate-500'>Basic</p>
                                    <p className='font-semibold text-slate-900'>Rs. {basicSalary.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className='text-xs text-slate-500'>Allowances</p>
                                    <p className='font-semibold text-emerald-700'>Rs. {allowances.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className='text-xs text-slate-500'>Deductions</p>
                                    <p className='font-semibold text-rose-700'>Rs. {deductions.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className='text-xs text-slate-500'>Net</p>
                                    <p className='font-semibold text-indigo-700'>Rs. {netSalary.toLocaleString()}</p>
                                </div>
                            </div>
                        )}

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
