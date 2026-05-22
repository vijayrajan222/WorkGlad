import Employee from "../models/Employee.js";
import Payslip from "../models/Payslip.js";

export const createPayslip = async (req, res) => {

    try {
const { employeeId, month, year, basicSalary, allowances, deductions } = req.body;
          if (!employeeId || month === undefined || year === undefined || basicSalary === undefined) {
          return res.status(400).json({ error: "Missing fields" });
         }

       const parsedMonth = Number(month);
        const parsedYear = Number(year);
        const parsedBasic = Number(basicSalary);
        const parsedAllowances = Number(allowances ?? 0);
        const parsedDeductions = Number(deductions ?? 0);

        const invalidNumber =
            !Number.isFinite(parsedMonth) ||
            !Number.isFinite(parsedYear) ||
            !Number.isFinite(parsedBasic) ||
            !Number.isFinite(parsedAllowances) ||
            !Number.isFinite(parsedDeductions);

        if (invalidNumber || parsedMonth < 1 || parsedMonth > 12 || parsedYear < 2000 || parsedBasic < 0 || parsedAllowances < 0 || parsedDeductions < 0) {
            return res.status(400).json({ error: "Invalid payroll input" });
        }

        const netSalary = parsedBasic + parsedAllowances - parsedDeductions;
        const payslip = await Payslip.create({
            employeeId,
            month: Number(month),
            year: Number(year),
            basicSalary: Number(basicSalary),
            allowances: Number(allowances || 0),
            deductions: Number(deductions || 0),
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