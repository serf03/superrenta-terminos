import { useEffect, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

const updatedAt = '27 de octubre de 2026'
const contactEmail = 'developer@arkqc.app'

function Section({ id, number, title, children }: { id: string; number: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-[#e6e1da] py-9 first:border-t-0 first:pt-0">
      <div className="mb-5 flex items-start gap-4">
        <span className="flex h-8 min-w-8 items-center justify-center rounded-full bg-[#f1e9dd] px-2 text-xs font-bold text-[#7c5a3a]">
          {number}
        </span>
        <h2 className="pt-0.5 text-xl font-bold tracking-[-0.45px] text-[#2b231c] sm:text-[22px]">{title}</h2>
      </div>
      <div className="space-y-4 text-[15px] leading-7 text-[#5f5246] sm:pl-12">{children}</div>
    </section>
  )
}

function BulletList({ children }: { children: ReactNode }) {
  return <ul className="list-disc space-y-2.5 pl-5 marker:text-[#b89c7c]">{children}</ul>
}

export default function UbichatPrivacyPage() {
  useEffect(() => {
    const previousTitle = document.title
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    const previousDescription = description?.content

    document.title = 'Política de privacidad · ubiChat'
    if (description) {
      description.content = 'Qué datos trata ubiChat, para qué, durante cuánto tiempo y cómo ejercer tus derechos.'
    }

    return () => {
      document.title = previousTitle
      if (description && previousDescription) description.content = previousDescription
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#f5f2ee] text-[#2b231c]">
      <header className="sticky top-0 z-50 border-b border-[#e6e1da] bg-[#f5f2ee]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-5 sm:px-8">
          <Link to="/ubichat" className="text-[15px] font-bold tracking-[-0.2px] text-[#2b231c]">
            ubiChat
          </Link>
          <a href={`mailto:${contactEmail}`} className="text-xs font-bold text-[#7c5a3a] hover:underline">
            Contacto
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 pb-16 pt-10 sm:px-8 sm:pt-14">
        <h1 className="text-[32px] font-extrabold leading-tight tracking-[-1px] sm:text-[40px]">Política de privacidad</h1>
        <p className="mt-3 text-sm text-[#7b6f64]">ubiChat · Última actualización: {updatedAt}</p>

        <p className="mt-8 text-[16px] leading-7 text-[#5f5246]">
          ubiChat es una app de mensajería privada. Esta política explica qué datos tratamos, para qué, cuánto tiempo los conservamos y cómo puedes ejercer tus derechos.
        </p>

        <nav aria-label="Secciones" className="my-8 flex gap-2 overflow-x-auto pb-2 text-xs font-bold text-[#6b5b4d]">
          {[
            ['responsable', 'Responsable'],
            ['cifrado', 'Cifrado'],
            ['datos', 'Datos'],
            ['proveedores', 'Proveedores'],
            ['derechos', 'Derechos'],
          ].map(([id, label]) => (
            <a key={id} href={`#${id}`} className="whitespace-nowrap rounded-full border border-[#dcd3c8] bg-white/70 px-4 py-2 hover:border-[#b89c7c]">
              {label}
            </a>
          ))}
        </nav>

        <article className="rounded-[24px] border border-white/80 bg-white/85 px-6 py-8 shadow-[0_20px_60px_rgba(43,35,28,0.08)] sm:px-10 sm:py-10">
          <Section id="responsable" number="01" title="Quién es responsable">
            <p>
              El responsable del tratamiento es <strong className="text-[#2b231c]">ARKQC</strong>. Para cualquier cuestión sobre privacidad:{' '}
              <a href={`mailto:${contactEmail}`} className="font-semibold text-[#7c5a3a] underline underline-offset-4">
                {contactEmail}
              </a>
              .
            </p>
          </Section>

          <Section id="cifrado" number="02" title="Mensajes cifrados de extremo a extremo">
            <p>
              El contenido de tus mensajes se cifra en tu dispositivo antes de salir de él. Solo tú y la persona con la que hablas podéis leerlo. Nuestro servidor no puede descifrar los mensajes, no guarda el historial de tus conversaciones y no tiene las claves privadas de tus dispositivos.
            </p>
          </Section>

          <Section id="datos" number="03" title="Qué datos tratamos">
            <BulletList>
              <li>
                <strong className="text-[#2b231c]">Número de teléfono:</strong> para crear la cuenta y verificarla con un código SMS. En el servidor solo se guarda una huella (hash), no el número en claro.
              </li>
              <li>
                <strong className="text-[#2b231c]">Nombre, usuario y foto de perfil:</strong> para mostrarte a tus contactos y poder encontrarte por usuario.
              </li>
              <li>
                <strong className="text-[#2b231c]">Claves públicas de cada dispositivo:</strong> para permitir el cifrado de extremo a extremo. Las claves privadas nunca salen del dispositivo.
              </li>
              <li>
                <strong className="text-[#2b231c]">Mensajes y adjuntos cifrados:</strong> se guardan en el servidor solo hasta que se entregan, como máximo 14 días.
              </li>
              <li>
                <strong className="text-[#2b231c]">Ubicación compartida:</strong> solo si decides compartirla con una persona concreta, durante el tiempo que elijas. Las coordenadas van cifradas; el servidor guarda únicamente los datos de la sesión (quién comparte, cuándo empieza y cuándo termina).
              </li>
              <li>
                <strong className="text-[#2b231c]">Contactos del teléfono:</strong> para mostrarte cuáles de tus contactos ya usan ubiChat. Los números se comparan en el servidor y no se guardan los que no coinciden.
              </li>
              <li>
                <strong className="text-[#2b231c]">Token de notificaciones:</strong> para avisarte de nuevos mensajes.
              </li>
            </BulletList>
            <p className="rounded-xl border-l-[3px] border-[#dcd3c8] pl-4 text-[#7b6f64]">
              No vendemos datos, no los usamos para publicidad y no hay publicidad dentro de la app.
            </p>
          </Section>

          <Section id="finalidades" number="04" title="Para qué los usamos">
            <BulletList>
              <li>
                <strong className="text-[#2b231c]">Prestar el servicio:</strong> crear tu cuenta, entregar mensajes y permitir la ubicación compartida que tú inicias.
              </li>
              <li>
                <strong className="text-[#2b231c]">Seguridad:</strong> prevenir abusos, limitar intentos de acceso y proteger la cuenta.
              </li>
              <li>
                <strong className="text-[#2b231c]">Cumplimiento legal:</strong> cuando la ley nos lo exija.
              </li>
            </BulletList>
          </Section>

          <Section id="conservacion" number="05" title="Cuánto tiempo los conservamos">
            <BulletList>
              <li>
                <strong className="text-[#2b231c]">Cuenta:</strong> mientras la tengas activa. Si la eliminas, borramos tus datos del servidor.
              </li>
              <li>
                <strong className="text-[#2b231c]">Mensajes y adjuntos pendientes de entrega:</strong> como máximo 14 días.
              </li>
              <li>
                <strong className="text-[#2b231c]">Sesiones de ubicación:</strong> hasta que caducan o las detienes.
              </li>
            </BulletList>
            <p className="rounded-xl border-l-[3px] border-[#dcd3c8] pl-4 text-[#7b6f64]">
              Eliminar un mensaje en tu dispositivo no lo elimina en el dispositivo de la otra persona. Eso solo ocurre si la otra persona también lo elimina.
            </p>
          </Section>

          <Section id="proveedores" number="06" title="Proveedores que tratan datos por nuestra cuenta">
            <BulletList>
              <li>
                <strong className="text-[#2b231c]">Twilio</strong> (verificación por SMS): recibe tu número y el código para poder enviarte el SMS.
              </li>
              <li>
                <strong className="text-[#2b231c]">Expo</strong> (notificaciones push): recibe el token de notificaciones y el contenido mínimo para avisarte. Nunca el contenido de tus mensajes.
              </li>
              <li>
                <strong className="text-[#2b231c]">[Proveedor de alojamiento del servidor]</strong>: aloja el servidor, donde solo hay datos cifrados o huellas.
              </li>
            </BulletList>
            <p>No compartimos tus datos con terceros para publicidad ni para analítica. Algunos proveedores pueden tratar datos fuera de tu país, con las garantías que exige la normativa aplicable.</p>
          </Section>

          <Section id="derechos" number="07" title="Tus derechos">
            <p>
              Puedes pedirnos acceder a tus datos, corregirlos, eliminarlos, limitar su tratamiento u oponerte a él, y pedir una copia en formato portable. Para ejercerlos escribe a{' '}
              <a href={`mailto:${contactEmail}`} className="font-semibold text-[#7c5a3a] underline underline-offset-4">
                {contactEmail}
              </a>
              . Te responderemos en el plazo que marque la normativa aplicable.
            </p>
            <p>
              Puedes también eliminar tu cuenta desde la app (Perfil). Al hacerlo, borramos tus datos del servidor; los mensajes que ya estén en el dispositivo de otras personas no se borran de ahí.
            </p>
          </Section>

          <Section id="seguridad" number="08" title="Seguridad, menores y cambios">
            <p>
              Ciframos los mensajes de extremo a extremo, las comunicaciones usan HTTPS y el servidor guarda solo lo necesario. Ningún sistema es perfecto: si detectamos una brecha que te afecte, te lo comunicaremos.
            </p>
            <p>ubiChat no está dirigida a menores de 13 años. Si detectamos una cuenta de un menor, la eliminaremos.</p>
            <p>Si cambiamos algo importante, te avisaremos dentro de la app antes de que entre en vigor. La versión vigente siempre estará en esta página.</p>
          </Section>
        </article>
      </main>

      <footer className="border-t border-[#e6e1da]">
        <div className="mx-auto max-w-3xl px-5 py-8 text-xs text-[#7b6f64] sm:px-8">
          <p>&copy; {new Date().getFullYear()} ARKQC · ubiChat</p>
        </div>
      </footer>
    </div>
  )
}
