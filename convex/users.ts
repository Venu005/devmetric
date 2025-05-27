import { internalMutation, query, QueryCtx } from "./_generated/server";
import { UserJSON } from "@clerk/backend";
import { v, Validator } from "convex/values";

export const current = query({
  args: {},
  handler: async (ctx) => {
    return await getCurrentUser(ctx);
  },
});

export const upsertFromClerk = internalMutation({
  args: { data: v.any() as Validator<UserJSON> },
  async handler(ctx, { data }) {
    try {
      // Safely extract user attributes with null checks
      const userAttributes = {
        username: data.username as string,
        first_name: data.first_name || undefined,
        last_name: data.last_name || undefined,
        email: data.email_addresses?.[0]?.email_address || "",
        //password: data.password_enabled ? undefined : undefined, // Clerk handles passwords
        clerkId: data.id,
        profileImageUrl: data.image_url || undefined,
        updatedAt: Date.now(),
      };

      const existingUser = await userByExternalId(ctx, data.id);

      if (existingUser === null) {
        // Create new user
        await ctx.db.insert("users", {
          ...userAttributes,
          createdAt: Date.now(),
        });
        console.log(`Created new user with Clerk ID: ${data.id}`);
      } else {
        // Update existing user
        await ctx.db.patch(existingUser._id, userAttributes);
        console.log(`Updated user with Clerk ID: ${data.id}`);
      }
    } catch (error) {
      console.error("Error in upsertFromClerk:", error);
      throw new Error(`Failed to upsert user`);
    }
  },
});

export const deleteFromClerk = internalMutation({
  args: { clerkUserId: v.string() },
  async handler(ctx, { clerkUserId }) {
    try {
      const user = await userByExternalId(ctx, clerkUserId);

      if (user !== null) {
        await ctx.db.delete(user._id);
        console.log(`Deleted user with Clerk ID: ${clerkUserId}`);
      } else {
        console.warn(
          `Cannot delete user - no user found for Clerk ID: ${clerkUserId}`
        );
      }
    } catch (error) {
      console.error("Error in deleteFromClerk:", error);
      throw new Error(`Failed to delete user`);
    }
  },
});

export async function getCurrentUserOrThrow(ctx: QueryCtx) {
  const userRecord = await getCurrentUser(ctx);
  if (!userRecord) throw new Error("Can't get current user");
  return userRecord;
}

export async function getCurrentUser(ctx: QueryCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (identity === null) {
    return null;
  }
  return await userByExternalId(ctx, identity.subject);
}

async function userByExternalId(ctx: QueryCtx, externalId: string) {
  return await ctx.db
    .query("users")
    .withIndex("byClerkId", (q) => q.eq("clerkId", externalId))
    .unique();
}
