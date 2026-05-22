import React, { useCallback, useEffect, useState } from 'react'
import Loading from "../components/Loading"
import CheckinButton from '../components/attendance/CheckinButton'
import AttandanceStats from '../components/attendance/AttandanceStats'
import AttendanceHistory from '../components/attendance/AttendanceHistory'
import { attendanceService } from '../services'

const Attendance = () => {

  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [isDeleted, setIsDeleted] = useState(false)
  const [error, setError] = useState("")

  const fetchData = useCallback(async () => {

    setLoading(true)
    setError("")

    try {
      const result = await attendanceService.getAttendance()
      setHistory(result.data || [])
      setIsDeleted(!!result.employee?.isDeleted)
    } catch (err) {
      setError(err.message || "Failed to load attendance")
    } finally {
      setLoading(false)
    }

  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (loading) return <Loading />
  if (error) return <p className='text-center text-rose-500 py-12'>{error}</p>

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
