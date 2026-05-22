import Employee from "../models/Employee.js";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import departments from "../constants/departments.js";
import { isValidEmail, trimString, validateDate, validateNumber, validateText } from "../utils/validation.js";

const validateEmployeePayload = (body, isEdit = false) => {
    const firstName = validateText(body.firstName, "First name", 2, 50);
    const lastName = validateText(body.lastName, "Last name", 2, 50);
    const email = trimString(body.email).toLowerCase();
    const phone = validateText(body.phone, "Phone", 7, 20);
    const position = validateText(body.position, "Position", 2, 80);
    const department = trimString(body.department) || "Engineering";
    const basicSalary = validateNumber(body.basicSalary, "Basic salary", 0, 10000000);
    const allowances = validateNumber(body.allowances ?? 0, "Allowances", 0, 10000000);
    const deductions = validateNumber(body.deductions ?? 0, "Deductions", 0, 10000000);
    const joinDate = validateDate(body.joinDate, "Join date");
    const bio = validateText(body.bio || "", "Bio", 0, 500);
    const role = trimString(body.role || "EMPLOYEE").toUpperCase();
    const employmentStatus = trimString(body.employmentStatus || "ACTIVE").toUpperCase();
    const password = trimString(body.password);

    const validations = [firstName, lastName, phone, position, basicSalary, allowances, deductions, joinDate, bio];
    const failed = validations.find((item) => item.error);
    if (failed) return { error: failed.error };

    if (!isValidEmail(email) || email.length > 120) return { error: "Valid email is required" };
    if (!departments.includes(department)) return { error: "Invalid department" };
    if (!["ADMIN", "EMPLOYEE"].includes(role)) return { error: "Invalid role" };
    if (!["ACTIVE", "INACTIVE"].includes(employmentStatus)) return { error: "Invalid employment status" };
    if (!isEdit && password.length < 8) return { error: "Password must be at least 8 characters" };
    if (password && password.length > 72) return { error: "Password cannot exceed 72 characters" };

    return {
        value: {
            firstName: firstName.value,
            lastName: lastName.value,
            email,
            phone: phone.value,
            position: position.value,
            department,
            basicSalary: basicSalary.value,
            allowances: allowances.value,
            deductions: deductions.value,
            joinDate: joinDate.value,
            password,
            role,
            bio: bio.value,
            employmentStatus,
        },
    };
};

//Get employees
//Get /api/employees
export const getEmployees = async (req,res)=>{
    try {
        const { department } = req.query;
        const where = {};
        if (department) {
            where.department = department;
        }

        const employees = await Employee.find(where)
            .sort({ createdAt: -1 })
            .populate("userId", "email role")
            .lean();

        const result = employees.map((emp) => ({
            ...emp,
            id: emp._id.toString(),
            user: emp.userId
                ? {
                      email: emp.userId.email,
                      role: emp.userId.role,
                  }
                : null,
        }));
        return res.json(result);
    } catch (error) {
        return res.status(500).json({
            error: "Failed to fetch employees",
        });
    }
}

export const createEmployees = async (req,res)=>{
    try {

        const validation = validateEmployeePayload(req.body);

        if (validation.error) {
            return res.status(400).json({
                error: validation.error
            });
        }

        const employeeData = validation.value;

        const hashed = await bcrypt.hash(employeeData.password, 10);
        const user = await User.create({
            email: employeeData.email,
            password: hashed,
            role: employeeData.role
        });

        const employee = await Employee.create({

            userId: user._id,

            firstName: employeeData.firstName,
            lastName: employeeData.lastName,
            email: employeeData.email,
            phone: employeeData.phone,
            position: employeeData.position,
            department: employeeData.department,
            basicSalary: employeeData.basicSalary,
            allowances: employeeData.allowances,
            deductions: employeeData.deductions,
            joinDate: employeeData.joinDate,
            bio: employeeData.bio
        });

        return res.status(201).json({
            success: true,
            employee
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                error: "Email already exists"
            });
        }
        console.error("Create employee error:", error);
        return res.status(500).json({
            error: "Failed to create employee"
        });
    }
}

export const updateEmployees = async (req,res)=>{
    try {

        const { id } = req.params;
        const validation = validateEmployeePayload(req.body, true);

        if (validation.error) {
            return res.status(400).json({
                error: validation.error
            });
        }

        const employeeData = validation.value;

        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({
                error: "Employee not found"
            });
        }

        await Employee.findByIdAndUpdate(id, {

            firstName: employeeData.firstName,
            lastName: employeeData.lastName,
            email: employeeData.email,
            phone: employeeData.phone,
            position: employeeData.position,
            department: employeeData.department,
            basicSalary: employeeData.basicSalary,
            allowances: employeeData.allowances,
            deductions: employeeData.deductions,
            employmentStatus: employeeData.employmentStatus,
            bio: employeeData.bio
        });

        const userUpdate = { email: employeeData.email };
        if (employeeData.role) {
            userUpdate.role = employeeData.role;
        }
        if (employeeData.password) {
            userUpdate.password = await bcrypt.hash(employeeData.password, 10);
        }
        await User.findByIdAndUpdate(employee.userId, userUpdate);

        return res.json({
            success: true
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                error: "Email already exists"
            });
        }

        return res.status(500).json({
            error: "Failed to update employee"
        });
    }
}

export const deleteEmployees = async (req,res)=>{
    try {
        const { id } = req.params;

        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({
                error: "Employee not found"
            });
        }

        employee.isDeleted = true;
        employee.employmentStatus = "INACTIVE";
        await employee.save();
        return res.json({
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            error: "Failed to delete employee"
        });
    }
}

