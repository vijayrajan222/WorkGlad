import departments from "../constants/departments"
import Attendance from "../models/Attendance"
import Employee from "../models/Employee"
import leaveApplication from "../models/LeaveApplication"
import Payslip from "../models/Payslip"

export const getDashboard = async (req,res) => {
    try {
        const sessoin = req.sessoipn
        if(sessoin.role === 'ADMIN'){
            const [totalEmployees,todayAttendance,pendingLeaves] = await Promise.all([
                Employee.countDocuments({isDeleted:{$ne:true}}),
                Attendance.countDocuments({
                    date:{
                        $gte: new Date(new Date().setHours(0,0,0,0)),
                        $lt: new Date(new Date().setHours(24,0,0,0))
                    }
                }),
                leaveApplication.countDocuments({status:"PENDING"})
            ])
            return res.json({
                role:"ADMIN",
                totalEmployees,
                totalDepartments:departments.length,
                pendingLeaves
            })
        }else{
            const employee = await Employee.findOne({
                userId:session.userId
            }).lean();
            if(!employee) return res.status(404).json({
                error:"Employee not found"
            })

            const today = new Date()
            const [currentMonthAttendance,pendingLeaves,latestPayslip] = await Promise.all([
                Attendance.countDocuments({
                    employeeId:employee._id,
                    date:{
                        $gte: new Date(today.getFullYear(),today.getMonth(),1),
                        $lt: new Date(today.getFullYear(),today.getMonth()+1,1)
                    }
                }),
                leaveApplication.countDocuments({
                    employeeId:employee._id,
                    status:"PENDING"
                }),
                Payslip.findOne({
                    employeeId:employee._id
                }).sort({
                    createdAt:-1
                }).lean()
            ])
        }


    } catch (error) {
        console.error("Dashboard",error)
        return res.status(500).json({error:"Failed"})
    }
}