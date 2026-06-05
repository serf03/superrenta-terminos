export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-stone-200 bg-white mt-12">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-sm text-stone-500">
            &copy; {year} SuperRenta. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm text-stone-500">
            <a href="#" className="hover:text-amber-600 transition-colors">Aviso de Privacidad</a>
            <a href="#" className="hover:text-amber-600 transition-colors">Contacto</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
