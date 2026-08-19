import { useMemo } from 'react'

const STORE_URL = 'https://apps.apple.com/app/id6793609101'

function compact(value: string | null, fallback: string) {
  return (value ?? '').replace(/\s+/g, ' ').trim().slice(0, 80) || fallback
}

export default function YaCasiSharedAlertPage() {
  const query = useMemo(() => new URLSearchParams(window.location.search), [])
  const name = compact(query.get('note') || query.get('name'), 'Destino compartido')
  const radius = Math.min(2_000, Math.max(100, Number(query.get('radius')) || 500))
  const appLink = `cerca://shared-alert?${query.toString()}`

  return (
    <main className="shared-alert-page">
      <div className="shared-alert-glow shared-alert-glow-one" />
      <div className="shared-alert-glow shared-alert-glow-two" />
      <section className="shared-alert-card" aria-labelledby="shared-alert-title">
        <div className="shared-alert-mark" aria-hidden="true">
          <span>✓</span>
        </div>
        <p className="shared-alert-eyebrow">YA CASI · ALERTA COMPARTIDA</p>
        <h1 id="shared-alert-title">{name}</h1>
        <p className="shared-alert-copy">
          Alguien te compartió una alerta de proximidad configurada a {radius} metros.
          Revísala en Ya Casi antes de agregarla.
        </p>
        <div className="shared-alert-actions">
          <a className="shared-alert-primary" href={appLink}>
            Abrir en Ya Casi
          </a>
          <a className="shared-alert-secondary" href={STORE_URL}>
            Descargar la app
          </a>
        </div>
        <p className="shared-alert-privacy">
          La alerta no se activa automáticamente. Tú confirmas la ubicación, permisos y
          configuración dentro de la app.
        </p>
      </section>
    </main>
  )
}
