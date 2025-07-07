import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import { cn } from "@/lib/utils"; // Optional: for conditional classNames

export const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      position="top-right"
      toastOptions={{
        classNames: {
          toast: cn(
            "rounded-lg shadow-lg border px-4 py-3 bg-white text-black",
            "animate-in slide-in-from-right fade-in duration-300"
          ),
          title: "text-base font-semibold",
          description: "text-sm text-muted-foreground",
          success: "text-green-600",
          error: "text-red-600",
          warning: "text-yellow-600",
        },
      }}
      {...props}
    />
  );
};
