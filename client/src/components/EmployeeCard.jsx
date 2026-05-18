import React from 'react'
import { PencilIcon, Trash2Icon } from 'lucide-react'

const EmployeeCard = ({ employee, onDelete, onEdit }) => {

    // Delete Handler
    const handleDelete = async (e) => {

        e.stopPropagation()

        const confirmDelete = window.confirm(
            `Are you sure you want to delete ${employee.firstName}?`
        )

        if (!confirmDelete) return

        onDelete(employee.id)

    }

    // Edit Handler
    const handleEdit = (e) => {

        e.stopPropagation()

        onEdit(employee)

    }

    return (

        <div className='group relative bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-indigo-200 active:scale-[0.98] cursor-pointer'>

            {/* Top Section */}
            <div className='relative h-72 bg-slate-50 flex items-center justify-center'>

                {/* Department Badge */}
                <div className='absolute top-4 left-4'>

                    <span className='bg-white px-3 py-1 text-xs font-semibold text-slate-600 rounded-xl shadow-sm border border-slate-200'>
                        {employee.department || "Remote"}
                    </span>

                </div>

                {/* Deleted Badge */}
                {employee.isDeleted && (

                    <div className='absolute top-4 right-4'>

                        <span className='bg-red-500 text-white px-3 py-1 text-xs font-semibold rounded-xl'>
                            DELETED
                        </span>

                    </div>

                )}

                {/* Avatar */}
                <div className='w-24 h-24 rounded-full bg-indigo-50 flex items-center justify-center transition-transform duration-300 group-hover:scale-110'>

                    <span className='text-3xl font-medium text-indigo-500'>
                        {employee.firstName[0]}
                        {employee.lastName[0]}
                    </span>

                </div>

            </div>

            {/* Hover Actions */}
            {!employee.isDeleted && (

                <div className='absolute inset-0 bg-linear-to-t from-indigo-700/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6 gap-3'>

                    {/* Edit Button */}
                    <button
                        onClick={handleEdit}
                        className='p-2.5 bg-white/90 backdrop-blur-sm text-slate-700 hover:text-indigo-600 rounded-xl shadow-lg transition-all hover:scale-105'
                    >

                        <PencilIcon className="w-4 h-4" />

                    </button>

                    {/* Delete Button */}
                    <button
                        onClick={handleDelete}
                        className='p-2.5 bg-white/90 backdrop-blur-sm text-slate-700 hover:text-rose-600 rounded-xl shadow-lg transition-all hover:scale-105 disabled:opacity-50'
                    >

                        <Trash2Icon className="w-4 h-4" />

                    </button>

                </div>

            )}

            {/* Bottom Section */}
            <div className='p-5 border-t border-slate-100'>

                <h3 className='text-lg font-semibold text-slate-900'>
                    {employee.firstName} {employee.lastName}
                </h3>

                <p className='text-sm text-slate-500 mt-1'>
                    {employee.position}
                </p>

            </div>

        </div>

    )
}

export default EmployeeCard