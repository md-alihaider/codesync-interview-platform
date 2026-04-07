"use client";

import { ReactNode, useEffect, useState } from "react";
import { StreamVideoClient, StreamVideo } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";
import LoaderUI from "../LoaderUI";
import { streamTokenProvider } from "@/action/stream.action";

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [streamVideoClient, setStreamVideoClient] =
    useState<StreamVideoClient>();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    // 🛡️ GUARD: Don't run if Clerk hasn't loaded or user is missing
    if (!isLoaded || !user) return;

    // 🕵️ Debug: Check if API key is missing
    const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
    if (!apiKey) throw new Error("Stream API key is missing");

    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: user.id,
        // Cleaner name logic
        name:
          `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || user.id,
        image: user.imageUrl,
      },
      // Call your server action
      tokenProvider: streamTokenProvider,
    });

    setStreamVideoClient(client);

    // 🧹 CLEANUP: This is crucial to prevent "Ghost Connections"
    return () => {
      client.disconnectUser();
      setStreamVideoClient(undefined);
    };

    // 🚀 THE FIX: Only re-run if the User ID or Load state changes.
    // Don't use the whole 'user' object here.
  }, [user?.id, isLoaded]);

  if (!streamVideoClient) return <LoaderUI />;

  return <StreamVideo client={streamVideoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
