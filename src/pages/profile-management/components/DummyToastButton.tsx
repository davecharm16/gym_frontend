"use client"

import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function DummyToastButton() {
  return (
    <div className="p-4">
      <Button
        onClick={() => toast.success("Your toast message has appeared! 🎉")}
      >
        Show Toast
      </Button>
    </div>
  )
}
