const mongoose = require("mongoose");
mongoose
	.connect("mongodb://127.0.0.1/playground")
	.then(() => console.log("Connected to MongoDB..."))
	.catch((err) => console.log("Could not connect to MongoDB...", err));

// Schema
const courseSchema = new mongoose.Schema({
	// name: String,
	name: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 255,
		// match: /pattern/
	},
	category: {
		type: String,
		required: true,
		enum: ["web", "mobile", "network"],
		lowercase: true,
		// uppercase: true,
		trim: true,
	},
	author: String,
	// tags: [String],
	tags: {
		type: Array,
		validate: {
			// isAsync: true,
			validator: function (v) {
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						// Do some async work
						const result = v && v.length > 0;
						resolve(result);
					}, 4000);
				});
			},
			message: "A course should have at least one tag.",
		},
	},
	date: {
		type: Date,
		default: Date.now,
	},
	isPublished: Boolean,
	price: {
		type: Number,
		required: function () {
			return this.isPublished;
		},
		min: 10,
		max: 200,
	},
});
// Models
const Course = mongoose.model("Course", courseSchema);
const createCourse = async () => {
	const course = new Course({
		name: "Express Course",
		// category: "network",
		category: " WEB    ",
		author: "Maxi",
		// tags: null,
		tags: ["frontend"],
		isPublished: true,
		price: 15,
	});
	try {
		const result = await course.save();
		console.log(result);
	} catch (ex) {
		// console.log(ex.message);
		// ex.errors;
		for (const field in ex.errors) {
			console.log(ex.errors[field].message);
		}
	}
};
// createCourse();
const getCourses = async () => {
	/////////////////////////////////////////////////Pagination
	const pageNumber = 2;
	const pageSize = 10;
	//  /api/courses?pageNumber=2&pageSize=10
	/////////////////////////////////////////////////
	const courses = await Course.find({ author: "Mosh", isPublished: true })
		.limit(10)
		// .limit(pageSize)
		.sort({ name: -1 }) // 1: Ascending -1: Descending
		.select({ name: 1, tags: 1, author: 1 });
	console.log(courses);
};
const updateCourse = async (id) => {
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
	console.log(course);
};
const removeCourse = async (id) => {
	const course = await Course.findByIdAndRemove(id);

	console.log(course);
};
// removeCourse("64ff7c170244847a408a7093");
createCourse();
