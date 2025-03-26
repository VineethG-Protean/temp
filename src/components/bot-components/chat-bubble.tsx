import { X } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";

interface ChatBubbleProps {
  isOpen: boolean;
  onClick: () => void;
  children: ReactNode;
  showNotification?: boolean;
  text: string;
}

const ChatBubble = ({
  isOpen,
  onClick,
  children,
  text,
  showNotification = true,
}: ChatBubbleProps) => {
  const [xClose, setXClose] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setXClose(false);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  const handleXClose = () => {
    setXClose(true);
  };
  return (
    <>
      <div
        className={`bot-fonts ptn-border ptn-h-20 ptn-w-60 md:ptn-h-24 md:ptn-w-80 3xl:ptn-w-96 3xl:ptn-h-32 ptn-bg-white ptn-cursor-pointer ptn-fixed ptn-bottom-[80px] md:ptn-bottom-[110px] 3xl:ptn-bottom-[140px] ptn-right-4 ptn-rounded-2xl ptn-shadow-md ptn-z-[999998] ${
          xClose ? "ptn-opacity-0 ptn-scale-0" : "ptn-opacity-100 ptn-scale-100"
        }`}
        style={{
          transition: "all 0.3s ease-in-out",
        }}
      >
        <div className="ptn-flex ptn-w-full ptn-h-full ptn-justify-between ptn-items-center ptn-px-4">
          <div className="ptn-flex-1" onClick={onClick}>
            <p className="ptn-text-sm md:ptn-text-lg ptn-font-medium ptn-text-black bot-fonts">
              {text}
            </p>
            <span className="ptn-italic ptn-text-sm md:ptn-text-lg ptn-text-gray-600 bot-fonts">
                Just ask...
              </span>
            {/* <p className="ptn-text-xs ptn-text-gray-600"></p> */}
          </div>
          <X
            className="ptn-h-4 ptn-w-4 3xl:ptn-h-8 3xl:ptn-w-8 ptn-text-muted "
            onClick={() => handleXClose()}
          />
        </div>
      </div>
      <div
        className={`ptn-h-14 ptn-w-14 md:ptn-w-20 md:ptn-h-20 3xl:ptn-w-28 3xl:ptn-h-28 ptn-fixed ptn-transition-all ptn-bottom-3 ptn-right-3 ptn-z-[999998] ${
          isOpen ? "ptn-opacity-0 ptn-scale-0" : "ptn-opacity-100 ptn-scale-100"
        }`}
      >
        <div className="ptn-absolute ptn-inset-0 ptn-rounded-full ptn-bg-[#60A5FA]/80 ptn-opacity-20 ptn-animate-ping ptn-pointer-events-none"></div>
        {/* <div className="ptn-absolute ptn-inset-0 -ptn-m-2 ptn-rounded-full ptn-bg-[#60A5FA] ptn-opacity-10 ptn-animate-pulse ptn-pointer-events-none"></div> */}
        <div className="ptn-relative ptn-z-10 ptn-cursor-pointer" onClick={onClick}>{children}</div>
        {showNotification && (
          <div className="ptn-absolute -ptn-top-1 -ptn-right-1 lg:ptn-top-0 lg:ptn-right-0 3xl:ptn-top-1 3xl:ptn-right-1 ptn-h-3 ptn-w-3 md:ptn-h-4 md:ptn-w-4 3xl:ptn-w-6 3xl:ptn-h-6 ptn-bg-red-500 ptn-rounded-full ptn-border-2 ptn-border-white ptn-z-20"></div>
        )}
      </div>
    </>
  );
};

export default ChatBubble;
