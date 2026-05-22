import Employee from "../models/Employee.js";
import Payslip from "../models/Payslip.js";

export const createPayslip = async (req, res) => {

    try {
const { employeeId, month, year } = req.body;
          if (!employeeId || month === undefined || year === undefined) {
          return res.status(400).json({ error: "Missing fields" });
         }

       const parsedMonth = Number(month);
        const parsedYear = Number(year);

        const invalidNumber =
            !Number.isFinite(parsedMonth) ||
            !Number.isFinite(parsedYear);

        if (invalidNumber || parsedMonth < 1 || parsedMonth > 12 || parsedYear < 2000) {
            return res.status(400).json({ error: "Invalid payroll input" });
        }

        const selectedPeriod = new Date(parsedYear, parsedMonth - 1, 1);
        const currentMonth = new Date();
        currentMonth.setDate(1);
        currentMonth.setHours(0, 0, 0, 0);

        const oneYearAgo = new Date(currentMonth);
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

        if (selectedPeriod > currentMonth) {
            return res.status(400).json({ error: "Cannot create payslip for a future month" });
        }

        if (selectedPeriod < oneYearAgo) {
            return res.status(400).json({ error: "Payslip month must be within the last one year" });
        }

        const employee = await Employee.findById(employeeId);

        if (!employee || employee.isDeleted) {
            return res.status(404).json({ error: "Employee not found" });
        }

        const basicSalary = Number(employee.basicSalary || 0);
        const allowances = Number(employee.allowances || 0);
        const deductions = Number(employee.deductions || 0);
        const netSalary = basicSalary + allowances - deductions;
        const payslip = await Payslip.create({
            employeeId,
            month: parsedMonth,
            year: parsedYear,
            basicSalary,
            allowances,
            deductions,
            netSalary,
        });

        return res.json({success: true, data: payslip});

    } catch (error) {
        return res.status(500).json({error: "Failed"});
    }
};


export const getPayslips = async (req, res) => {

    try {

        const session = req.session;
        const isAdmin = session.role === "ADMIN";

        if (isAdmin) {
            const payslips = await Payslip.find().populate("employeeId").sort({ createdAt: -1 });
            const data = payslips.map((p) => {const obj = p.toObject();

                return {
                    ...obj,
                    id: obj._id.toString(),
                    employee: obj.employeeId,
                    employeeId: obj.employeeId?._id?.toString(),
                };
            });
            return res.json({ data });
        }

        else {
            const employee = await Employee.findOne({userId: session.userId});

            if (!employee) {
                return res.status(404).json({error: "Not found"});
            }

            const payslips = await Payslip.find({employeeId: employee._id}).sort({ createdAt: -1 });

            return res.json({data: payslips});
        }

    } catch (error) {
        return res.status(500).json({error: "Failed"});
    }
};

export const getPayslipById = async (req, res) => {
    try {
        const payslip = await Payslip.findById(req.params.id).populate("employeeId").lean();
        if (!payslip) {
            return res.status(404).json({error: "Not found"});
        }
        const isAdmin = req.session.role === "ADMIN";
        if (!isAdmin) {
            const employee = await Employee.findOne({ userId: req.session.userId }).lean();
            const ownerId = payslip.employeeId?._id?.toString?.() || payslip.employeeId?.toString?.();
            if (!employee || ownerId !== employee._id.toString()) {
                return res.status(403).json({ error: "Forbidden" });
            }
        }
        const result = {
            ...payslip,
            id: payslip._id.toString(),
            employee: payslip.employeeId,
        };
        return res.json(result);

    } catch (error) {
        return res.status(500).json({error: "Failed"});
    }
};
