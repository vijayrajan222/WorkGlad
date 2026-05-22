import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import EmployeeDashboard from '../components/EmployeeDashboard'
import AdminDashboard from '../components/AdminDashboard'
import { dashboardService } from '../services'

const Dashboard = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const dashboard = await dashboardService.getDashboard()
        setData(dashboard)
      } catch (err) {
        setError(err.message || "Failed to load dashboard")
      } finally {
        setLoading(false)
      }
    }

    fetchDashboard()
  }, [])

  if (loading) return <Loading />
  if (error) return <p className='text-center text-rose-500 py-12'>{error}</p>
  if (!data) return <p className='text-center text-slate-500 py-12'>Failed to load dashboard</p>

  if (data.role === "ADMIN") {
    return <AdminDashboard data={data} />
  } else {
    return <EmployeeDashboard data={data} />
  }

}

export default Dashboard
