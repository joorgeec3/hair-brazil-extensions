import React, { useEffect, useState } from 'react';
import { CheckCircle2, Clock, ShoppingBag, XCircle } from 'lucide-react';
import type { Language } from '../data/shopData';

interface Props {
  cancelled: boolean;
  language: Language;
  onNavigate: (path: string) => void;
  onPaid: () => void;
}
export const CheckoutResultPage: React.FC<Props> = ({ cancelled, language, onNavigate, onPaid }) => {
  const [status, setStatus] = useState<'checking' | 'paid' | 'pending'>(cancelled ? 'pending' : 'checking');
  useEffect(() => {
    if (cancelled) return;
    let stopped = false;
    const id = new URLSearchParams(window.location.search).get('session_id');
    if (!id) { setStatus('pending'); return; }
    fetch('/api/checkout-status?session_id=' + encodeURIComponent(id), { cache: 'no-store' })
      .then(async (response) => {
        if (!response.ok) throw new Error('Verification unavailable');
        return response.json();
      })
      .then((data) => {
        if (stopped) return;
        if (data.paid) {
          setStatus('paid');
          onPaid();
        } else setStatus('pending');
      })
      .catch(() => { if (!stopped) setStatus('pending'); });
    return () => { stopped = true; };
  }, [cancelled, onPaid]);

  const copy = {
    EN: { cancelled: 'Checkout cancelled', cancelledText: 'No payment was taken. Your bag is saved if you would like to try again.', checking: 'Verifying payment…', paid: 'Payment confirmed', paidText: 'Your payment was confirmed by the payment provider. Keep your receipt for your records.', pending: 'Payment not confirmed', pendingText: 'We could not verify a completed payment. Check your payment provider receipt before trying again.', back: 'Return to shop' },
    PT: { cancelled: 'Pagamento cancelado', cancelledText: 'Nenhuma cobrança foi realizada. Seu carrinho continua salvo para tentar novamente.', checking: 'Verificando pagamento…', paid: 'Pagamento confirmado', paidText: 'O provedor confirmou seu pagamento. Guarde o comprovante.', pending: 'Pagamento não confirmado', pendingText: 'Não foi possível confirmar o pagamento. Confira seu comprovante antes de tentar novamente.', back: 'Voltar à loja' },
    ES: { cancelled: 'Pago cancelado', cancelledText: 'No se ha cobrado nada. Tu carrito sigue guardado para volver a intentarlo.', checking: 'Verificando el pago…', paid: 'Pago confirmado', paidText: 'El proveedor ha confirmado tu pago. Guarda el recibo.', pending: 'Pago no confirmado', pendingText: 'No se pudo confirmar el pago. Consulta tu recibo antes de intentarlo de nuevo.', back: 'Volver a la tienda' }
  }[language];
  const good = !cancelled && status === 'paid';
  return <section className="flex min-h-[70vh] items-center justify-center bg-[#fffefa] px-5 pb-24 pt-36 text-center text-[#241f1b]">
    <div className="mx-auto max-w-lg">
      {good ? <CheckCircle2 className="mx-auto text-[#438457]" size={49}/> : cancelled ? <XCircle className="mx-auto text-[#a17c56]" size={49}/> : <Clock className="mx-auto text-[#a17c56]" size={49}/>}
      <h1 className="mt-6 font-serif-editorial text-4xl sm:text-5xl">{cancelled ? copy.cancelled : status === 'checking' ? copy.checking : good ? copy.paid : copy.pending}</h1>
      <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#655d54]">{cancelled ? copy.cancelledText : good ? copy.paidText : status === 'checking' ? '' : copy.pendingText}</p>
      <button type="button" onClick={() => onNavigate('/shop')} className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#241f1b] px-7 py-4 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#927648]"><ShoppingBag size={17}/> {copy.back}</button>
    </div>
  </section>;
};
