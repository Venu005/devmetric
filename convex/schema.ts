import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    username: v.string(),
    first_name: v.optional(v.string()),
    last_name: v.optional(v.string()),
    email: v.string(),
    // password: v.optional(v.string()),
    clerkId: v.string(),
    profileImageUrl: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("byClerkId", ["clerkId"])
    .index("byEmail", ["email"]),
});
