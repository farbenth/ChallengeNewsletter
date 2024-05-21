import mongoose, { Schema } from "mongoose";
import { Newsletter } from "../../../domain/entities/Newsletter";

const newsletterSchema = new Schema<Newsletter>({
  id: String,
  attachment: { type: String, required: false },
  content: String,
  createdAt: Number,
  description: String,
  name: String,
  scheduledFor: { type: Number, required: false },
});

export const NewsletterModel = mongoose.model("Newsletter", newsletterSchema);
