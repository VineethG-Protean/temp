import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface LoaderProps {
  bot_image: string;
  loader_color: string;
}

export default function Loader({ bot_image, loader_color }: LoaderProps) {
  return (
    <div className="ptn-flex ptn-flex-col ptn-gap-4 ptn-w-full">
      <div className="ptn-flex ptn-flex-col ptn-gap-1 ptn-w-full">
        <Skeleton
          className={cn(
            "ptn-w-full ptn-h-[12px] 3xl:ptn-h-[16px] ptn-rounded-sm ptn-bg-gradient-to-r",
            loader_color
          )}
        />
        <Skeleton
          className={cn(
            "ptn-w-3/4 ptn-h-[12px] 3xl:ptn-h-[16px] ptn-rounded-sm ptn-bg-gradient-to-r",
            loader_color
          )}
        />
        <Skeleton
          className={cn(
            "ptn-w-2/4 ptn-h-[12px] 3xl:ptn-h-[16px] ptn-rounded-sm ptn-bg-gradient-to-r",
            loader_color
          )}
        />
      </div>
      <img src={bot_image} className="ptn-h-10 ptn-w-10" />
    </div>
  );
}
