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
    title: "What is PAN?",
    intent: "What is PAN?",
    icon: <ClipboardPenIcon className="pth-h-5 ptn-w-5 ptn-stroke-1" />,
  },
  {
    title: "Who can apply for PAN?",
    intent: "Who can apply for PAN?",
    icon: <ClipboardPenIcon className="pth-h-5 ptn-w-5 ptn-stroke-1" />,
  },
  {
    title: "How do I apply for PAN?",
    intent: "How do I apply for PAN?",
    icon: <ListChecks className="pth-h-5 ptn-w-5 ptn-stroke-1" />,
  },
  {
    title: "What documents are required for pan application?",
    intent: "What documents are required for pan application?",
    icon: <HandCoins className="pth-h-5 ptn-w-5 ptn-stroke-1" />,
  },
  {
    title: "Is Aadhaar mandatory for pan application?",
    intent: "Is Aadhaar mandatory for pan application?",
    icon: <BadgeIndianRupee className="pth-h-5 ptn-w-5 ptn-stroke-1" />,
  },
  {
    title: "Where can I obtain PAN application form?",
    intent: "Where can I obtain PAN application form?",
    icon: <Calculator className="pth-h-5 ptn-w-5 ptn-stroke-1" />,
  },
  {
    title: "What are the charges to be paid while submitting Form 49A/ 49AA?",
    intent: "What are the charges to be paid while submitting Form 49A/ 49AA?",
    icon: <Calculator className="pth-h-5 ptn-w-5 ptn-stroke-1" />,
  },
];