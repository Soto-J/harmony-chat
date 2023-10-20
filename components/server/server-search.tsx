"use client";

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
  return <div>Server Search</div>;
};

export default ServerSearch;
