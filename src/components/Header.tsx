export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-glass-border">
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <div className="flex items-center justify-center h-16 relative">
          <div className="absolute left-0">
            <a
              href="https://superrenta.app"
              className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#D76A49] text-white font-bold text-sm shadow-sm hover:opacity-90 transition-opacity"
            >
              S
            </a>
          </div>
          <div className="text-center">
            <h1 className="text-[17px] font-bold text-heading tracking-[-0.3px]">
              Términos y Condiciones
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}
