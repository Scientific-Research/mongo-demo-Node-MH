const mongoose = require("mongoose");

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
  /////////////////////////////////////////////////Pagination
  const pageNumber = 2;
  const pageSize = 10;
  //  /api/courses?pageNumber=2&pageSize=10
  /////////////////////////////////////////////////
  const courses = await Course.find({ author: "Mosh", isPublished: true })
    // .skip((pageNumber - 1) * pageSize)
    // Moshfegh
    // Mosh Hamedani
    /////////////////////////////////////////////////
    // // Starts with Mosh:
    // .find({ author: /^Mosh/ })
    // // Ends with Hamedani
    // .find({ author: /Hamedani$/i })
    // // Contains Mosh
    // .find({ author: /.*Mosh.*/i })
    /////////////////////////////////////////////////
    //.find()
    //     .or([{ author: "Mosh" }, { isPublished: true }])
    //     .and([])
    // .find({ price: { $gte: 10, lte: 20 } })
    // .find({ price: { $in: [10, 15, 20] } })
    /////////////////////////////////////////////////
    .limit(10)
    // .limit(pageSize)
    .sort({ name: -1 }) // 1: Ascending -1: Descending
    .select({ name: 1, tags: 1, author: 1 });

  /////////////////////////////////////////////////
  // Counting the items:
  // .count();
  /////////////////////////////////////////////////

  console.log(courses);
};

getCourses();
