import { redirect } from "next/navigation";
import Image from "next/image";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

import NavigationAction from "./navigation-action";
import NavigationItem from "./navigation-item";

const NavigationSidebar = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const servers = await db.server.findMany({
    where: { profileId: profile.id },
  });

  return (
    <div
      className="
        flex 
        h-full 
        w-full 
        flex-col 
        items-center 
        space-y-4 
        py-3
        text-primary
        dark:bg-[#1e1f22]
      "
    >
      <NavigationAction />

      <Separator
        className="
          mx-auto 
          h-[2px]
          w-10
          rounded-md
          bg-zinc-300
          dark:bg-zinc-700
        "
      />

      <ScrollArea className="w-full flex-1">
        {servers.map((server) => (
          <div key={server.id} className="mb-4">
            <NavigationItem
              id={server.id}
              name={server.name}
              imageUrl={server.imageUrl}
            />
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default NavigationSidebar;
