import CoursesDao from "./dao.js";
import EnrollmentsDao from "../Enrollments/dao.js";
export default function CourseRoutes(app, db) {
  const dao = CoursesDao(db);
  const enrollmentsDao = EnrollmentsDao(db);
  const findAllCourses = (req, res) => {
    const courses = dao.findAllCourses();
    res.send(courses);
  };
  const findCoursesForEnrolledUser = (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const courses = dao.findCoursesForEnrolledUser(userId);
    res.json(courses);
  };
  const createCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    const newCourse = dao.createCourse(req.body);
    enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };
  const deleteCourse = (req, res) => {
    const { courseId } = req.params;
    const status = dao.deleteCourse(courseId);
    res.send(status);
  };
  const updateCourse = (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    const status = dao.updateCourse(courseId, courseUpdates);
    res.send(status);
  };
  
  const enrollInCourse = (req, res) => {
    let { userId, courseId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    enrollmentsDao.enrollUserInCourse(userId, courseId);
    res.sendStatus(204);
  };
  
  const unenrollFromCourse = (req, res) => {
    let { userId, courseId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    enrollmentsDao.unenrollUserFromCourse(userId, courseId);
    res.sendStatus(204);
  };
  
  app.post("/api/users/current/courses", createCourse);
  app.delete("/api/courses/:courseId", deleteCourse);
  app.put("/api/courses/:courseId", updateCourse);
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  app.get("/api/courses", findAllCourses);
  app.post("/api/users/:userId/courses/:courseId/enroll", enrollInCourse);
  app.delete("/api/users/:userId/courses/:courseId/enroll", unenrollFromCourse);
}
