import mongoose, { Schema } from "mongoose";
import { Subscription } from "../../../domain/entities/Subscription";

const subscriptionSchema = new Schema<Subscription>({
  decription: String,
  email: String,
  id: String,
  newsletterId: String,
  subscribedAt: Number,
  title: String,
  unsubscribedAt: Number,
});

export const SubscriptionModel = mongoose.model(
  "Subscription",
  subscriptionSchema
);
