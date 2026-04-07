"use client";

import LoaderUI from "@/components/LoaderUI";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import useGetCallById from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import {
  StreamCall,
  StreamTheme,
  useStreamVideoClient,
} from "@stream-io/video-react-sdk"; // Add useStreamVideoClient
import { useParams } from "next/navigation";
import { useState } from "react";

const MeetingPage = () => {
  const { id } = useParams();
  const { isLoaded, user } = useUser(); // Destructure 'user'
  const client = useStreamVideoClient(); // Initialize the client check

  // Ensure the ID is a string (Next.js 15 safety)
  const meetingId = Array.isArray(id) ? id[0] : id;
  const { call, isCallLoading } = useGetCallById(meetingId);

  const [isSetupComplete, setIsSetupComplete] = useState(false);

  // 🛡️ The "Triple Check" Guard:
  // Stay on Loader if: Clerk isn't ready, OR the call is still fetching, OR Stream Client isn't init yet, OR User is missing
  if (!isLoaded || isCallLoading || !client || !user) return <LoaderUI />;

  if (!call) {
    return (
      <div className="h-screen flex items-center justify-center bg-dark-1 text-white">
        <p className="text-2xl font-semibold">Meeting not found</p>
      </div>
    );
  }

  return (
    <StreamCall call={call}>
      <StreamTheme>
        {!isSetupComplete ? (
          <MeetingSetup onSetupComplete={() => setIsSetupComplete(true)} />
        ) : (
          <MeetingRoom />
        )}
      </StreamTheme>
    </StreamCall>
  );
};

export default MeetingPage;
