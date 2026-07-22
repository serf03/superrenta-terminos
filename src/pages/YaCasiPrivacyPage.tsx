import { useEffect, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

const updatedAt = '22 de julio de 2026'
const contactEmail = 'developer@arkqc.app'

function ShieldIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <path
        d="M12 3 5.5 5.8v5.4c0 4.3 2.7 8.1 6.5 9.8 3.8-1.7 6.5-5.5 6.5-9.8V5.8L12 3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <path d="M20 10c0 5.4-8 11-8 11S4 15.4 4 10a8 8 0 1 1 16 0Z" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}

function DeviceIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <rect x="6.5" y="2.5" width="11" height="19" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M10 18.5h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function ReceiptIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <path d="M6 3.5h12v17l-3-1.8-3 1.8-3-1.8-3 1.8v-17Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 8h6M9 12h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function Feature({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-[#dceae6] bg-white/80 p-5">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#e2f4ef] text-[#087f6c]">
        {icon}
      </div>
      <h3 className="text-[15px] font-bold tracking-[-0.2px] text-[#102a26]">{title}</h3>
      <p className="mt-1.5 text-sm leading-6 text-[#536b66]">{children}</p>
    </div>
  )
}

function Section({ id, number, title, children }: { id: string; number: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-[#e2ece9] py-9 first:border-t-0 first:pt-0">
      <div className="mb-5 flex items-start gap-4">
        <span className="flex h-8 min-w-8 items-center justify-center rounded-full bg-[#e2f4ef] px-2 text-xs font-bold text-[#087f6c]">
          {number}
        </span>
        <h2 className="pt-0.5 text-xl font-bold tracking-[-0.45px] text-[#102a26] sm:text-[22px]">{title}</h2>
      </div>
      <div className="space-y-4 pl-0 text-[15px] leading-7 text-[#455e59] sm:pl-12">{children}</div>
    </section>
  )
}

function BulletList({ children }: { children: ReactNode }) {
  return <ul className="space-y-2.5 pl-5 marker:text-[#20a88f]">{children}</ul>
}

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="font-semibold text-[#087f6c] underline decoration-[#93d7c9] underline-offset-4 transition-colors hover:text-[#075f53]"
    >
      {children}
    </a>
  )
}

