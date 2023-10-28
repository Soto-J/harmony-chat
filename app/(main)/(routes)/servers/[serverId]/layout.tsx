import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { currentProfile } from "@/lib/current-profile"
;
import ServerSidebar from "@/components/server/server-sidebar";

type ServerIdLayoutProps = {
  children: React.ReactNode;
  params: { serverId: string };
};

const ServerIdLayout = async ({ children, params }: ServerIdLayoutProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: { profileId: profile.id },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }

  return (
    <div className="h-full">
      <div
        className="
          hidden
          md:fixed
          md:inset-y-0
          md:z-20
          md:flex
          md:h-full  
          md:w-60
          md:flex-col
        "
      >
        <ServerSidebar serverId={server.id} />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
};

export default ServerIdLayout;
