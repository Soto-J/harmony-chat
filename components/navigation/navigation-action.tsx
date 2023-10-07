"use client";

import { Plus } from "lucide-react";

type NavigationActionProps = {
  servers: any;
};

const NavigationAction = () => {
  return (
    <div>
      <button className="group flex items-center">
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
    </div>
  );
};

export default NavigationAction;
