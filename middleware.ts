import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // 🛡️ Only redirect if it's a "Page Navigation" (GET request)
  // This stops the CORS error for Server Actions (POST requests)
  if (!userId && !isPublicRoute(req)) {
    if (req.method === "GET") {
      return (await auth()).redirectToSignIn();
    }
    // If it's a data request (Server Action), just return an error instead of redirecting
    return new Response("Unauthorized", { status: 401 });
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
