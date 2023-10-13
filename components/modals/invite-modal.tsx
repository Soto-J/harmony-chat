"use client";

import { useRouter } from "next/navigation";
import { Copy, RefreshCw } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModalStore } from "@/hooks/use-modal-store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useOrigin } from "@/hooks/use-origin";

const CreateServerModal = () => {
  const { isOpen, onClose, type } = useModalStore();
  const origin = useOrigin();

  const inviteLink = `${origin}`;

  const isModalOpen = isOpen && type === "invite";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-white p-0 text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            Invite Friends
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label
            className="
              text-xs 
              font-bold 
              uppercase 
              text-zinc-500 
              dark:text-secondary/70
            "
          >
            Server Invite Link
          </Label>
          <div className="mt-2 flex items-center gap-x-2">
            <Input
              value={inviteLink}
              className="
                border-0
                bg-zinc-300/50
                text-black
                focus-visible:ring-0
                focus-visible:ring-offset-0
              "
            />
            <Button size="icon" onClick={() => console.log("Click!")}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <Button
            variant="link"
            size="sm"
            className="mt-4 text-xs text-zinc-500"
          >
            Generate a new link
            <RefreshCw className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateServerModal;
