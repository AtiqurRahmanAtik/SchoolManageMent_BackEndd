import { Router } from "express";

// Used Route Imports
import userRoutes from "../app/modules/User/Users.routes.js";
import ClassRoutes from "../app/modules/Class/Classes.routes.js";
import TeacherRoutes from "../app/modules/Teacher/Teachers.routes.js";
import SectionRoutes from "../app/modules/Section/Sections.routes.js";
import StudentRoutes from "../app/modules/Student/Students.routes.js";
import EmployeeRoleRoutes from "../app/modules/EmployeeRole/EmployeeRoles.routes.js";
import EmployeeRoutes from "../app/modules/Employee/Employees.routes.js";
import StudentAttendanceRoutes from "../app/modules/StudentAttendance/StudentAttendances.routes.js";
import EmployeeAttendanceRoutes from "../app/modules/EmployeeAttendance/EmployeeAttendance.routes.js";
import SubjectRoutes from "../app/modules/Subject/Subjects.routes.js";
import ClassRoutineRoutes from "../app/modules/ClassRoutine/ClassRoutine.routes.js";
import ClassTimeRoutes from "../app/modules/ClassTime/ClassTime.routes.js";
import DayRoutes from "../app/modules/Day/Day.routes.js";
import ExaminationRoutes from "../app/modules/Examination/Examination.routes.js";
import StudentMarkRoutes from "../app/modules/StudentMark/StudentMark.routes.js";

// Added Grade Routes Import
import GradeRoutes from "../app/modules/Grade/Grade.routes.js"; 

// Used Controllers / Middleware
import transactionLogger from "../middleware/transactionLogger.js";
import SalaryRoutes from "../app/modules/Salary/Salary.routes.js";
import NoticeRoutes from "../app/modules/Notice/Notice.routes.js";
import InstituteProfileRoutes from "../app/modules/InstituteProfile/InstituteProfile.routes.js";
import BannerRoutes from "../app/modules/Banner/Banners.routes.js";
import OurActivitiesRoutes from "../app/modules/OurActivities/OurActivities.routes.js";
import ParentsReviewRoutes from "../app/modules/ParentsReview/ParentsReviews.routes.js";
import EventRoutes from "../app/modules/Event/Events.routes.js";
import RecentNoticeRoutes from "../app/modules/RecentNotice/RecentNotices.routes.js";
import BlogRoutes from "../app/modules/Blog/Blogs.routes.js";
import ContactUsRoutes from "../app/modules/ContactUs/ContactUs.routes.js";
import AboutUsRoutes from "../app/modules/AboutUs/AboutUs.routes.js";

const routes = Router();

// Middleware
routes.use(transactionLogger);

// Active Routes
routes.use("/user", userRoutes);



// Main School Website FrontEnd
routes.use("/banners", BannerRoutes);
routes.use("/aboutus", AboutUsRoutes);
routes.use("/our-activities", OurActivitiesRoutes);
routes.use("/parents-reviews", ParentsReviewRoutes);
routes.use("/events", EventRoutes);
routes.use("/recent-notices", RecentNoticeRoutes);
routes.use("/blogs", BlogRoutes);
routes.use("/contact-us", ContactUsRoutes);


// DashBoard 
// Inside routes.use(...) section:
routes.use("/institute-profile", InstituteProfileRoutes);
routes.use("/class", ClassRoutes);
routes.use("/students", StudentRoutes); 
routes.use("/teachers", TeacherRoutes);
routes.use("/sections", SectionRoutes);
routes.use("/subjects", SubjectRoutes);
routes.use("/employee-roles", EmployeeRoleRoutes);
routes.use("/employee", EmployeeRoutes);
routes.use("/student-attendance", StudentAttendanceRoutes);
routes.use("/employee-attendance", EmployeeAttendanceRoutes);
routes.use("/class-routine", ClassRoutineRoutes);
routes.use("/class-time", ClassTimeRoutes);
routes.use("/day", DayRoutes);
routes.use("/examination", ExaminationRoutes);
routes.use("/student-marks", StudentMarkRoutes);

// Added Grade Route registration
routes.use("/grades", GradeRoutes);
routes.use("/salary", SalaryRoutes);
routes.use("/notice", NoticeRoutes);


export default routes;