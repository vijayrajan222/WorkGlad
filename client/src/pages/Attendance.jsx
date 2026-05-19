import React, { useCallback, useEffect, useState } from 'react'
import Loading from "../components/Loading"
import { dummyAttendanceData } from "../assets/assets"
import CheckinButton from '../components/attendance/CheckinButton'
import AttandanceStats from '../components/attendance/AttandanceStats'
import AttendanceHistory from '../components/attendance/AttendanceHistory'

const Attendance = () => {

  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [isDeleted, setIsDeleted] = useState(false)

  const fetchData = useCallback(async () => {

    setLoading(true)

    setHistory(dummyAttendanceData)

    setTimeout(() => {
      setLoading(false)
    }, 1000)

  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (loading) return <Loading />

  // Today's record
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const todayRecord = history.find(
    (r) =>
      new Date(r.date).toDateString() === today.toDateString()
  )

  return (

    <div className="animate-fade-in">

      {/* Header */}
      <div className="page-header">

        <h1 className="page-title">
          Attendance
        </h1>

        <p className="page-subtitle">
          Track your work hours and daily check-ins
        </p>

      </div>

      {isDeleted ? (

        <div className='bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl p-5 mb-6'>

          <p>
            You can no longer clock in or out because your employee record has been marked as deleted.
          </p>

        </div>

      ) : (

        <div className='mb-6'>

          <CheckinButton
            todayRecord={todayRecord}
            onAction={fetchData}
          />

        </div>

      )}
      <AttandanceStats history={history} />
      <AttendanceHistory history={history} />
    </div>


  )
}

export default Attendance