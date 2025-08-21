export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden involuck-bg">
      <div className="involuck-grid -z-10" />
      <div className="involuck-noise -z-10" />
      <section className="mx-auto max-w-3xl px-6 py-14 text-brand-50">
        <header>
          <h1 className="text-4xl font-extrabold tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-3 text-brand-100/90">
            Documento de ejemplo para desarrollo. Reemplázalo por tu política
            final.
          </p>
        </header>
        <article className="prose prose-invert prose-sm md:prose-base max-w-none mt-8">
          <h2>Información que recopilamos</h2>
          <p>
            Datos de cuenta, uso del producto y metadatos necesarios para operar
            el servicio.
          </p>
          <h2>Cómo protegemos tu información</h2>
          <p>
            Cifrado en tránsito y en reposo, controles de acceso y buenas
            prácticas de seguridad.
          </p>
          <h2>Tus derechos</h2>
          <p>
            Acceso, rectificación y eliminación, entre otros. Contáctanos para
            ejercerlos.
          </p>
        </article>
      </section>
    </main>
  );
}
