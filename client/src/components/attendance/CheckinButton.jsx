import React, { useState } from 'react'
import { attendanceService } from '../../services'
import {
    Loader2Icon,
    LogInIcon,
    LogOutIcon
} from 'lucide-react'

const CheckinButton = ({
    todayRecord,
    onAction
}) => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleAttendance = async () => {

        setLoading(true)
        setError("")

        try {
            await attendanceService.clockInOut()
            if (onAction) {
                onAction()
            }
        } catch (err) {
            setError(err.message || "Attendance update failed")
        } finally {
            setLoading(false)
        }

    }

    // Work completed
    if (todayRecord?.checkOut) {

        return (

            <div className='bg-green-50 border border-green-200 rounded-2xl p-6 text-center'>

                <h3 className='text-lg font-semibold text-green-700'>
                    Work Day Completed
                </h3>

                <p className='text-sm text-green-600 mt-1'>
                    Great job! See you tomorrow.
                </p>

            </div>

        )

    }

    // Checked In?
    const isCheckedIn = !!todayRecord?.checkIn && !todayRecord?.checkOut

    return (

        <div className='absolute bottom-4 right-4 flex flex-col z-10'>
            {error && <p className='mb-2 text-xs text-rose-600 bg-white rounded-lg px-3 py-2 shadow'>{error}</p>}

    <button

        onClick={handleAttendance}

        disabled={loading}

        className={`w-full max-w-xs flex justify-between items-center gap-8 p-4 rounded-xl bg-gradient-to-br text-white shadow-xl transition-all duration-300 ${isCheckedIn
                ? "from-slate-700 to-slate-900"
                : "from-indigo-600 to-indigo-700"
            }`}
    >

        {loading ? (

            <Loader2Icon className="size-7 animate-spin" />

        ) : isCheckedIn ? (

            <LogOutIcon className="size-7" />

        ) : (

            <LogInIcon className="size-7" />

        )}

        <div className='relative flex flex-col items-center text-center'>

            <h2 className='text-lg font-medium mb-1'>

                {loading
                    ? "Processing..."
                    : isCheckedIn
                        ? "Clock Out"
                        : "Clock In"}

            </h2>

            <p className='text-xs opacity-80'>

                {isCheckedIn
                    ? "Click to end your shift"
                    : "Start your work day"}

            </p>

        </div>

    </button>

</div>

    )
}

export default CheckinButton
