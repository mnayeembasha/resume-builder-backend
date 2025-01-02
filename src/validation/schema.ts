import {z} from "zod";
// import coursesData from "../data/courseToBranches.json";
// const courseKeys: (keyof typeof coursesData)[] = Object.keys(coursesData) as (keyof typeof coursesData)[];
// console.log(courseKeys);

export const userRegistrationSchema = z.object({
  firstName: z.string()
    .min(3, { message: "First name must be at least 3 characters long" })
    .max(20, { message: "First name must not exceed 20 characters" }),
  lastName: z.string()
    .min(3, { message: "Last name must be at least 3 characters long" })
    .max(20, { message: "Last name must not exceed 20 characters" }),
  collegeName: z.string()
    .min(5, { message: "College name must be at least 5 characters long" })
    .max(50, { message: "College name must not exceed 50 characters" }),
  specialization: z.enum(["undergraduate", "postgraduate"], {
    errorMap: () => ({ message: "Specialization must be either 'undergraduate' or 'postgraduate'" }),
  }),
  course: z.string({
    message: "Invalid course",
  }),
  branch: z.string({
    message: "Branch not valid for the selected course",
  }),


  passOutYear: z.number()
    .int({ message: "Pass out year must be a whole number" })
    .gte(1900, { message: "Pass out year must be after 1900" })
    .lte(new Date().getFullYear() + 10, { message: "Pass out year must be within a reasonable range" }),
  cgpaOrPercentage: z.number()
    .min(0, { message: "CGPA or percentage cannot be less than 0" })
    .max(100, { message: "CGPA or percentage cannot exceed 100" }),
  gender: z.enum(["male", "female", "other"], {
    errorMap: () => ({ message: "Gender must be one of 'male', 'female', or 'other'" }),
  }),
  githubProfile: z.string()
    .url({ message: "GitHub profile must be a valid URL" }),
  linkedInProfile: z.string()
    .url({ message: "LinkedIn profile must be a valid URL" }),
    jobPreferredCountries: z
    .array(z.string())
    .length(3, { message: "Must select exactly 3 countries" }).optional(),
  jobPreferredStates: z
    .array(z.string())
    .length(3, { message: "Must select exactly 3 states" }).optional(),
  jobPreferredCities: z
    .array(z.string())
    .length(3, { message: "Must select exactly 3 cities" }).optional(),
  dateOfBirth: z.string().optional()
    .refine(
      (dob) => !dob || /^\d{4}-\d{2}-\d{2}$/.test(dob), // Ensure valid date format (YYYY-MM-DD)
      { message: "Date of birth must be in the format YYYY-MM-DD" }
    ),
});

  export type registerRequestBody = z.infer<typeof userRegistrationSchema>;

  export const userResumeDetailsSchema = z.object({
    personalInformation: z.object({
      photo: z.string().url().optional(),
    }),
    basicInformation: z.object({
      firstName: z.string().min(1, "First name is required."),
      middleName: z.string().optional(),
      lastName: z.string().min(1, "Last name is required."),
      currentDesignation: z.string().min(1, "Designation is required.").optional(),
      address: z.object({
        addressLine: z.string().optional(),
        country: z.string().min(1, "Country is required."),
        state: z.string().min(1, "State is required."),
        city: z.string().min(1, "City is required."),
        pincode: z
          .string()
          .regex(/^\d{4,6}$/, "Pincode must be 4 to 6 digits.")
          .optional(),
      }),
      email: z.string().email("Please enter a valid email address."),
      mobile: z
        .string()
        .regex(/^\d{10}$/, "Mobile number must be exactly 10 digits."),
      linkedIn: z.string().url("Please enter a valid LinkedIn URL").optional(),
      github: z.string().url("Please enter a valid GitHub URL").optional(),
    }),
    summary: z.object({
      summary: z.string().min(1, "Summary is required."),
    }),
    education: z.object({
      ssc: z.object({
        institutionName: z.string().min(1, "Institution name is required."),
        boardName: z.string().min(1, "Board name is required."),
        specialization: z.string().optional(),
        state: z.string().min(1, "State is required."),
        city: z.string().min(1, "City is required."),
        startDate: z.string(),
        endDate: z.string(),
        mathScore: z.string().optional(),
        physicsScore: z.string().optional(),
        chemistryScore: z.string().optional(),
      }),
      grades11And12: z.object({
        stream: z.literal("MPC"), // Strict validation for "MPC"
        institutionName: z.string().min(1, "Institution name is required."),
        boardName: z.string().min(1, "Board name is required."),
        state: z.string().min(1, "State is required."),
        city: z.string().min(1, "City is required."),
        startDate: z.string(),
        endDate: z.string(),
        mathScore: z.string().optional(),
        physicsScore: z.string().optional(),
        chemistryScore: z.string().optional(),
      }),
      underGraduation: z
        .object({
          institutionName: z.string().optional(),
          university: z.string().optional(),
          specialization: z.string().optional(),
          startDate: z.string().optional(),
          endDate: z.string().optional(),
          state: z.string().optional(),
          city: z.string().optional(),
          cgpa: z.string().optional(),
        })
        .optional(),
      graduation: z
        .object({
          institutionName: z.string().optional(),
          university: z.string().optional(),
          specialization: z.string().optional(),
          state: z.string().optional(),
          startDate: z.string().optional(),
        endDate: z.string().optional(),
          city: z.string().optional(),
          cgpa: z.string().optional(),
          ongoing: z.boolean().optional(),
        })
        .optional(),
    }),
    certifications: z
      .array(
        z.object({
          certificationName: z.string().min(1, "Certification name is required."),
          certificationId: z.string().optional(),
          institute: z.string().optional(),
          year: z
            .string()
            .regex(/^\d{4}$/, "Year must be a valid 4-digit year.")
            .optional(),
        })
      )
      .optional(),
    internships: z
      .array(
        z.object({
          title: z.string().min(1, "Internship title is required."),
          organization: z.string().optional(),
          location: z.string().optional(),
          startDate: z.string().optional(),
          endDate: z.string().optional(),
          paid: z.enum(["paid", "unpaid"]).optional(),
          ongoing: z.boolean().optional(),
          description: z.string().optional(),
        })
      )
      .optional(),
      projects: z
      .array(
        z.object({
          name: z.string().min(1, "Project name is required."),
          client: z.string().optional(),
          startDate: z.string().optional(),
          endDate: z.string().optional(),
          link: z.string().url("Please enter a valid project link").optional(),
          attachments: z.string().optional(),
        })
      )
      .optional(),
      skills: z
      .array(z.string().min(1, "Skill is required."))
      .max(6, "You can add a maximum of 6 skills.")
      .optional(),
    domainKnowledge: z
      .array(z.string().min(1, "Domain knowledge is required."))
      .max(6, "You can add a maximum of 6 domain knowledge items.")
      .optional(),
    achievements: z
      .array(z.string().min(1, "Achievement is required."))
      .max(6, "You can add a maximum of 6 achievements.")
      .optional(),
  });

  export type ResumeDetailsRequestBody = z.infer<typeof userResumeDetailsSchema>;