import { PAN_QUERIES } from "@/lib/queries";
import ChatWindow from "@/components/bot-components/chat-window";
import plus_bot from "@/assets/protean_plus.png";

export default function PROTEANPAN() {
  return (
      <ChatWindow
        QUERIES={PAN_QUERIES}
        bot_image={plus_bot}
        styles={{
          base: "ptn-bg-proteanplus_accent_1",
          background: "ptn-bg-proteanplus_accent_2",
          bubble: "ptn-bg-proteanplus_card",
          content:
            "3xl:ptn-text-2xl prose-strong:ptn-text-nps_text_muted prose-a:ptn-text-blue-400",
          title_1: "",
          title_2: "ptn-text-proteanplus_text_muted",
          title_3: "ptn-text-proteanplus_text_muted/50",
          user_text: "",
          loader: "ptn-from-blue-200 ptn-via-violet-200 ptn-to-pink-200",
        }}
        theme="light"
        bot_type="Protean PAN RFP"
        bubble_message="Need any help with Protean PAN?"
      />
  );
}
