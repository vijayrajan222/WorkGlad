import React, { useCallback, useEffect, useState } from 'react'
import { dummyEmployeeData, dummyPayslipData } from "../assets/assets"
 
import Loading from '../components/Loading'
import PayslipList from '../components/paySlip/PayslipList'
// FIX: import was present but component was never rendered — now it replaces the plain button
import GeneratePayslipForm from '../components/paySlip/GeneratePayslipForm'
 
const Payslips = () => {
 
    const [payslips, setPayslips] = useState([])
    const [employees, setEmployees] = useState([])
    const [loading, setLoading] = useState(true)
 
    const isAdmin = true
 
    const fetchPayslips = useCallback(() => {
        setLoading(true)
        setTimeout(() => {
            setPayslips(dummyPayslipData)
            setLoading(false)
        }, 1000)
    }, [])
 
    useEffect(() => {
        fetchPayslips()
    }, [fetchPayslips])
 
    useEffect(() => {
        if (isAdmin) {
            setEmployees(dummyEmployeeData)
        }
    }, [isAdmin])
 
    if (loading) return <Loading />
 
    return (
 
        <div className='animate-fade-in'>
 
            {/* Header */}
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8'>
 
                {/* Left */}
                <div>
                    <h1 className='page-title'>Payslips</h1>
                    <p className='page-subtitle'>
                        {isAdmin
                            ? "Generate and manage employee payslips"
                            : "Your payslip history"}
                    </p>
                </div>
 
                {/* Right — FIX: replaced dead <button> with the modal component */}
                {isAdmin && (
                    <GeneratePayslipForm
                        employees={employees}
                        onSuccess={fetchPayslips}   // refreshes the list after generation
                    />
                )}
 
            </div>
 
            {/* Table */}
            <PayslipList
                payslip={payslips}
                isAdmin={isAdmin}
            />
 
        </div>
 
    )
}
 
export default Payslips