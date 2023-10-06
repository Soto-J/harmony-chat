import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

const NavigationSidebar = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const servers = await db.server.findMany({
    where: { profileId: profile.id },
  });

  console.log(servers);

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
      {servers.map((val) => (
        <div key={val.id}>{val.name}</div>
      ))}
    </div>
  );
};

export default NavigationSidebar;
