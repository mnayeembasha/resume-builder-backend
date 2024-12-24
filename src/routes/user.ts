import Router from "express";
const userRouter = Router();
import { Request, Response } from "express";
import {
  registerRequestBody,
  ResumeDetailsRequestBody,
  userRegistrationSchema,
  userResumeDetailsSchema,
} from "../validation/schema";
import { validateSchema } from "../validation/middleware";
import { userModel } from "../db/models/user";
import { userResumeDetailsModel } from "../db/models/userResumeDetails";

userRouter.post(
  "/register",
  validateSchema(userRegistrationSchema),
  async (req: Request<{}, {}, registerRequestBody>, res: Response) => {
    const {
      firstName,
      lastName,
      collegeName,
      specialization,
      course,
      branch,
      passOutYear,
      cgpaOrPercentage,
      gender,
      githubProfile,
      linkedInProfile,
      jobPreferredCountries,
      jobPreferredStates,
      jobPreferredCities,
      dateOfBirth,
    } = req.body;

    try {
      const user = await userModel.create({
        firstName,
        lastName,
        collegeName,
        specialization,
        course,
        branch,
        passOutYear,
        cgpaOrPercentage,
        gender,
        githubProfile,
        linkedInProfile,
        jobPreferredCountries,
        jobPreferredStates,
        jobPreferredCities,
        dateOfBirth,
      });
      res.status(200).json({ message: "Registration successfull" });
    } catch (error) {
      res.status(500).json({ message: "Some Error Occoured" });
    }
  }
);

userRouter.post(
  "/resume-details",
  validateSchema(userResumeDetailsSchema), // Middleware for schema validation
  async (req: Request<{},{},ResumeDetailsRequestBody>, res: Response) => {
    const {
      personalInformation,
      basicInformation,
      summary,
      certifications,
      internships,
      projects,
      skills,
      domainKnowledge,
      achievements,
    } = req.body;

    try {
      const user = await userResumeDetailsModel.create({
        personalInformation,
        basicInformation,
        summary,
        certifications,
        internships,
        projects,
        skills,
        domainKnowledge,
        achievements,
      });

      res.status(201).json({ message: "User resume details added successfully", user });
    } catch (error) {
      console.error("Error adding user:", error);
      res.status(500).json({ message: "An error occurred while adding the user resume details." });
    }
  }
);

export default userRouter;
