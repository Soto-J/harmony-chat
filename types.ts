import { Member, Prisma, Profile, Server } from "@prisma/client";

const server = Prisma.validator<Prisma.ServerDefaultArgs>()({
  include: { channels: true, members: { include: { profile: true } } },
});

export type ServerWithChannelsAndMembers = Prisma.ServerGetPayload<
  typeof server
>;

export type ServerWithMemberWithProfiles = Server & {
  members: (Member & { profile: Profile })[];
};
