import { QUICK_QUERIES } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function QuickQueries({
  onSendIntent,
  queries,
  styles,
}: {
  onSendIntent: (intent: string) => void;
  queries: QUICK_QUERIES;
  styles?: {
    background?: string;
    text?: string;
  };
}) {
  const [pauseOnHover, setPauseOnHover] = useState<boolean>(false);

  // Double the queries array to create a seamless loop effect
  const scrollingQueries = [...queries, ...queries];

  return (
    <div
      className="scroller ptn-relative ptn-z-20 ptn-overflow-x-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)] ptn-scrollbar-hide"
      onMouseEnter={() => setPauseOnHover(true)}
      onMouseLeave={() => setPauseOnHover(false)}
    >
      <ul
        className={cn(
          "ptn-flex ptn-w-max ptn-flex-nowrap",
          "scroller-animation",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{ animationPlayState: pauseOnHover ? "paused" : "running" }}
      >
        {scrollingQueries.map((query, index) => (
          <li
            key={index}
            className={cn(
              "ptn-inline-flex ptn-gap-1 ptn-items-center ptn-min-w-fit ptn-cursor-pointer ptn-p-2 ptn-rounded-2xl ptn-transition-all ptn-duration-500",
              styles?.background
            )}
            onClick={() => onSendIntent(query.intent)}
          >
            {query.icon}
            <p className={cn("bot-fonts ptn-font-thin", styles?.text)}>
              {query.title}
            </p>
          </li>
        ))}
      </ul>
      <style>{`
        .scroller {
          position: relative;
          overflow: hidden;
          width: 100%;
        }
        .scroller-animation {
          display: flex;
          gap: 1px;
          animation: scroll-loop 30s linear infinite;
        }
        @keyframes scroll-loop {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
