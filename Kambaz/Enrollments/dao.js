import { v4 as uuidv4 } from "uuid";

export default function EnrollmentsDao(db) {
  function enrollUserInCourse(userId, courseId) {
    const { enrollments } = db;
    enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
  }
  
  function unenrollUserFromCourse(userId, courseId) {
    const { enrollments } = db;
    const index = enrollments.findIndex(
      (enrollment) => enrollment.user === userId && enrollment.course === courseId
    );
    if (index !== -1) {
      enrollments.splice(index, 1);
    }
  }
  
  return { enrollUserInCourse, unenrollUserFromCourse };
}

