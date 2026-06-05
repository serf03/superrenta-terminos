function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 mb-4">
      <div className="w-1 h-6 rounded-sm bg-accent-bar shrink-0 mt-1.5" />
      <h2 className="text-lg font-bold text-heading tracking-[-0.3px] leading-snug">
        {children}
      </h2>
    </div>
  );
}

function SubsectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[15px] font-bold text-[#16212C] mb-1.5">
      {children}
    </h3>
  );
}

function Para({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[14px] leading-[22px] text-body mb-2.5">
      {children}
    </p>
  );
}

function BulletList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-1.5 mb-4">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2 pr-2">
          <span className="text-[14px] leading-[22px] text-accent-bar font-bold w-4 shrink-0">
            &bull;
          </span>
          <span className="flex-1 text-[14px] leading-[22px] text-body">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

function GlassCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[rgba(255,255,255,0.92)] rounded-3xl border border-[rgba(255,255,255,0.9)] shadow-sm p-6 sm:p-8 mb-6"
      style={{
        boxShadow: '0 12px 24px rgba(26,32,37,0.06)',
      }}
    >
      {children}
    </div>
  );
}

export default function Terminos() {
  return (
    <main className="mx-auto max-w-3xl px-6 sm:px-8 py-8">
      <GlassCard>
        <div className="text-center mb-8">
          <p className="text-xs italic text-muted-light">
            Última actualización: 5 de junio de 2026
          </p>
        </div>

        <section className="mb-8">
          <SectionTitle>1. Introducción</SectionTitle>
          <Para>
            Bienvenido a SuperRenta. Estos Términos y Condiciones regulan el uso de la
            aplicación móvil SuperRenta, una plataforma que conecta a propietarios e
            inquilinos para la renta de propiedades inmobiliarias.
          </Para>
          <Para>
            Al acceder o utilizar SuperRenta, usted acepta estar sujeto a estos términos.
            Si no está de acuerdo con alguno de ellos, no debe utilizar la plataforma.
          </Para>
        </section>

        <section className="mb-8">
          <SectionTitle>2. Definiciones</SectionTitle>
          <BulletList
            items={[
              <span><strong className="text-heading">Plataforma:</strong> La aplicación móvil SuperRenta y todos sus servicios asociados.</span>,
              <span><strong className="text-heading">Usuario:</strong> Toda persona que acceda o utilice la Plataforma.</span>,
              <span><strong className="text-heading">Propietario:</strong> Usuario que publica propiedades en renta a través de la Plataforma.</span>,
              <span><strong className="text-heading">Inquilino:</strong> Usuario que busca y contacta sobre propiedades publicadas.</span>,
              <span><strong className="text-heading">Propiedad:</strong> Inmueble publicado en la Plataforma para su renta.</span>,
              <span><strong className="text-heading">Contenido:</strong> Toda información, imágenes, descripciones y datos publicados en la Plataforma.</span>,
            ]}
          />
        </section>

        <section className="mb-8">
          <SectionTitle>3. Uso de la Plataforma</SectionTitle>
          <SubsectionTitle>3.1 Registro</SubsectionTitle>
          <Para>
            Para utilizar SuperRenta, los usuarios deben crear una cuenta proporcionando
            información veraz y completa. El usuario es responsable de mantener la
            confidencialidad de sus credenciales de acceso.
          </Para>
          <SubsectionTitle>3.2 Publicación de Propiedades</SubsectionTitle>
          <Para>
            Los Propietarios pueden publicar propiedades proporcionando información
            precisa, incluyendo precio, ubicación, fotografías y características. Toda
            propiedad publicada está sujeta a revisión y aprobación por parte de SuperRenta.
          </Para>
          <SubsectionTitle>3.3 Búsqueda y Contacto</SubsectionTitle>
          <Para>
            Los Inquilinos pueden buscar propiedades utilizando filtros de ubicación,
            precio, tipo y otras características. El contacto entre Propietarios e
            Inquilinos se realiza a través de la Plataforma.
          </Para>
        </section>

        <section className="mb-8">
          <SectionTitle>4. Responsabilidades</SectionTitle>
          <SubsectionTitle>4.1 Del Usuario</SubsectionTitle>
          <BulletList
            items={[
              'Proporcionar información veraz y actualizada.',
              'No utilizar la Plataforma para fines ilegales o no autorizados.',
              'Respetar los derechos de propiedad intelectual de SuperRenta y otros usuarios.',
              'No publicar contenido falso, engañoso o discriminatorio.',
            ]}
          />
          <SubsectionTitle>4.2 Del Propietario</SubsectionTitle>
          <BulletList
            items={[
              'Garantizar que tiene la autoridad legal para rentar la propiedad publicada.',
              'Mantener la información de la propiedad actualizada y precisa.',
              'Responder a las solicitudes de contacto en un tiempo razonable.',
              'Cumplir con todas las leyes y regulaciones aplicables a la renta de propiedades.',
            ]}
          />
          <SubsectionTitle>4.3 De SuperRenta</SubsectionTitle>
          <BulletList
            items={[
              'Proporcionar una plataforma funcional y segura.',
              'Revisar las propiedades publicadas para cumplir con los estándares de calidad.',
              'Proteger los datos personales de los usuarios conforme a nuestra Política de Privacidad.',
              'SuperRenta actúa únicamente como intermediario y no es parte en los contratos de renta.',
            ]}
          />
        </section>

        <section className="mb-8">
          <SectionTitle>5. Propiedad Intelectual</SectionTitle>
          <Para>
            Todos los derechos de propiedad intelectual sobre la Plataforma, incluyendo
            pero no limitado a software, diseño, logotipos, marcas y contenido original,
            son propiedad de SuperRenta o sus licenciantes.
          </Para>
          <Para>
            El contenido publicado por los usuarios en la Plataforma sigue siendo de su
            propiedad, pero al publicarlo otorgan a SuperRenta una licencia no exclusiva,
            gratuita y mundial para mostrar y distribuir dicho contenido dentro de la
            Plataforma.
          </Para>
        </section>

        <section className="mb-8">
          <SectionTitle>6. Política de Privacidad</SectionTitle>
          <Para>
            SuperRenta recopila y procesa datos personales de los usuarios, incluyendo
            nombre, correo electrónico, número de teléfono y datos de ubicación, con el
            fin de proporcionar y mejorar sus servicios.
          </Para>
          <Para>
            Utilizamos Firebase (Google) para autenticación y almacenamiento de datos,
            y Cloudinary para el almacenamiento y optimización de imágenes. Estos
            servicios pueden tener sus propias políticas de privacidad.
          </Para>
          <Para>
            Los usuarios pueden solicitar la eliminación de sus datos en cualquier momento
            contactando a través de los canales indicados en esta página.
          </Para>
        </section>

        <section className="mb-8">
          <SectionTitle>7. Limitación de Responsabilidad</SectionTitle>
          <Para>
            SuperRenta no será responsable por:
          </Para>
          <BulletList
            items={[
              'Daños directos o indirectos derivados del uso de la Plataforma.',
              'La veracidad de la información publicada por los usuarios.',
              'Conflictos entre Propietarios e Inquilinos que surjan fuera de la Plataforma.',
              'Interrupciones del servicio causadas por mantenimiento, fallos técnicos o casos de fuerza mayor.',
              'Pérdida de datos o daños causados por malware o acceso no autorizado.',
            ]}
          />
        </section>

        <section className="mb-8">
          <SectionTitle>8. Modificaciones</SectionTitle>
          <Para>
            SuperRenta se reserva el derecho de modificar estos términos en cualquier
            momento. Los cambios serán notificados a los usuarios a través de la
            Plataforma o por correo electrónico. El uso continuado de la Plataforma
            después de dichas modificaciones constituye la aceptación de los nuevos
            términos.
          </Para>
        </section>

        <section>
          <SectionTitle>9. Contacto</SectionTitle>
          <Para>
            Para cualquier pregunta, comentario o solicitud relacionada con estos
            términos, puede contactarnos a través de:
          </Para>
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[rgba(15,23,32,0.04)]">
              <svg className="w-4 h-4 text-muted-light shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div>
                <p className="text-xs text-muted-light font-medium uppercase tracking-wide">Correo electrónico</p>
                <a href="mailto:developer@arkqc.app" className="text-sm text-heading font-medium hover:underline">
                  developer@arkqc.app
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[rgba(15,23,32,0.04)]">
              <svg className="w-4 h-4 text-muted-light shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <p className="text-xs text-muted-light font-medium uppercase tracking-wide">Ubicación</p>
                <p className="text-sm text-heading font-medium">Ciudad de México, México</p>
              </div>
            </div>
          </div>
        </section>
      </GlassCard>
    </main>
  );
}
