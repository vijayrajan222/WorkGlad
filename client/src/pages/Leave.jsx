import React, { useCallback, useEffect, useState } from 'react'
import {
  ThermometerIcon,
  UmbrellaIcon,
  PalmtreeIcon,
  PlusIcon
} from "lucide-react"

import Loading from "../components/Loading"
import { dummyLeaveData } from "../assets/assets"
import LeaveHistory from '../components/leave/LeaveHistroy'
import ApplyLeaveModal from '../components/leave/ApplyLeaveModal'

const Leave = () => {

  const [leave, setLeave] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)

  const isAdmin = false

  // Fetch Data
  const fetchLeaves = useCallback(() => {

    setLoading(true)

    setTimeout(() => {

      setLeave(dummyLeaveData)

      setLoading(false)

    }, 1000)

  }, [])

  useEffect(() => {
    fetchLeaves()
  }, [fetchLeaves])

  // Update Status
  const handleLeaveUpdate = (id, status) => {

    setLeave((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status }
          : item
      )
    )

  }

  if (loading) return <Loading />

  // Stats
  const approvedLeaves = leave.filter(
    (l) => l.status === "APPROVED"
  )

  const sickCount = approvedLeaves.filter(
    (l) => l.type === "SICK"
  ).length

  const casualCount = approvedLeaves.filter(
    (l) => l.type === "CASUAL"
  ).length

  const annualCount = approvedLeaves.filter(
    (l) => l.type === "ANNUAL"
  ).length

  const leaveStats = [

    {
      label: "Sick Leave",
      value: sickCount,
      icon: ThermometerIcon
    },

    {
      label: "Casual Leave",
      value: casualCount,
      icon: UmbrellaIcon
    },

    {
      label: "Annual Leave",
      value: annualCount,
      icon: PalmtreeIcon
    }

  ]

  return (

    <div className='animate-fade-in'>

      {/* Header */}
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8'>

        <div>

          <h1 className='page-title'>
            Leave Management
          </h1>

          <p className='page-subtitle'>

            {isAdmin
              ? "Manage leave applications"
              : "Your leave history and requests"}

          </p>

        </div>

        {!isAdmin && !isDeleted && (

          <button
            onClick={() => setShowModal(true)}
            className='btn-primary flex items-center gap-2 w-full sm:w-auto justify-center'
          >

            <PlusIcon className='w-4 h-4' />

            Apply for Leave

          </button>

        )}

      </div>

      {/* Deleted Warning */}
      {isDeleted && (

        <div className='bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl p-5 mb-6'>

          <p>
            You cannot apply for leave because your employee profile has been marked as deleted.
          </p>

        </div>

      )}

      {/* Stats */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-8'>

        {leaveStats.map((s) => (

          <div
            key={s.label}
            className='card card-hover p-5 sm:p-6 flex items-center gap-4 relative overflow-hidden group'
          >

            <div className='absolute left-0 top-0 bottom-0 w-1 rounded-r-full bg-slate-500/70 group-hover:bg-indigo-500/70' />

            <div className='p-3 bg-slate-100 rounded-lg group-hover:bg-indigo-50 transition-colors duration-200'>

              <s.icon className='w-5 h-5 text-slate-600 group-hover:text-indigo-600 transition-colors duration-200' />

            </div>

            <div>

              <p className='text-sm text-slate-500'>
                {s.label}
              </p>

              <p className='text-2xl font-medium text-slate-900 tracking-tight'>
                {s.value}
              </p>

            </div>

          </div>

        ))}

      </div>

      {/* Leave History Component */}
      <LeaveHistory
        leave={leave}
        isAdmin={isAdmin}
        onUpdate={handleLeaveUpdate}
      />
      <ApplyLeaveModal open={showModal} onClose={()=> setShowModal(false)} onSuccess={fetchLeaves}/>
    </div>

  )
}

export default Leave