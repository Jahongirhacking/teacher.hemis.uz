import { ReactNode } from "react";

interface RepeatProps {
  count: number;
  children: ReactNode;
}

export function Repeat({ count, children }: RepeatProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>{children}</div>
      ))}
    </>
  );
}
