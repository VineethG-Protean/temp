import { useTranslation } from "react-i18next";
import "../../../i18n";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Localization() {
    const { i18n } = useTranslation();
  return (
    <div className="ptn-absolute ptn-top-3 ptn-left-3 ptn-border ptn-px-4 ptn-rounded-2xl">
      <Select onValueChange={(e) => i18n.changeLanguage(e)}>
        <SelectTrigger className="ptn-w-[80px]">
          <SelectValue placeholder="अEn" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="hi">Hindi</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
