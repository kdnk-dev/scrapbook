import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("f8w-animate-pulse f8w-rounded-md f8w-bg-muted", className)}
      {...props}
    />
  );
}

export { Skeleton };
