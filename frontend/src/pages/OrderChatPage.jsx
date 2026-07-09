import { HeadphonesIcon, VideoIcon } from "lucide-react";
import { OrderChatPanelSkeleton } from "../components/LoadingSkeletons.jsx";
import { PageError } from "../components/PageError.jsx";
import { useOrderChatPage } from "../hooks/useOrderChatPage.js";
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

function OrderChatPage() {
  const { paid, client, error, channel, canInvite, inviteMutation } = useOrderChatPage();

  if (!paid) {
    return <p className="text-base-content/60">Completa el pago para abrir el chat de soporte.</p>;
  }
  if (error) {
    return <PageError message={error} />;
  }
  if (!client || !channel) {
    return <OrderChatPanelSkeleton />;
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
            <h3 className="card-title text-base">Enviar mensaje</h3>
            <p className="text-sm text-base-content/70">
              Pregunta sobre este pedido, envío o devoluciones. El soporte puede enviar un enlace de
              videollamada aquí cuando sea necesario; ambos lados usan el mismo botón de Unirse.
            </p>

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
export default OrderChatPage;
