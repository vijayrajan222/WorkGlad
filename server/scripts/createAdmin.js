import "dotenv/config";
import bcrypt from "bcrypt";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import connectDB from "../config/db.js";
import User from "../models/User.js";

const rl = readline.createInterface({ input, output });

const askRequired = async (question) => {
  const answer = (await rl.question(question)).trim();

  if (!answer) {
    throw new Error(`${question.replace(": ", "")} is required`);
  }

  return answer;
};

try {
  await connectDB();

  const existingAdmin = await User.findOne({ role: "ADMIN" }).select("email").lean();

  if (existingAdmin) {
    console.log(`Admin already exists: ${existingAdmin.email}`);
    process.exitCode = 0;
  } else {
    const email = await askRequired("Admin email: ");
    const password = await askRequired("Admin password: ");

    const existingUser = await User.findOne({ email }).lean();

    if (existingUser) {
      throw new Error("A user with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      email,
      password: hashedPassword,
      role: "ADMIN",
    });

    console.log(`Admin created: ${email}`);
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
} finally {
  rl.close();
  await User.db.close();
}
