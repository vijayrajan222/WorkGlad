import { format } from 'date-fns'
import { DownloadIcon } from 'lucide-react'
import React from 'react'

// FIX: default payslip=[] prevents .length / .map crash when prop is undefined
const PayslipList = ({ payslip = [], isAdmin }) => {

    return (

        <div className='card overflow-hidden'>

            {/* Header */}
            <div className='px-6 py-4 border-b border-slate-100'>
                <h3 className='font-semibold text-slate-900'>
                    Payslip History
                </h3>
            </div>

            {/* Table */}
            <div className='overflow-x-auto'>

                <table className='w-full'>

                    <thead>
                        <tr className='border-b border-slate-100 text-left text-sm text-slate-500'>

                            {isAdmin && (
                                <th className='px-6 py-4'>Employee</th>
                            )}

                            <th className='px-6 py-4'>Period</th>
                            <th className='px-6 py-4'>Basic Salary</th>
                            <th className='px-6 py-4'>Net Salary</th>
                            <th className='px-6 py-4 text-center'>Actions</th>

                        </tr>
                    </thead>

                    <tbody>

                        {payslip.length === 0 ? (

                            <tr>
                                <td
                                    colSpan={isAdmin ? 5 : 4}
                                    className='px-6 py-12 text-center text-slate-400'
                                >
                                    No payslips found
                                </td>
                            </tr>

                        ) : (

                            payslip.map((item) => (

                                <tr
                                    key={item._id || item.id}
                                    className='border-b border-slate-100 hover:bg-slate-50 transition-colors'
                                >

                                    {isAdmin && (
                                        <td className='px-6 py-4 font-medium text-slate-900'>
                                            {item.employee?.firstName}{" "}
                                            {item.employee?.lastName}
                                        </td>
                                    )}

                                    <td className='px-6 py-4 text-slate-600'>
                                        {format(
                                            new Date(item.year, item.month - 1),
                                            "MMMM yyyy"
                                        )}
                                    </td>

                                    <td className='px-6 py-4 text-slate-600'>
                                        ₹ {item.basicSalary?.toLocaleString()}
                                    </td>

                                    <td className='px-6 py-4 font-semibold text-slate-900'>
                                        ₹ {item.netSalary?.toLocaleString()}
                                    </td>

                                    <td className='px-6 py-4 text-center'>
                                        <button
                                            onClick={() =>
                                                window.open(
                                                    `/print/payslip/${item._id || item.id}`
                                                )
                                            }
                                            className='inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-slate-100 hover:bg-indigo-100 text-slate-700 hover:text-indigo-700 transition-colors'
                                        >
                                            <DownloadIcon className='w-4 h-4' />
                                            Download
                                        </button>
                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    )
}

export default PayslipList