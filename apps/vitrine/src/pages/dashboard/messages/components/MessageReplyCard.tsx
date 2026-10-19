import { useState, forwardRef } from "react";
import { Send, CheckCircle2 } from "lucide-react";

interface MessageReplyCardProps {
  readonly defaultRecipient?: string;
  readonly onSendSuccess?: () => void;
}

const MessageReplyCard = forwardRef<HTMLDivElement, MessageReplyCardProps>(
  function MessageReplyCard({ defaultRecipient = "", onSendSuccess }, ref) {
    const [recipient, setRecipient] = useState(defaultRecipient);
    const [replyText, setReplyText] = useState("");
    const [isSent, setIsSent] = useState(false);

    const handleSend = (e: React.FormEvent) => {
      e.preventDefault();
      if (!replyText.trim()) return;

      setIsSent(true);
      if (onSendSuccess) onSendSuccess();

      setTimeout(() => {
        setIsSent(false);
        setReplyText("");
      }, 3500);
    };

    return (
      <section
        ref={ref}
        id="reply-section"
        className="rounded-xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs space-y-4"
      >
        <div>
          <h2 className="text-base font-bold text-[#15364a]">Réponse</h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Zone de rédaction · {isSent ? "Message envoyé" : "Aucun message envoyé"}
          </p>
        </div>

        {isSent && (
          <div className="flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-sm text-[#135d3b]">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
            <span>Votre réponse a bien été transmise avec succès.</span>
          </div>
        )}

        <form onSubmit={handleSend} className="space-y-4">
          <div>
            <label
              htmlFor="reply-recipient"
              className="block text-xs font-semibold text-slate-600 mb-1"
            >
              Destinataire
            </label>
            <input
              id="reply-recipient"
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="À compléter"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-[#135d3b] focus:outline-none focus:ring-1 focus:ring-[#135d3b] transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="reply-content"
              className="block text-xs font-semibold text-slate-600 mb-1"
            >
              Votre réponse
            </label>
            <textarea
              id="reply-content"
              rows={4}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="À compléter"
              className="w-full rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-[#135d3b] focus:outline-none focus:ring-1 focus:ring-[#135d3b] transition-colors resize-y"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            <p className="text-xs text-slate-400">
              Compléter le destinataire et le contenu avant l&apos;envoi.
            </p>

            <button
              type="submit"
              disabled={!replyText.trim()}
              className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors shadow-2xs cursor-pointer ${
                replyText.trim()
                  ? "bg-[#135d3b] hover:bg-[#0f4a2f] text-white"
                  : "bg-white border border-slate-200 text-slate-400 hover:bg-slate-50 cursor-not-allowed"
              }`}
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              <span>Envoyer la réponse</span>
            </button>
          </div>
        </form>
      </section>
    );
  }
);

export default MessageReplyCard;

