import { query, mutation } from "./_generated/server";
import { v, GenericId } from "convex/values";

/**
 * Live Query: Fetches the 3-5 highlighted recommendations
 * Automatically parses Convex storage IDs into readable web layout URLs
 */
export const getRecentReviews = query({
  handler: async (ctx) => {
    const allRecords = await ctx.db.query("reviews").order("desc").collect();

    const highlightedRecords = allRecords.filter(
      (rec) => rec.status === "approved" && rec.highlight === true
    ).slice(0, 5);

    return Promise.all(
      highlightedRecords.map(async (rec) => {
        let avatarUrl = "/images/reviewer/default-placeholder.png";

        if (rec.avatarStorageId) {
          const url = await ctx.storage.getUrl(rec.avatarStorageId);
          if (url) avatarUrl = url;
        } else {
          const nameParts = rec.name.trim().split(" ");
          const lastName = nameParts[nameParts.length - 1];
          avatarUrl = `/images/reviewer/${lastName}.png`;
        }

        return {
          id: rec._id,
          name: rec.name,
          title: rec.title,
          content: rec.content,
          avatar: avatarUrl,
        };
      })
    );
  },
});

/**
 * Live Query: Checks if a review exists by email.
 * Can be called by the frontend on input blur/change to check history.
 */
export const checkExistingReview = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const cleanEmail = args.email.trim().toLowerCase();
    if (!cleanEmail) return null;

    const existing = await ctx.db
      .query("reviews")
      .filter((q) => q.eq(q.field("email"), cleanEmail))
      .first();

    if (!existing) return null;

    // Return specific meta flags so the frontend can warn the user cleanly
    return {
      id: existing._id,
      name: existing.name,
      title: existing.title,
      status: existing.status,
      highlight: existing.highlight,
    };
  },
});

/**
 * Mutation: Generates a secure, single-use client upload bucket destination
 */
export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

/**
 * Mutation: Inserts a new recommendation or overrides an existing one by email context match
 */
export const submitReview = mutation({
  args: {
    name: v.string(),
    title: v.string(),
    email: v.string(),
    content: v.string(),
    avatarStorageId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const cleanEmail = args.email.trim().toLowerCase();
    
    // REUSED LOGIC: Look up the profile using our internal database check parameters
    const existingReview = await ctx.db
      .query("reviews")
      .filter((q) => q.eq(q.field("email"), cleanEmail))
      .first();

    const newAvatarStorageId = args.avatarStorageId
      ? (args.avatarStorageId as GenericId<"_storage">)
      : undefined;

    if (existingReview) {
      // Clear out the old avatar asset from file storage if it exists
      if (existingReview.avatarStorageId) {
        try {
          await ctx.storage.delete(existingReview.avatarStorageId);
        } catch (err) {
          console.error("Failed to delete orphaned avatar storage asset:", err);
        }
      }

      // Modify and reset the existing record parameters completely
      await ctx.db.patch(existingReview._id, {
        name: args.name,
        title: args.title,
        content: args.content,
        avatarStorageId: newAvatarStorageId, 
        status: "pending",                  
        highlight: false,                   
        createdAt: Date.now(),              
      });
    } else {
      // No match found: Safely insert a brand new entry document
      await ctx.db.insert("reviews", {
        name: args.name,
        title: args.title,
        email: cleanEmail,
        content: args.content,
        avatarStorageId: newAvatarStorageId,
        createdAt: Date.now(),
        status: "pending",
        highlight: false,
      });
    }
  },
});