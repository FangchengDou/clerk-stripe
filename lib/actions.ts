"use server";
import { clerkClient, currentUser } from "@clerk/nextjs/server";

export async function UpdateCredits(credits: number) {
  const user = await currentUser();

  if (!user) {
    return { success: false, error: "You need to sign in first." };
  }

  const response = await clerkClient.users.updateUserMetadata(user.id, {
    publicMetadata: {
      credits,
    },
  });

  return response;
}
