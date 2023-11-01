import { Hash, Menu } from "lucide-react";

type ChatHeaderProps = {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
};

const ChatHeader = ({ serverId, name, type, imageUrl }: ChatHeaderProps) => {
  return (
    <div
      className="
      text-md 
      flex 
      h-12 
      items-center
      border-b-2
      border-neutral-200
      px-3
      font-semibold
      dark:border-neutral-800
      "
    >
      <Menu className="mr-2 h-6 w-6 md:hidden" />
      {type === "channel" && (
        <Hash className="mr-2 h-5 w-5 text-zinc-500 dark:text-zinc-400" />
      )}
      <p className="text-md font-semibold text-black dark:text-white">{name}</p>
    </div>
  );
};

export default ChatHeader;
