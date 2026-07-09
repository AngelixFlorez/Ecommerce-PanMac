import { useState } from "react";
import { useAuth } from "@clerk/react";
import { apiFetch } from "../lib/api";
import { useNavigate } from "react-router";

export function useCreateSupportTicket() {
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function createTicket() {
    setLoading(true);
    setError(null);

    try {
      const data = await apiFetch("/api/support", { getToken, method: "POST" });
      navigate(`/support/${data.ticket.id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al crear el ticket");
    }

    setLoading(false);
  }

  return { createTicket, loading, error };
}
