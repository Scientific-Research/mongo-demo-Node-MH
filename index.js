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

const updateCourse = async (id) => {
  //Approch: Query first
  // findById()
  // Modify its properties
  // Save()
  ///////////////////////////////////////
  // Approch: Update first
  // Update directly
  // Optionally: get the updated document

  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        isPublished: false,
        author: "Nikola Tesla",
      },
    },
    { new: true }
  );
  // if (!course) return;

  // course.isPublished = true;
  // course.author = "Maximilian ";

  // the two methods are identical
  // course.set({
  //   isPublished: true,
  //   author: "Another Author",
  // });

  // const result = await course.save();
  console.log(course);
};

const removeCourse = async (id) => {
  //Approch: Query first
  // findById()
  // Modify its properties
  // Save()
  ///////////////////////////////////////
  // Approch: Update first
  // Update directly
  // Optionally: get the updated document

  // const result = await Course.deleteOne({ _id: id });
  // const result = await Course.deleteMany({ _id: id }); // resturns the number of documents
  const course = await Course.findByIdAndRemove(id);
  // which were deleted.

  // if (!course) return;

  // course.isPublished = true;
  // course.author = "Maximilian ";

  // the two methods are identical
  // course.set({
  //   isPublished: true,
  //   author: "Another Author",
  // });

  // const result = await course.save();
  console.log(course);
};

// getCourses();
removeCourse("64ff326a0244847a408a7091");
// updateCourse();
