import React, { useState } from 'react'
import { format } from "date-fns"
import {
  CheckIcon,
  XIcon,
  Loader2Icon
} from "lucide-react"

const LeaveHistory = ({
  leave,
  isAdmin,
  onUpdate
}) => {

  const [processing, setProcessing] = useState(null)

  const handleStatusUpdate = (id, status) => {

    setProcessing(id)

    setTimeout(() => {

      onUpdate(id, status)

      setProcessing(null)

    }, 1000)

  }

  return (

    <div className='card overflow-hidden'>

      {/* Header */}
      <div className='px-6 py-4 border-b border-slate-100'>

        <h3 className='font-semibold text-slate-900'>
          Leave History
        </h3>

      </div>

      {/* Table */}
      <div className='overflow-x-auto'>

        <table className='w-full'>

          <thead>

            <tr className='border-b border-slate-100 text-left text-sm text-slate-500'>

              {isAdmin && (
                <th className='px-6 py-4'>
                  Employee
                </th>
              )}

              <th className='px-6 py-4'>Type</th>

              <th className='px-6 py-4'>Start Date</th>

              <th className='px-6 py-4'>End Date</th>

              <th className='px-6 py-4'>Reason</th>

              <th className='px-6 py-4'>Status</th>

              {isAdmin && (
                <th className='px-6 py-4 text-center'>
                  Actions
                </th>
              )}

            </tr>

          </thead>

          <tbody>

            {leave.map((item) => (

              <tr
                key={item.id}
                className='border-b border-slate-100 hover:bg-slate-50 transition-colors'
              >

                {/* Employee */}
                {isAdmin && (

                  <td className='px-6 py-4 font-medium text-slate-900'>

                    {item.employeeName || "John Doe"}

                  </td>

                )}

                {/* Type */}
                <td className='px-6 py-4 font-medium text-slate-900'>
                  {item.type}
                </td>

                {/* Start */}
                <td className='px-6 py-4 text-slate-600'>

                  {format(
                    new Date(item.startDate),
                    "dd-MM-yyyy"
                  )}

                </td>

                {/* End */}
                <td className='px-6 py-4 text-slate-600'>

                  {format(
                    new Date(item.endDate),
                    "dd-MM-yyyy"
                  )}

                </td>

                {/* Reason */}
                <td className='px-6 py-4 text-slate-600'>
                  {item.reason}
                </td>

                {/* Status */}
                <td className='px-6 py-4'>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${item.status === "APPROVED"
                        ? "bg-green-100 text-green-700"
                        : item.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                  >

                    {item.status}

                  </span>

                </td>

                {/* Actions */}
                {isAdmin && (

                  <td className='px-6 py-4'>

                    {item.status === "PENDING" ? (

                      <div className='flex items-center justify-center gap-2'>

                        {/* Approve */}
                        <button
                          onClick={() =>
                            handleStatusUpdate(
                              item.id,
                              "APPROVED"
                            )
                          }
                          disabled={processing === item.id}
                          className='p-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 transition-colors'
                        >

                          {processing === item.id ? (

                            <Loader2Icon className='w-4 h-4 animate-spin' />

                          ) : (

                            <CheckIcon className='w-4 h-4' />

                          )}

                        </button>

                        {/* Reject */}
                        <button
                          onClick={() =>
                            handleStatusUpdate(
                              item.id,
                              "REJECTED"
                            )
                          }
                          disabled={processing === item.id}
                          className='p-2 rounded-lg bg-rose-100 text-rose-700 hover:bg-rose-200 transition-colors'
                        >

                          <XIcon className='w-4 h-4' />

                        </button>

                      </div>

                    ) : (

                      <p className='text-xs text-slate-400 text-center'>
                        No Actions
                      </p>

                    )}

                  </td>

                )}

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  )
}

export default LeaveHistory