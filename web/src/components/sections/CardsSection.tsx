import { cn } from "../../utils/cn";

interface CardsSectionProps {
  title: string;
  orientation?: "horizontal" | "vertical";
  className?: string;
  children: React.ReactNode;
}

export default function CardsSection({
  title,
  orientation = "horizontal",
  className,
  children,
}: CardsSectionProps) {
  return (
    <section>
      <div className="p-8 pb-0 text-xl font-bold">{title}</div>
      <div className="w-full overflow-x-auto">
        <div
          className={cn(
            "grid gap-4 p-4",
            orientation === "horizontal"
              ? "w-max grid-flow-col-dense grid-rows-1"
              : "w-full grid-cols-1",
            className,
          )}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
