import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  reviews: defineTable({
    name: v.string(),
    title: v.string(),
    email: v.optional(v.string()),
    content: v.string(),
    avatarStorageId: v.optional(v.id("_storage")),
    createdAt: v.number(),
    status: v.string(),
    highlight: v.boolean(),
  }),
});
