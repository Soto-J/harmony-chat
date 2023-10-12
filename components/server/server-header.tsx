import { MemberRole, Server } from "@prisma/client";

type ServerHeadderProps = {
  server: Server;
  role: MemberRole | undefined;
};

const ServerHeadder = ({ server }: ServerHeadderProps) => {
  return <div>ServerHeadder</div>;
};

export default ServerHeadder;
