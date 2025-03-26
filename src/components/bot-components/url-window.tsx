import { UrlWindowStateATOM } from "@/lib/atoms";
import { useAtomValue } from "jotai";
import { useEffect, useRef } from "react";

interface UrlWindowProps {
  onClose: (state: boolean) => void;
  onSendIntent?: (intent: string) => void;
}

export default function UrlWindow({ onClose }: UrlWindowProps) {
  const isUrlOpen = useAtomValue(UrlWindowStateATOM);
  // const isUrlOpen = {url: "http://localhost:5173/test.html"};
  const mounted = useRef(false);
  const windowInstance = useRef<Window | null>(null);

  useEffect(() => {
    if (!isUrlOpen?.url || windowInstance.current || mounted.current) {
      console.log("No Url found or the  instance is already open");
      return;
    }
    mounted.current = true;
    const newWindow = window.open(
      isUrlOpen.url,
      "_blank",
      "width=800,height=600"
    );
    windowInstance.current = newWindow;

    const handleMessage = (event: MessageEvent) => {
      console.log("Received message from popup:", event.data);
      //catch a particular field and close the window automatically
      if (event.data === "fail") {
        windowInstance.current?.close();
      }
    };

    window.addEventListener("message", handleMessage);

    const timeinterval = setInterval(() => {
      if (windowInstance.current?.closed) {
        console.log("Child window closed");
        clearInterval(timeinterval);
        onClose(false);
        windowInstance.current = null;
      }
    }, 500);

    return () => {
      if (!mounted.current && windowInstance.current) {
        console.log("cleaning up...");
        clearInterval(timeinterval);
        window.removeEventListener("message", handleMessage);
      }
    };
  }, [isUrlOpen?.url, onClose]);

  return (
    <div className="ptn-h-full ptn-w-full ptn-flex ptn-justify-center ptn-items-center">
      {/* <div className="ptn-flex ptn-justify-between ptn-items-center ptn-p-2">
        <p className="ptn-text-center ptn-text-sm ptn-text-ellipsis ptn-overflow-hidden ptn-w-[200px] ptn-whitespace-nowrap ptn-text-muted 3xl:ptn-text-xl">
          {isUrlOpen?.url}
        </p>
        <X
          className="ptn-h-4 ptn-w-4 ptn-cursor-pointer"
          onClick={() => onClose(false)}
        />
      </div> */}
      <p className="ptn-font-light ptn-italic">
        Payment is in process, please don't refresh or close the window
      </p>
    </div>
  );
}
