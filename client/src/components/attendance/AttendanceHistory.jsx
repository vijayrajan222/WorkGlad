import React from 'react'
import { getDayTypeDisplay } from '../../assets/assets'
import { format } from "date-fns"

const AttendanceHistory = ({ history }) => {

    return (

        <div className='card overflow-hidden'>

            {/* Header */}
            <div className='px-6 py-4 border-b border-slate-100'>

                <h3 className='font-semibold text-slate-900'>
                    Recent Activity
                </h3>

            </div>

            {/* Table */}
            <div className='overflow-x-auto'>

                <table className='table-modern w-full'>

                    <thead>

                        <tr className='text-left text-slate-500 text-sm border-b border-slate-100'>

                            <th className='px-6 py-4'>Date</th>

                            <th className='px-6 py-4'>Check In</th>

                            <th className='px-6 py-4'>Check Out</th>

                            <th className='px-6 py-4'>Working Hours</th>

                            <th className='px-6 py-4'>Day Type</th>

                            <th className='px-6 py-4'>Status</th>

                        </tr>

                    </thead>

                    <tbody>

                        {history.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={6}
                                    className='px-6 py-12 text-center text-slate-400'
                                >

                                    No attendance records found

                                </td>

                            </tr>

                        ) : (

                            history.map((record) => {

                                const dayType = getDayTypeDisplay(record)

                                return (

                                    <tr
                                        key={record._id || record.id}
                                        className='border-b border-slate-100 hover:bg-slate-50 transition-colors'
                                    >

                                        {/* Date */}
                                        <td className='px-6 py-4 font-medium text-slate-900'>

                                            {format(
                                                new Date(record.date),
                                                "MMM dd, yyyy"
                                            )}

                                        </td>

                                        {/* Check In */}
                                        <td className='px-6 py-4 text-slate-600'>

                                            {record.checkIn
                                                ? format(
                                                    new Date(record.checkIn),
                                                    "hh:mm a"
                                                )
                                                : "--"}

                                        </td>

                                        {/* Check Out */}
                                        <td className='px-6 py-4 text-slate-600'>

                                            {record.checkOut
                                                ? format(
                                                    new Date(record.checkOut),
                                                    "hh:mm a"
                                                )
                                                : "--"}

                                        </td>

                                        {/* Working Hours */}
                                        <td className='px-6 py-4 text-slate-600'>

                                            {record.workingHours || "0"} hrs

                                        </td>

                                        {/* Day Type */}
                                        <td className='px-6 py-4'>

                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${dayType.className}`}
                                            >

                                                {dayType.label}

                                            </span>

                                        </td>

                                        {/* Status */}
                                        <td className='px-6 py-4'>

                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${record.status === "PRESENT"
                                                    ? "bg-green-100 text-green-700"
                                                    : record.status === "LATE"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-rose-100 text-rose-700"
                                                    }`}
                                            >

                                                {record.status}

                                            </span>

                                        </td>

                                    </tr>

                                )

                            })

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    )
}

export default AttendanceHistory