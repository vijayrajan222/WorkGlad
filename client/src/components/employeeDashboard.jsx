import React from 'react'
import {CalendarIcon, DollarSignIcon, FileTextIcon, Subtitles} from "lucide-react"

const employeeDashboard = () => {
    const emp = data.employee;
    const cards = [
        {
            icon: CalendarIcon,
            value: data.currentMonthAttendance,
            title: "Days Present",
            subtitle: "This month"
        },
        {
            icon: FileTextIcon,
            value: data.pendingLeaves,
            title: "Pending Leaves",
            subtitle: "Awaiting approval"
        },
        {
            icon: DollarSignIcon,
            value: data.latestPayslip? `$${data.latestPayslip.netSalary?.toLocaleString()}`:"N/A",
            title: "Latest Payslip",
            subtitle: "Most recent payout"
        },
    ]
  return (
    <div className='animate-fade-in'>
        <div className='page-header'>
            <h1 className='page-title'>Welcome, {emp?.firstName}</h1>
            <p className='page-subtitle'> </p>
            {emp?.position}-{emp?.department||"No department"}
        </div>
      
    </div>
  )
}

export default employeeDashboard
