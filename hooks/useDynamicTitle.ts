import { useEffect, useRef } from "react";

const useDynamicTitle = (defaultTitle: string = "DEV_CORE | Design. Code. Deploy.") => {
  const originalTitle = useRef(defaultTitle);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const awayMessages = ["🔌 等待重连..."];
    let messageIndex = 0;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // User left the page
        intervalRef.current = setInterval(() => {
          document.title = awayMessages[messageIndex % awayMessages.length];
          messageIndex++;
        }, 2000);
        // Set first message immediately
        document.title = awayMessages[0];
        messageIndex = 1;
      } else {
        // User came back
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        document.title = originalTitle.current;
        messageIndex = 0;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return null;
};

export default useDynamicTitle;
