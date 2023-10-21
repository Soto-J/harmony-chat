"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import {
  CommandDialog,
  CommandGroup,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

type ServerSearchProps = {
  data: {
    label: string;
    type: "channel" | "member";
    data:
      | {
          icon: React.ReactNode;
          name: string;
          id: string;
        }[]
      | undefined;
  }[];
};

const ServerSearch = ({ data }: ServerSearchProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="
          group
          flex
          w-full
          items-center
          gap-x-2
          rounded-md
          px-2
          py-2
          transition
          hover:bg-zinc-700/10
          dark:hover:bg-zinc-700/50
         "
      >
        <Search className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
        <span
          className="
            text-sm
            font-semibold
            text-zinc-500
            transition
            group-hover:text-zinc-600
            dark:text-zinc-400
            dark:group-hover:text-zinc-300
          "
        >
          Search
        </span>
        <kbd
          className="
              pointer-events-none
              ml-auto
              inline-flex
              h-5
              select-none
              items-center
              gap-1
              rounded
              border
              bg-muted
              px-1.5
              font-mono
              text-[10px]
              font-medium
              text-muted-foreground          
            "
        >
          <span className="text-sm">CTRL</span>K
        </kbd>
      </button>

      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput placeholder="Search all channels and members" />

        <CommandList>
          <CommandEmpty>No Results Found.</CommandEmpty>

          {data.map(({ label, type, data }) => {
            if (!data?.length) {
              return null;
            }

            return (
              <CommandGroup key={label} heading={label}>
                {data?.map(({ id, name, icon }) => {
                  return (
                    <CommandItem onClick={() => {}} key={id}>
                      {icon}
                      <span className="ml-2">{name}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default ServerSearch;