import express from "express";
import cors from "cors";
import "dotenv/config";
import multer from "multer";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import employeesRouter from "./routes/employeeRoutes.js";
import profileRouter from "./routes/profileRoutes.js";
import attendanceRouter from "./routes/attendanceRoutes.js";
import leaveRouter from "./routes/leaveRoutes.js";
import payslipRouter from "./routes/payslipsRoutes.js";
import dashboardRouter from "./routes/dashboardRoutes.js";
import { log } from "node:console";

const app = express();

const PORT = process.env.PORT || 4000;

log(process.env.CLIENT_URL)
app.use(cors({
    origin: [process.env.CLIENT_URL, "http://localhost:5173"]
}));
app.use(express.json());
app.use(multer().none());

app.get("/", (req, res) => {res.send("server is running");});
app.use("/api/auth",authRouter)
app.use("/api/employees",employeesRouter)
app.use("/api/profile",profileRouter)
app.use("/api/attendance",attendanceRouter)
app.use("/api/leave",leaveRouter)
app.use("/api/payslips",payslipRouter)
app.use("/api/dashboard",dashboardRouter)

await connectDB();

app.listen(PORT, () => {
    console.log("server is running in " + PORT);
});
