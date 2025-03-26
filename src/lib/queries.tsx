import {
  BadgeIndianRupee,
  Calculator,
  ClipboardPenIcon,
  HandCoins,
  ListChecks,
} from "lucide-react";
import { QUERIES } from "./types";

export const PAN_QUERIES: QUERIES = [
  {
    title: "Who can register for NPS?",
    intent: "Who can register for NPS?",
    icon: <ClipboardPenIcon className="pth-h-5 ptn-w-5 ptn-stroke-1" />,
  },
  {
    title: "What's the registration process?",
    intent: "What's the registration process?",
    icon: <ListChecks className="pth-h-5 ptn-w-5 ptn-stroke-1" />,
  },
  {
    title: "What are the benefits of NPS?",
    intent: "What are the benefits of NPS?",
    icon: <HandCoins className="pth-h-5 ptn-w-5 ptn-stroke-1" />,
  },
  {
    title: "How can I withdraw money from NPS?",
    intent: "How can I withdraw money from NPS?",
    icon: <BadgeIndianRupee className="pth-h-5 ptn-w-5 ptn-stroke-1" />,
  },
  {
    title: "What income tax reliefs are available to individuals?",
    intent: "What income tax reliefs are available to individuals?",
    icon: <Calculator className="pth-h-5 ptn-w-5 ptn-stroke-1" />,
  },
];