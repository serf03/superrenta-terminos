export default function Header() {
  return (
    <header className="bg-white border-b border-stone-200">
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-white font-bold text-lg">
            S
          </div>
          <div>
            <h1 className="text-xl font-bold text-stone-900">SuperRenta</h1>
            <p className="text-sm text-stone-500">Términos y Condiciones</p>
          </div>
        </div>
      </div>
    </header>
  );
}
