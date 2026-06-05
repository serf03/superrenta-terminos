const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="border-t border-glass-border bg-white/70 backdrop-blur-xl mt-16">
      <div className="mx-auto max-w-3xl px-6 py-8 sm:px-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-sm text-muted">
            &copy; {year} SuperRenta. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm text-muted">
            <a href="#" className="hover:text-heading transition-colors duration-200">
              Aviso de Privacidad
            </a>
            <a href="mailto:soporte@superrenta.app" className="hover:text-heading transition-colors duration-200">
              Contacto
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
