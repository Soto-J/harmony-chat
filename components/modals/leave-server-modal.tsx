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

const LeaveServerModal = () => {
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    isOpen,
    onOpen,
    onClose,
    modalType,
    data: { server },
  } = useModalStore();

  const isModalOpen = isOpen && modalType === "leaveServer";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-white p-0 text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            Leave Server
          </DialogTitle>
        </DialogHeader>
        <div className="p-6"></div>
      </DialogContent>
    </Dialog>
  );
};

export default LeaveServerModal;
