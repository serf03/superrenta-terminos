import { useEffect, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

const contactEmail = 'developer@arkqc.app'

function Faq({ question, children }: { question: string; children: ReactNode }) {
  return (
    <section className="border-t border-[#e6e1da] py-7 first:border-t-0 first:pt-0">
      <h2 className="text-lg font-bold tracking-[-0.3px] text-[#2b231c]">{question}</h2>
      <div className="mt-2 space-y-3 text-[15px] leading-7 text-[#5f5246]">{children}</div>
    </section>
  )
}

export default function UbichatSupportPage() {
  useEffect(() => {
    const previousTitle = document.title
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    const previousDescription = description?.content

    document.title = 'Soporte · ubiChat'
    if (description) description.content = 'Ayuda y contacto de ubiChat.'

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
          <Link to="/ubichat" className="text-xs font-bold text-[#7c5a3a] hover:underline">
            Privacidad
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 pb-16 pt-10 sm:px-8 sm:pt-14">
        <h1 className="text-[32px] font-extrabold leading-tight tracking-[-1px] sm:text-[40px]">Soporte</h1>
        <p className="mt-4 text-[16px] leading-7 text-[#5f5246]">
          ¿Algo no funciona o tienes una duda? Escríbenos a{' '}
          <a href={`mailto:${contactEmail}`} className="font-semibold text-[#7c5a3a] underline underline-offset-4">
            {contactEmail}
          </a>{' '}
          y te respondemos lo antes posible.
        </p>

        <article className="mt-10 rounded-[24px] border border-white/80 bg-white/85 px-6 py-8 shadow-[0_20px_60px_rgba(43,35,28,0.08)] sm:px-10 sm:py-10">
          <Faq question="No me llega el código por SMS">
            <p>Comprueba que el número está completo y con el prefijo de tu país. Espera un minuto antes de pedir otro código: por seguridad hay un límite de envíos cada pocos minutos.</p>
          </Faq>

          <Faq question="¿Cómo elimino mi cuenta?">
            <p>Abre tu perfil y pulsa «Eliminar cuenta». Se borran tu cuenta y tus datos del servidor y los de ese teléfono. Los mensajes que ya enviaste siguen en los teléfonos de otras personas.</p>
          </Faq>

          <Faq question="¿Cómo dejo de compartir mi ubicación?">
            <p>Puedes detener cualquier sesión de ubicación desde la conversación en la que la iniciaste. Solo se comparte mientras tú lo decides y durante el tiempo que elegiste.</p>
          </Faq>

          <Faq question="¿Cómo uso ubiChat en otro dispositivo?">
            <p>En el dispositivo donde ya tienes sesión, genera un código QR de vinculación. Escanéalo con el otro dispositivo para abrir sesión en la misma cuenta.</p>
          </Faq>

          <Faq question="Quiero informar de un problema">
            <p>Escríbenos con el modelo de tu iPhone, la versión de iOS y los pasos para repetir el problema. Si puedes, añade una captura de pantalla. No nos envíes contraseñas ni códigos de verificación.</p>
          </Faq>
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
