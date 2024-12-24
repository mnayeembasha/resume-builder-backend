/* USER SCHEMA */
import mongoose, { Schema, Document } from "mongoose";
import coursesAndBranchesData from "../../data/courseToBranches.json";

interface IUser extends Document {
  firstName: string;
  lastName: string;
  collegeName: string;
  specialization: "Undergraduate" | "Postgraduate";
  course: string;
  branch: string;
  passOutYear: number;
  cgpaOrPercentage: number;
  gender: "Male" | "Female" | "Other";
  githubProfile: string;
  linkedInProfile: string;
  jobPreferredCountries: string[];
  jobPreferredStates: string[];
  jobPreferredCities: string[];
  dateOfBirth: Date;
}

// Define the mapping of courses to their branches
const courseToBranches: Record<string, string[]> = coursesAndBranchesData;

// Define the schema
const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  collegeName: { type: String, required: true },
  specialization: {
    type: String,
    enum: ["undergraduate", "postgraduate"],
    required: true,
  },
  course: {
    type: String,
    required: true,
    enum: Object.keys(courseToBranches),
  },
  branch: {
    type: String,
    required: true,
    validate: {
      validator: function (this: IUser, branch: string) {
        return courseToBranches[this.course]?.includes(branch);
      },
      message: (props) =>
        `${props.value} is not a valid branch for the selected course.`,
    },
  },
  passOutYear: {
    type: Number,
    required: true,
    min: 1990,
    max: new Date().getFullYear() + 5,
  },
  cgpaOrPercentage: { type: Number, required: true },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
  githubProfile: { type: String, required: true },
  linkedInProfile: { type: String, required: true },
  jobPreferredCountries: {
    type: [String],
    // required: true,
    validate: {
      validator: (arr: string[]) => arr.length <= 3,
      message: "You can select up to 3 preferred countries.",
    },
  },
  jobPreferredStates: {
    type: [String],
    // required: true,
    validate: {
      validator: (arr: string[]) => arr.length <= 3,
      message: "You can select up to 3 preferred states.",
    },
  },
  jobPreferredCities: {
    type: [String],
    // required: true,
    validate: {
      validator: (arr: string[]) => arr.length <= 6,
      message: "You can select up to 6 preferred cities.",
    },
  },
  dateOfBirth: { type: Date,
    //  required: true
  },
});

export const userModel = mongoose.model<IUser>("User", userSchema);
