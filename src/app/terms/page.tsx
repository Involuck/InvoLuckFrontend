import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Términos y Condiciones',
  description:
    'Lee los términos y condiciones de uso de InvoLuck. Conoce tus derechos y obligaciones al usar nuestra plataforma de facturación.',
  openGraph: {
    title: 'Términos y Condiciones | InvoLuck',
    description:
      'Lee los términos y condiciones de uso de InvoLuck.'
  }
};

export default function TermsPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden involuck-bg">
      <div className="involuck-grid -z-10" />
      <div className="involuck-noise -z-10" />
      <section className="mx-auto max-w-3xl px-6 py-14 text-brand-50">
        <header>
          <h1 className="text-4xl font-extrabold tracking-tight">
            Terms & Conditions
          </h1>
          <p className="mt-3 text-brand-100/90">
            Texto de ejemplo para desarrollo. Sustituir por los términos
            definitivos.
          </p>
        </header>
        <article className="prose prose-invert prose-sm md:prose-base max-w-none mt-8">
          <h2>Uso del servicio</h2>
          <p>
            El uso debe cumplir con la legislación vigente y estas condiciones.
          </p>
          <h2>Responsabilidad</h2>
          <p>
            El servicio se ofrece tal cual; limitaciones de responsabilidad
            aplican.
          </p>
          <h2>Pagos y cancelaciones</h2>
          <p>Políticas de facturación, cancelación y reembolsos.</p>
        </article>
      </section>
    </main>
  );
}
