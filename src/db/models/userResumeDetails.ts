import mongoose, { Schema, Document, trusted } from "mongoose";

interface ResumeDetails extends Document {
  personalInformation: {
    photo?: string;
  };
  basicInformation: {
    firstName: string;
    middleName?: string;
    lastName: string;
    currentDesignation: string;
    address: {
      addressLine?: string;
      country: string;
      state: string;
      city: string;
      pincode?: string;
    };
    email: string;
    mobile: string;
    linkedIn?: string;
    github?: string;
  };
  summary: {
    summary: string;
  };
  education: {
    ssc: {
      institutionName: string;
      boardName: string;
      specialization?: string;
      state: string;
      city: string;
      mathScore?: number;
      physicsScore?: number;
      chemistryScore?: number;
    };
    grades11And12: {
      stream: "MPC";
      institutionName: string;
      boardName: string;
      state: string;
      city: string;
      mathScore?: number;
      physicsScore?: number;
      chemistryScore?: number;
    };
    undergraduation?: {
      institutionName?: string;
      university?: string;
      specialization?: string;
      state?: string;
      city?: string;
      cgpa?: number;
    };
    graduation?: {
      institutionName?: string;
      university?: string;
      specialization?: string;
      state?: string;
      city?: string;
      cgpa?: number;
      ongoing?: boolean;
    };
  };
  certifications?: {
    certificationName: string;
    certificationId?: string;
    institute?: string;
    year?: string;
  }[];
  internships?: {
    title: string;
    organization?: string;
    location?: string;
    startDate?: Date;
    endDate?: Date;
    paid?: "paid" | "unpaid";
    ongoing?: boolean;
    description?: string;
  }[];
  projects?: {
    name: string;
    client?: string;
    startDate?: Date;
    endDate?: Date;
    link?: string;
    attachments?: string;
  }[];
  skills?: string[];
  domainKnowledge?: string[];
  achievements?: string[];
}

const resumeDetailsSchema = new Schema<ResumeDetails>({
  personalInformation: {
    photo: { type: String, match: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))?$/, default: null },
  },
  basicInformation: {
    firstName: { type: String, required: true },
    middleName: { type: String, default: null },
    lastName: { type: String, required: true },
    currentDesignation: { type: String, required: true },
    address: {
      addressLine: { type: String, default: null },
      country: { type: String, required: true },
      state: { type: String, required: true },
      city: { type: String, required: true },
      pincode: {
        type: String,
        match: /^\d{4,6}$/,
        default: null,
      },
    },
    email: { type: String, required: true, match: /\S+@\S+\.\S+/,unique:true },
    mobile: { type: String, required: true, match: /^\d{10}$/ },
    linkedIn: { type: String, match: /^(https?:\/\/.*linkedin\.com\/.*)?$/, default: null },
    github: { type: String, match: /^(https?:\/\/.*github\.com\/.*)?$/, default: null },
  },
  summary: {
    summary: { type: String, required: true },
  },
  education: {
    ssc: {
      institutionName: { type: String, required: true },
      boardName: { type: String, required: true },
      specialization: { type: String, default: null },
      state: { type: String, required: true },
      city: { type: String, required: true },
      startDate: { type: Date, default: null,required:true },
      endDate: { type: Date, default: null,required:true },
      mathScore: { type: Number, default: null },
      physicsScore: { type: Number, default: null },
      chemistryScore: { type: Number, default: null },
    },
    grades11And12: {
      stream: { type: String, enum: ["MPC"], required: true },
      institutionName: { type: String, required: true },
      boardName: { type: String, required: true },
      state: { type: String, required: true },
      city: { type: String, required: true },
      startDate: { type: Date, default: null,required:true },
      endDate: { type: Date, default: null,required:true },
      mathScore: { type: Number, default: null },
      physicsScore: { type: Number, default: null },
      chemistryScore: { type: Number, default: null },
    },
    underGraduation: {
      institutionName: { type: String, default: null },
      university: { type: String, default: null },
      specialization: { type: String, default: null },
      startDate: { type: Date, default: null },
      endDate: { type: Date, default: null },
      state: { type: String, default: null },
      city: { type: String, default: null },
      cgpa: { type: Number, default: null },
    },
    graduation: {
      institutionName: { type: String, default: null },
      university: { type: String, default: null },
      specialization: { type: String, default: null },
      startDate: { type: Date, default: null },
      endDate: { type: Date, default: null },
      state: { type: String, default: null },
      city: { type: String, default: null },
      cgpa: { type: Number, default: null },
      ongoing: { type: Boolean, default: false },
    },
  },
  certifications: [
    {
      certificationName: { type: String, required: true },
      certificationId: { type: String, default: null },
      institute: { type: String, default: null },
      year: { type: String, match: /^\d{4}$/, default: null },
    },
  ],
  internships: [
    {
      title: { type: String, required: true },
      organization: { type: String, default: null },
      location: { type: String, default: null },
      startDate: { type: Date, default: null },
      endDate: { type: Date, default: null },
      paid: { type: String, enum: ["paid", "unpaid"], default: null },
      ongoing: { type: Boolean, default: null },
      description: { type: String, default: null },
    },
  ],
  projects: [
    {
      name: { type: String, required: true },
      client: { type: String, default: null },
      startDate: { type: Date, default: null },
      endDate: { type: Date, default: null },
      link: {
        type: String,
        match: /^(https?:\/\/.*)?$/,
        default: null,
      },
      attachments: { type: String, default: null },
    },
  ],
  skills: {
    type: [String],
    validate: {
      validator: (arr: string[]) => arr.length <= 6,
      message: "You can add a maximum of 6 skills.",
    },
  },
  domainKnowledge: {
    type: [String],
    validate: {
      validator: (arr: string[]) => arr.length <= 6,
      message: "You can add a maximum of 6 domain knowledge items.",
    },
  },
  achievements: {
    type: [String],
    validate: {
      validator: (arr: string[]) => arr.length <= 6,
      message: "You can add a maximum of 6 achievements.",
    },
  },
});

export const userResumeDetailsModel = mongoose.model<ResumeDetails>("UserResumeDetails", resumeDetailsSchema);
