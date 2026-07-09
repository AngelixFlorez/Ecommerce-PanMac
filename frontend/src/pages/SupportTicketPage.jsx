import { HeadphonesIcon, Clock, VideoIcon } from "lucide-react";
import { PageError } from "../components/PageError.jsx";
import { useSupportTicketPage } from "../hooks/useSupportTicketPage.js";
import {
  Chat,
  Channel,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  Window,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";
import { Link } from "react-router";

function SupportTicketPage() {
  const { client, error, channel, canInvite, inviteMutation } = useSupportTicketPage();

  if (error) {
    return <PageError message={error} />;
  }

  if (!client || !channel) {
    return (
      <div className="flex min-h-60 items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4 text-left">
      <div className="card border border-base-300 bg-base-100 shadow-sm">
        <div className="card-body flex-row flex-wrap items-start gap-4">
          <div className="avatar placeholder">
            <div className="w-12 rounded-box bg-primary/20 text-primary flex items-center justify-center">
              <HeadphonesIcon className="size-6" aria-hidden />
            </div>
          </div>

          <div className="flex-1">
            <h3 className="card-title text-base">Soporte general</h3>
            <p className="text-sm text-base-content/70">
              Este chat estará disponible por 24 horas. Después se cerrará automáticamente.
            </p>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-base-content/50">
              <Clock className="size-3.5" aria-hidden />
              <span>El ticket expira en 24 horas</span>
            </div>

            {canInvite ? (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm gap-2"
                  disabled={inviteMutation.isPending}
                  onClick={() => inviteMutation.mutate()}
                >
                  {inviteMutation.isPending ? (
                    <span className="loading loading-spinner loading-xs" />
                  ) : (
                    <VideoIcon className="size-4" aria-hidden />
                  )}
                  Enviar invitación de video
                </button>

                {inviteMutation.isError ? (
                  <span className="text-sm text-error">No se pudo enviar la invitación.</span>
                ) : null}

                {inviteMutation.isSuccess ? (
                  <span className="text-sm text-success">Invitación enviada.</span>
                ) : null}
              </div>
            ) : null}
          </div>

          <Link to="/" className="btn btn-ghost btn-sm">
            Volver a tienda
          </Link>
        </div>
      </div>

      <div className="stream-panel h-140 overflow-hidden rounded-box border border-neutral-700 bg-neutral-950 [&_.str-chat\_\_main-panel]:min-h-0">
        <Chat client={client} theme="messaging str-chat__theme-dark">
          <Channel channel={channel}>
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
            <Thread />
          </Channel>
        </Chat>
      </div>
    </div>
  );
}

export default SupportTicketPage;
