"use client";

import { Plus } from "lucide-react";

import ActionTooltip from "@/components/action-tooltip";
import { useModalStore } from "@/hooks/use-modal-store";
import CreateServerModal from "../modals/create-server-modal";

const NavigationAction = () => {
  const { onOpen } = useModalStore();

  return (
    <div>
      <CreateServerModal />
      <ActionTooltip label="Add a server" side="right" align="center">
        <button
          onClick={() => onOpen("createServer")}
          className="group flex items-center"
        >
          <div
            className="
              mx-3 
              flex 
              h-[48px] 
              w-[48px] 
              items-center
              justify-center
              overflow-hidden
              rounded-[24px]
              bg-background
              transition-all
              group-hover:rounded-[16px]
              group-hover:bg-emerald-500
              dark:bg-neutral-700
            "
          >
            <Plus
              className="text-emerald-500 transition group-hover:text-white"
              size={25}
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};

export default NavigationAction;
