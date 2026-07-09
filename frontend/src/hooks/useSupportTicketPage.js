import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { StreamChat } from "stream-chat";
import { apiFetch } from "../lib/api.js";
import { useAuth } from "@clerk/react";

export function useSupportTicketPage() {
  const { id } = useParams();
  const { getToken, isSignedIn } = useAuth();

  const [client, setClient] = useState(null);
  const [error, setError] = useState(null);

  const { data: meData } = useQuery({
    queryKey: ["me"],
    queryFn: () => apiFetch("/api/me", { getToken }),
    enabled: isSignedIn,
  });

  const role = meData?.user?.role;
  const canInvite = role === "support" || role === "admin";

  const inviteMutation = useMutation({
    mutationFn: () => apiFetch(`/api/support/${id}/video-invite`, { getToken, method: "POST" }),
  });

  useEffect(() => {
    if (!id) return undefined;

    let chatClient;

    async function connect() {
      await apiFetch(`/api/support/${id}/stream-channel`, { method: "POST", getToken });

      const token = await apiFetch("/api/stream/token", { getToken, method: "POST" });

      chatClient = StreamChat.getInstance(token.apiKey);

      await chatClient.connectUser({ id: token.userId, name: token.name }, token.token);

      const channel = chatClient.channel("messaging", `support-${id}`);

      await channel.watch();
      setClient(chatClient);
    }

    connect().catch((e) => {
      setError(e instanceof Error ? e.message : "Error al cargar el chat");
    });

    return () => {
      if (chatClient) {
        chatClient.disconnectUser();
      }
    };
  }, [id, getToken]);

  const channel = client && id ? client.channel("messaging", `support-${id}`) : null;

  return { client, error, channel, canInvite, inviteMutation };
}
