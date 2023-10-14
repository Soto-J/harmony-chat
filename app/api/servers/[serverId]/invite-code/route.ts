type Query = {
  serverId: string;
};

export async function PATCH(query: Query) {
  const { serverId } = query;
  console.log("[PATCH]", { serverId });

  return {
    status: 200,
    body: {
      inviteCode: "inviteCode",
    },
  };
}
