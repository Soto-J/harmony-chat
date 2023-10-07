import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import Image from "next/image";
import NavigationAction from "./navigation-action";

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
      <NavigationAction />
      {/* {servers.map((val) => (
        <div key={val.id} className="">
          <Image
            src={val.imageUrl}
            alt="Server Icon"
            width={50}
            height={50}
            className="rounded-full"
          />
        </div>
      ))} */}
    </div>
  );
};

export default NavigationSidebar;
