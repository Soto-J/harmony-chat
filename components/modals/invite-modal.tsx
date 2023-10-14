"use client";

import { useState } from "react";
import { Check, Copy, RefreshCw } from "lucide-react";
import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useOrigin } from "@/hooks/use-origin";
import { useModalStore } from "@/hooks/use-modal-store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CreateServerModal = () => {
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const origin = useOrigin();
  const {
    isOpen,
    onOpen,
    onClose,
    type,
    data: { server },
  } = useModalStore();

  const inviteLink = `${origin}/invite/${server?.inviteCode}`;

  const isModalOpen = isOpen && type === "invite";

  const onCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const generateNewLink = async () => {
    try {
      setIsLoading(true);

      const response = await axios.patch(
        `/api/servers/${server?.id}/invite-code`,
      );

      onOpen("invite", { server: response.data });
    } catch (error) {
      console.log("[ERROR] - generateNewLink", { error });
    } finally {
      setIsLoading(false);
    }
  };

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
              disabled={isLoading}
              className="
                border-0
                bg-zinc-300/50
                text-black
                focus-visible:ring-0
                focus-visible:ring-offset-0
              "
            />
            <Button size="icon" onClick={onCopy} disabled={isLoading}>
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <Button
            onClick={generateNewLink}
            disabled={isLoading}
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
