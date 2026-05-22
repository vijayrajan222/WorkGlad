import React, { useCallback, useEffect, useState } from 'react'

import Loading from '../components/Loading'
import PayslipList from '../components/paySlip/PayslipList'
import GeneratePayslipForm from '../components/paySlip/GeneratePayslipForm'
import { authService, employeeService, payslipService } from '../services'

const Payslips = () => {
    const [payslips, setPayslips] = useState([])
    const [employees, setEmployees] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const isAdmin = authService.getStoredUser()?.role === "ADMIN"

    const fetchPayslips = useCallback(async () => {
        setLoading(true)
        setError("")

        try {
            const result = await payslipService.getPayslips()
            setPayslips(result.data || [])
        } catch (err) {
            setError(err.message || "Failed to load payslips")
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchPayslips()
    }, [fetchPayslips])

    useEffect(() => {
        const fetchEmployees = async () => {
            if (!isAdmin) return

            try {
                const data = await employeeService.getEmployees()
                setEmployees(data)
            } catch (err) {
                setError(err.message || "Failed to load employees")
            }
        }

        fetchEmployees()
    }, [isAdmin])

    if (loading) return <Loading />
    if (error) return <p className='text-center text-rose-500 py-12'>{error}</p>

    return (
        <div className='animate-fade-in'>
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8'>
                <div>
                    <h1 className='page-title'>Payslips</h1>
                    <p className='page-subtitle'>
                        {isAdmin
                            ? "Generate and manage employee payslips"
                            : "Your payslip history"}
                    </p>
                </div>

                {isAdmin && (
                    <GeneratePayslipForm
                        employees={employees}
                        onSuccess={fetchPayslips}
                    />
                )}
            </div>

            <PayslipList
                payslip={payslips}
                isAdmin={isAdmin}
            />
        </div>
    )
}

export default Payslips
