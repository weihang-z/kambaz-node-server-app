import "dotenv/config";
import express from 'express'
import session from "express-session";
import Hello from "./Hello.js"
import Lab5 from "./Lab5/index.js"
import cors from "cors";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModulesRoutes from "./Kambaz/Modules/routes.js";
import AssignmentsRoutes from "./Kambaz/Assignments/routes.js";
import db from "./Kambaz/Database/index.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import mongoose from "mongoose";

const CONNECTION_STRING = process.env.DATABASE_CONNECTION_STRING || "mongodb+srv://kambaz:password1234@kambaz.lpiotlz.mongodb.net/?appName=Kambaz"
mongoose.connect(CONNECTION_STRING);

const app = express()

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL || "http://localhost:3000",
  })
);

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
};
if (process.env.SERVER_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.SERVER_URL,
  };
}
app.use(session(sessionOptions));
app.use(express.json());

CourseRoutes(app, db);
ModulesRoutes(app, db);
AssignmentsRoutes(app, db);
UserRoutes(app, db);
Lab5(app)
Hello(app)

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on port ${process.env.PORT || 4000}`)
})