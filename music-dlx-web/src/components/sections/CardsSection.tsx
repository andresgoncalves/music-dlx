import { cn } from "../../utils/cn";

interface CardsSectionProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}

export default function CardsSection({
  title,
  className,
  children,
}: CardsSectionProps) {
  return (
    <section>
      <div className="p-8 pb-0 text-xl font-bold">{title}</div>
      <div className="w-full overflow-x-auto">
        <div
          className={cn(
            "grid w-max grid-flow-col-dense grid-rows-1 gap-4 p-4",
            className,
          )}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
