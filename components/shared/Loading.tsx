"use client";

interface LoadingProps {
  text?: string; // optional text below the spinner
  size?: number; // spinner size in rem
}

export const Loading = ({
  text = "Yuklanmoqda...",
  size = 5,
}: LoadingProps) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center w-full h-full gap-2 p-4">
      {/* Spinner */}
      <div
        className="rounded-full border-4 border-gray-200 border-t-primary animate-spin"
        style={{ width: `${size}rem`, height: `${size}rem` }}
      ></div>

      {/* Optional text */}
      {text && <span className="text-sm text-muted-foreground">{text}</span>}
    </div>
  );
};