export default function YaCasiPrivacyPage() {
  useEffect(() => {
    const previousTitle = document.title
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    const previousDescription = description?.content

    document.title = 'Política de Privacidad - Ya Casi'
    if (description) {
      description.content = 'Política de privacidad de Ya Casi, la app de alertas privadas de proximidad.'
    }

    return () => {
      document.title = previousTitle
      if (description && previousDescription) description.content = previousDescription
    }
  }, [])

  return (
    <div className="yacasi-page relative min-h-screen overflow-hidden text-[#213d38]">
      <div aria-hidden="true" className="yacasi-grid pointer-events-none absolute inset-0" />

      <header className="sticky top-0 z-50 border-b border-[#dceae6]/80 bg-[#f6fbf9]/88 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-5 sm:px-8">
          <Link to="/YaCasi" className="group flex items-center gap-3" aria-label="Inicio de privacidad de Ya Casi">
            <span className="flex h-9 w-9 items-center justify-center rounded-[13px] bg-[#087f6c] text-sm font-extrabold text-white shadow-[0_8px_22px_rgba(8,127,108,0.22)] transition-transform group-hover:-translate-y-0.5">
              Y
            </span>
            <span>
              <span className="block text-[15px] font-bold leading-4 tracking-[-0.2px] text-[#102a26]">Ya Casi</span>
              <span className="block text-[11px] font-medium text-[#68817b]">Privacidad</span>
            </span>
          </Link>
          <a
            href={`mailto:${contactEmail}`}
            className="rounded-full border border-[#cfe3de] bg-white/75 px-4 py-2 text-xs font-bold text-[#087f6c] transition-colors hover:bg-white"
          >
            Contacto
          </a>
        </div>
      </header>

      <main className="relative mx-auto max-w-4xl px-5 pb-16 pt-10 sm:px-8 sm:pt-16">
        <section className="yacasi-reveal relative overflow-hidden rounded-[30px] border border-white/85 bg-[#0d332d] px-6 py-9 text-white shadow-[0_28px_80px_rgba(7,54,46,0.22)] sm:px-10 sm:py-12">
          <div aria-hidden="true" className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#25c5a5]/25 blur-3xl" />
          <div aria-hidden="true" className="absolute -bottom-32 left-12 h-64 w-64 rounded-full bg-[#ff8a3d]/15 blur-3xl" />
          <div className="relative max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#91e4d3]">
              <ShieldIcon /> Política de privacidad
            </div>
            <h1 className="max-w-xl text-[36px] font-extrabold leading-[1.02] tracking-[-1.5px] sm:text-[52px]">
              Tu ubicación te pertenece.
            </h1>
            <p className="mt-5 max-w-xl text-[16px] leading-7 text-[#c5ddd8] sm:text-[17px]">
              Ya Casi convierte la proximidad en una alerta útil sin crear una cuenta ni guardar tus recorridos en nuestros servidores.
            </p>
            <p className="mt-7 text-xs font-medium text-[#8fb5ad]">Última actualización: {updatedAt}</p>
          </div>
        </section>

        <section className="yacasi-reveal yacasi-reveal-delay mt-6 grid gap-3 sm:grid-cols-3">
          <Feature icon={<DeviceIcon />} title="Datos locales">
            Tus zonas, notas y alertas se guardan en este dispositivo.
          </Feature>
          <Feature icon={<LocationIcon />} title="Ubicación con propósito">
            Se utiliza para avisarte al acercarte al destino que elegiste.
          </Feature>
          <Feature icon={<ShieldIcon />} title="Sin publicidad">
            No vendemos tu información ni realizamos seguimiento publicitario.
          </Feature>
        </section>

        <nav aria-label="Secciones de la política" className="my-7 flex gap-2 overflow-x-auto pb-2 text-xs font-bold text-[#45645e]">
          {[
            ['datos', 'Datos'],
            ['ubicacion', 'Ubicación'],
            ['proveedores', 'Proveedores'],
            ['suscripcion', 'Suscripción'],
            ['controles', 'Tus controles'],
          ].map(([id, label]) => (
            <a key={id} href={`#${id}`} className="whitespace-nowrap rounded-full border border-[#d4e6e1] bg-white/70 px-4 py-2.5 transition-colors hover:border-[#9fd2c7] hover:text-[#087f6c]">
              {label}
            </a>
          ))}
        </nav>

        <article className="yacasi-card rounded-[30px] border border-white/90 bg-white/92 px-6 py-9 backdrop-blur-sm sm:px-10 sm:py-11">
          <Section id="alcance" number="01" title="Alcance y responsable">
            <p>
              Esta política explica cómo la aplicación móvil <strong className="text-[#173d36]">Ya Casi</strong>, operada por ARKQC, trata la información necesaria para ofrecer alertas de proximidad.
            </p>
            <p>
              Ya Casi funciona sin registro. No solicitamos tu nombre, correo electrónico, teléfono ni una contraseña para usar la aplicación o activar Ya Casi Plus.
            </p>
          </Section>

          <Section id="datos" number="02" title="Información que utiliza la app">
            <BulletList>
              <li><strong className="text-[#173d36]">Ubicación:</strong> ubicación aproximada o precisa, en primer plano y, cuando lo autorizas, en segundo plano.</li>
              <li><strong className="text-[#173d36]">Zonas y preferencias:</strong> coordenadas de destino, radio elegido, nota de la alarma, horarios, repetición, sonido y estado de activación.</li>
              <li><strong className="text-[#173d36]">Historial local:</strong> eventos de llegada, detención o aplazamiento de una alerta.</li>
              <li><strong className="text-[#173d36]">Permisos del sistema:</strong> estado de ubicación, notificaciones, sonido, alarmas y, cuando el sistema lo requiera, movimiento.</li>
              <li><strong className="text-[#173d36]">Suscripción:</strong> producto adquirido, estado de acceso y un identificador seudónimo de la instalación. No recibimos los datos completos de tu tarjeta.</li>
            </BulletList>
          </Section>

          <Section id="ubicacion" number="03" title="Cómo usamos la ubicación">
            <p>
              La ubicación se usa para mostrar tu posición, buscar o marcar un destino, calcular la distancia y detectar la entrada o salida de una zona. El permiso en segundo plano permite que la alerta funcione con la pantalla bloqueada o la aplicación cerrada.
            </p>
            <p>
              El motor de proximidad funciona mediante las capacidades de geocercas del sistema operativo. Ya Casi no crea un historial continuo de tus recorridos ni envía tu ubicación a servidores propios para publicidad o perfilado.
            </p>
            <p>
              Las búsquedas de lugares y la conversión de coordenadas en nombres pueden ser procesadas por los servicios de ubicación y mapas de Apple o Google, según tu dispositivo.
            </p>
          </Section>

          <Section id="almacenamiento" number="04" title="Almacenamiento y conservación">
            <p>
              Las zonas, notas, horarios e historial de alertas se almacenan localmente en una base de datos protegida dentro de la aplicación. Permanecen hasta que los eliminas desde Ya Casi o desinstalas la app.
            </p>
            <p>
              Los registros de compra y suscripción son conservados por la tienda y por RevenueCat durante los plazos necesarios para operar, restaurar y verificar tu acceso, cumplir obligaciones legales y resolver incidencias.
            </p>
          </Section>

          <Section id="proveedores" number="05" title="Proveedores necesarios">
            <p>Utilizamos únicamente servicios necesarios para que la app funcione:</p>
            <BulletList>
              <li><ExternalLink href="https://www.apple.com/legal/privacy/">Apple</ExternalLink>, para ubicación, mapas, notificaciones, alarmas y compras en dispositivos iOS.</li>
              <li><ExternalLink href="https://policies.google.com/privacy?hl=es-419">Google</ExternalLink>, para ubicación, mapas y Google Play en dispositivos Android.</li>
              <li><ExternalLink href="https://www.revenuecat.com/privacy/">RevenueCat</ExternalLink>, para verificar, restaurar y administrar el estado de Ya Casi Plus.</li>
            </BulletList>
            <p>
              Estos proveedores pueden procesar identificadores técnicos, dirección IP, información del dispositivo y datos de transacción conforme a sus propias políticas. Algunos tratamientos pueden realizarse fuera de tu país.
            </p>
          </Section>

          <Section id="compartir" number="06" title="Publicidad, seguimiento y divulgación">
            <p>
              Ya Casi no incluye anuncios, no vende ni alquila datos personales y no utiliza tu ubicación para seguimiento entre aplicaciones. Solo se comunica información limitada con los proveedores anteriores para prestar la función solicitada, procesar una compra, cumplir la ley o proteger la seguridad del servicio.
            </p>
          </Section>

          <Section id="suscripcion" number="07" title="Ya Casi Plus">
            <div className="rounded-2xl border border-[#cfe8e1] bg-[#eff9f6] p-5">
              <div className="flex items-center gap-3 text-[#087f6c]">
                <ReceiptIcon />
                <h3 className="font-bold text-[#153c35]">Activación mensual</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-[#506b65]">
                El plan gratuito permite guardar hasta 2 zonas. Ya Casi Plus amplía el límite hasta 20 zonas mediante una suscripción mensual con renovación automática.
              </p>
            </div>
            <p>
              El cobro lo realiza Apple App Store o Google Play. La suscripción se renueva automáticamente salvo que la canceles desde la tienda antes de la siguiente fecha de renovación. Puedes restaurar compras sin crear una cuenta dentro de Ya Casi.
            </p>
          </Section>

          <Section id="controles" number="08" title="Tus controles y derechos">
            <BulletList>
              <li>Puedes revocar la ubicación, las notificaciones o el movimiento desde los ajustes del dispositivo.</li>
              <li>Puedes eliminar una zona individual o usar <strong className="text-[#173d36]">Ajustes → Datos locales → Eliminar todo</strong>.</li>
              <li>Puedes administrar o cancelar Ya Casi Plus desde la configuración de suscripciones de la tienda.</li>
              <li>Puedes solicitar información, corrección o eliminación de datos asociados a la suscripción escribiéndonos al correo indicado abajo.</li>
            </BulletList>
            <p>Al desactivar permisos esenciales, algunas alertas pueden dejar de funcionar o perder precisión.</p>
          </Section>

          <Section id="menores" number="09" title="Menores de edad">
            <p>
              Ya Casi no está dirigida específicamente a menores de 13 años ni busca recopilar conscientemente sus datos personales. Si crees que un menor nos proporcionó información, contáctanos para revisar la situación.
            </p>
          </Section>

          <Section id="seguridad" number="10" title="Seguridad y cambios">
            <p>
              Aplicamos medidas técnicas razonables para proteger la información local y limitamos las conexiones externas a los servicios necesarios. Ningún método de almacenamiento o transmisión puede garantizar seguridad absoluta.
            </p>
            <p>
              Podemos actualizar esta política cuando cambien las funciones, los proveedores o las obligaciones legales. Publicaremos la nueva fecha al inicio de esta página.
            </p>
          </Section>

          <Section id="contacto" number="11" title="Contacto">
            <p>Para preguntas o solicitudes de privacidad, escríbenos a:</p>
            <a
              href={`mailto:${contactEmail}`}
              className="inline-flex items-center rounded-2xl border border-[#cde5df] bg-[#eff9f6] px-5 py-3 font-bold text-[#087f6c] transition-colors hover:bg-[#e4f5f0]"
            >
              {contactEmail}
            </a>
          </Section>
        </article>
      </main>

      <footer className="relative border-t border-[#d8e7e3] bg-white/50">
        <div className="mx-auto flex max-w-4xl flex-col gap-3 px-5 py-8 text-xs text-[#6b817c] sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>&copy; {new Date().getFullYear()} ARKQC · Ya Casi</p>
          <div className="flex items-center gap-5">
            <a href="#contacto" className="font-semibold hover:text-[#087f6c]">Contacto</a>
            <Link to="/" className="font-semibold hover:text-[#087f6c]">Legal de SuperRenta</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
