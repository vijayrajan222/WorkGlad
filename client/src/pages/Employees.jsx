import React, { useCallback, useEffect, useState } from 'react'
import { Plus, Search, X } from 'lucide-react'
import { DEPARTMENTS } from '../assets/assets'
import EmployeeCard from '../components/EmployeeCard'
import EmployeeForm from '../components/EmployeeForm'
import { employeeService } from '../services'

const Employees = () => {

  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true) 
  const [error, setError] = useState("")

  const [search, setSearch] = useState("")
  const [selectDept, setSelectDept] = useState("")

  const [editEmployee, setEditEmployee] = useState(null) // null because no employee is selected yet when we select it will be a object 
  const [showCreateModel, setShowCreateModel] = useState(false)

  // Fetch Employees
  const fetchEmployees = useCallback(async () => {

    setLoading(true)
    setError("")

    try {
      const data = await employeeService.getEmployees(selectDept ? { department: selectDept } : {})
      setEmployees(data)
    } catch (err) {
      setError(err.message || "Failed to load employees")
    } finally {
      setLoading(false)
    }

  }, [selectDept])

  useEffect(() => {
    fetchEmployees()
  }, [fetchEmployees])

  // Search Filter
  const filtered = employees.filter((emp) =>

    `${emp.firstName} ${emp.lastName} ${emp.position}`
      .toLowerCase()
      .includes(search.toLowerCase())

  )

  const handleDelete = async (id) => {
    try {
      await employeeService.deleteEmployee(id)
      fetchEmployees()
    } catch (err) {
      setError(err.message || "Failed to delete employee")
    }
  }

  return (

    <div className='animate-fade-in'>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">

        <div>

          <h1 className="page-title">
            Employees
          </h1>

          <p className="page-subtitle">
            Manage your team members
          </p>

        </div>

        <button
          onClick={() => {
            setEditEmployee(null)
            setShowCreateModel(true)
          }}
          className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center">

          <Plus size={16} />

          Add Employee

        </button>

      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">

        {/* Search */}
        <div className="relative flex-1">

          <Search
            className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4"
          />

          <input
            type="text"
            placeholder="Search employees..."
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl outline-none"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />

        </div>

        {/* Department Filter */}
        <select
          value={selectDept}
          onChange={(e) => setSelectDept(e.target.value)}
          className='max-w-40 border border-slate-200 rounded-xl px-4 py-2 outline-none'
        >

          <option value="">
            All Departments
          </option>

          {DEPARTMENTS.map((deptName) => (

            <option
              value={deptName}
              key={deptName}
            >
              {deptName}
            </option>

          ))}

        </select>

      </div>

      {/* Employee Grid */}
      {loading ? (

        <div className="flex justify-center p-12">

          <div className="animate-spin h-8 w-8 border-2 border-indigo-600 border-t-transparent rounded-full" />

        </div>

      ) : error ? (

        <p className="text-center py-16 text-rose-500 bg-white rounded-2xl border border-rose-100">
          {error}
        </p>

      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">

          {filtered.length === 0 ? (

            <p className="col-span-full text-center py-16 text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200">
              No employees found
            </p>

          ) : (

            filtered.map((emp) => (

              <EmployeeCard
                key={emp.id}
                employee={emp}
                onDelete={handleDelete}
                onEdit={(employee) => {
                  setShowCreateModel(false)
                  setEditEmployee(employee)
                }}
              />

            ))

          )}

        </div>

      )}

      {/* Common Modal */}
      {(showCreateModel || editEmployee) && (

        <div
          className='fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto bg-black/40 backdrop-blur-sm'
          onClick={() => {
            setShowCreateModel(false)
            setEditEmployee(null)
          }}
        >

          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Header */}
            <div className="flex items-center justify-between p-6 pb-0">

              <div>

                <h2 className="text-lg font-semibold text-slate-900">

                  {editEmployee
                    ? "Edit Employee"
                    : "Add New Employee"}

                </h2>

                <p className='text-sm text-slate-500 mt-0.5'>

                  {editEmployee
                    ? "Update employee details"
                    : "Create a user account and employee profile"}

                </p>

              </div>

              <button
                onClick={() => {
                  setShowCreateModel(false)
                  setEditEmployee(null)
                }}
                className='p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600'
              >

                <X className="w-5 h-5" />

              </button>

            </div>

            {/* Form */}
            <div className='p-6'>

              <EmployeeForm

                initialData={editEmployee}

                onSuccess={() => {

                  setShowCreateModel(false)
                  setEditEmployee(null)

                  fetchEmployees()

                }}

                onCancel={() => {

                  setShowCreateModel(false)
                  setEditEmployee(null)

                }}

              />

            </div>

          </div>

        </div>

      )}

    </div>
  )
}

export default Employees
