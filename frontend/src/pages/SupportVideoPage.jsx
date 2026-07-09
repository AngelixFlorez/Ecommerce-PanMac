import { Link, useNavigate } from "react-router";
import { ArrowLeftIcon, VideoIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/react";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { apiFetch } from "../lib/api";
import {
  CallControls,
  StreamVideo,
  StreamCall,
  StreamTheme,
  SpeakerLayout,
} from "@stream-io/video-react-sdk";
import { StreamVideoClient } from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";

function SupportVideoPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getToken } = useAuth();

  const { data: tokenData } = useQuery({
    queryKey: ["stream-token"],
    queryFn: () => apiFetch("/api/stream/token", { getToken, method: "POST" }),
  });

  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!tokenData) return;

    const videoClient = new StreamVideoClient({
      apiKey: tokenData.apiKey,
      tokenProvider: () => Promise.resolve(tokenData.token),
      user: { id: tokenData.userId, name: tokenData.name },
    });

    const videoCall = videoClient.call("default", `support-call-${id}`);
    videoCall.join({ create: true });

    setClient(videoClient);
    setCall(videoCall);

    return () => {
      videoCall.leave().catch(() => {});
      videoClient.disconnectUser();
    };
  }, [tokenData, id]);

  if (error) {
    return (
      <div role="alert" className="alert alert-error">
        <span>{error}</span>
      </div>
    );
  }

  if (!client || !call) {
    return (
      <div className="flex min-h-120 items-center justify-center rounded-box border border-base-300 bg-base-100">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4 text-left">
      <Link to={`/support/${id}`} className="btn btn-ghost btn-sm gap-2 text-base-content/80">
        <ArrowLeftIcon className="size-4" aria-hidden />
        Volver al chat de soporte
      </Link>

      <div className="card border border-base-300 bg-base-100 shadow-sm">
        <div className="card-body flex-row items-start gap-4">
          <div className="avatar placeholder">
            <div className="w-12 rounded-box bg-secondary/20 text-secondary flex items-center justify-center">
              <VideoIcon className="size-6" aria-hidden />
            </div>
          </div>
          <div>
            <h1 className="card-title text-lg">Videollamada</h1>
            <p className="text-sm text-base-content/70">
              Permite cámara y micrófono cuando el navegador lo solicite.
            </p>
          </div>
        </div>
      </div>

      <div className="flex min-h-130 flex-col overflow-hidden rounded-box border border-base-300 bg-base-100">
        <StreamVideo client={client}>
          <StreamCall call={call}>
            <StreamTheme className="str-video__theme-custom">
              <div className="flex min-h-0 flex-1 flex-col">
                <div className="relative min-h-105 flex-1 bg-neutral text-neutral-content">
                  <SpeakerLayout />
                </div>
                <div className="shrink-0 border-t border-base-300 bg-base-200/90 px-2 py-3 [&_.str-video__call-controls]:flex-wrap [&_.str-video__call-controls]:justify-center">
                  <CallControls onLeave={() => navigate(`/support/${id}`)} />
                </div>
              </div>
            </StreamTheme>
          </StreamCall>
        </StreamVideo>
      </div>
    </div>
  );
}

export default SupportVideoPage;
