import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import { format } from 'date-fns'

import { PrinterIcon } from 'lucide-react'

import { dummyPayslipData } from '../assets/assets'

import Loading from '../components/Loading'

const PrintPaySlip = () => {

  const { id } = useParams()

  const [payslip, setPayslip] = useState(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {

    setPayslip(

      dummyPayslipData.find(
        (slip) => String(slip._id || slip.id) === String(id)
      )

    )

    setTimeout(() => {

      setLoading(false)

    }, 1000)

  }, [id])

  // Print Function
  const handlePrint = () => {

    window.print()

  }

  if (loading) return <Loading />

  if (!payslip) {

    return (

      <p className='p-10 text-center text-slate-500'>
        Payslip not found
      </p>

    )

  }

  return (

    <div className='min-h-screen bg-slate-100 p-6 flex justify-center'>

      <div className='w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden'>

        {/* Header */}
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 px-8 py-6'>

          <div>

            <h1 className='text-3xl font-bold text-slate-900'>
              PAYSLIP
            </h1>

            <p className='text-slate-500 mt-2'>

              {format(
                new Date(payslip.year, payslip.month - 1),
                "MMMM yyyy"
              )}

            </p>

          </div>

          {/* Print Button */}
          <button
            onClick={handlePrint}
            className='btn-primary flex items-center gap-2'
          >

            <PrinterIcon className='w-4 h-4' />

            Print Payslip

          </button>

        </div>

        {/* Employee Details */}
        <div className='px-8 py-6 border-b border-slate-100'>

          <h2 className='text-lg font-semibold text-slate-900 mb-4'>
            Employee Details
          </h2>

          <table className='w-full border border-slate-200 rounded-xl overflow-hidden'>

            <tbody>

              <tr className='border-b border-slate-100'>

                <td className='px-4 py-3 bg-slate-50 font-medium text-slate-700 w-1/3'>
                  Employee Name
                </td>

                <td className='px-4 py-3 text-slate-900'>
                  {payslip.employee?.firstName}{" "}
                  {payslip.employee?.lastName}
                </td>

              </tr>

              <tr className='border-b border-slate-100'>

                <td className='px-4 py-3 bg-slate-50 font-medium text-slate-700'>
                  Department
                </td>

                <td className='px-4 py-3 text-slate-900'>
                  {payslip.employee?.department}
                </td>

              </tr>

              <tr>

                <td className='px-4 py-3 bg-slate-50 font-medium text-slate-700'>
                  Payslip Period
                </td>

                <td className='px-4 py-3 text-slate-900'>

                  {format(
                    new Date(payslip.year, payslip.month - 1),
                    "MMMM yyyy"
                  )}

                </td>

              </tr>

            </tbody>

          </table>

        </div>

        {/* Salary Table */}
        <div className='px-8 py-6'>

          <h2 className='text-lg font-semibold text-slate-900 mb-4'>
            Salary Breakdown
          </h2>

          <table className='w-full border border-slate-200 rounded-xl overflow-hidden'>

            <thead>

              <tr className='bg-slate-50 border-b border-slate-200'>

                <th className='px-4 py-3 text-left text-sm font-semibold text-slate-700'>
                  Description
                </th>

                <th className='px-4 py-3 text-right text-sm font-semibold text-slate-700'>
                  Amount
                </th>

              </tr>

            </thead>

            <tbody>

              <tr className='border-b border-slate-100'>

                <td className='px-4 py-3 text-slate-700'>
                  Basic Salary
                </td>

                <td className='px-4 py-3 text-right font-medium text-slate-900'>
                  ₹ {payslip.basicSalary?.toLocaleString()}
                </td>

              </tr>

              <tr className='border-b border-slate-100'>

                <td className='px-4 py-3 text-slate-700'>
                  Allowances
                </td>

                <td className='px-4 py-3 text-right font-medium text-green-600'>
                  ₹ {payslip.allowances?.toLocaleString()}
                </td>

              </tr>

              <tr className='border-b border-slate-100'>

                <td className='px-4 py-3 text-slate-700'>
                  Deductions
                </td>

                <td className='px-4 py-3 text-right font-medium text-rose-600'>
                  ₹ {payslip.deductions?.toLocaleString()}
                </td>

              </tr>

              <tr className='bg-indigo-50'>

                <td className='px-4 py-4 text-lg font-bold text-slate-900'>
                  Net Salary
                </td>

                <td className='px-4 py-4 text-right text-lg font-bold text-indigo-700'>
                  ₹ {payslip.netSalary?.toLocaleString()}
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>

  )
}

export default PrintPaySlip