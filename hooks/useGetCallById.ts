import { useEffect, useState } from "react";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";

const useGetCallById = (id: string | string[] | undefined) => {
  const [call, setCall] = useState<Call>();
  const [isCallLoading, setIsCallLoading] = useState(true);

  const client = useStreamVideoClient();

  useEffect(() => {
    // 🛑 GUARD: If we don't have a client or an ID, we are still "Loading"
    if (!client || !id) return;

    const getCall = async () => {
      try {
        // Query calls based on the ID provided in the URL
        const { calls } = await client.queryCalls({
          filter_conditions: { id },
        });

        if (calls.length > 0) {
          setCall(calls[0]);
        }
      } catch (error) {
        console.error("❌ Stream Query Error:", error);
        setCall(undefined);
      } finally {
        // Only stop loading once the network request is 100% done
        setIsCallLoading(false);
      }
    };

    getCall();
  }, [client, id]);

  return { call, isCallLoading };
};

export default useGetCallById;
