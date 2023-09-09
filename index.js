const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");

mongoose
  .connect("mongodb://127.0.0.1/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("Could not connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: {
    type: Date,
    default: Date.now,
  },
  isPublished: Boolean,
});

// Models
const Course = mongoose.model("Course", courseSchema);
const createCourse = async () => {
  const course = new Course({
    name: "Angular Course",
    author: "Mosh",
    tags: ["angular", "frontend"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
};

// createCourse();

const getCourses = async () => {
  const courses = await Course
    //   .find({ author: "Mosh", isPublished: true })
    // .find({ price: { $gte: 10, lte: 20 } })
    .find({ price: { $in: [10, 15, 20] } })
    .limit(10)
    .sort({ name: -1 }) // 1: Ascending -1: Descending
    .select({ name: 1, tags: 1, author: 1 });
  console.log(courses);
};

getCourses();
