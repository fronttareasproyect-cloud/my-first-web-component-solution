import { LitElement, css, html } from 'lit';
import { recentTransfers, selectedAccount } from '../data/transfer-fixtures.js';
import './transfer-table.js';

const downloadIcon = html`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 3v11m0 0 4-4m-4 4-4-4M5 17v4h14v-4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
  </svg>
`;

const calendarIcon = html`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M7 3v3m10-3v3M4.5 9.5h15M6 5h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" fill="none" stroke="currentColor" stroke-width="2"></path>
    <path d="M8 13h2m4 0h2M8 17h2m4 0h2" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"></path>
  </svg>
`;

const filterIcon = html`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 7h11M4 12h8M4 17h5m9-10 2 2 3-4m-5 9 2 2 3-4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
  </svg>
`;

export class TransferDashboard extends LitElement {
  static properties = {
    query: { type: String },
  };

  constructor() {
    super();
    this.query = '';
  }

  get _filteredRows() {
    const normalizedQuery = this.query.trim().toLocaleLowerCase('es-ES');

    if (!normalizedQuery) {
      return recentTransfers;
    }

    return recentTransfers.filter((row) =>
      [
        row.concept,
        row.payments,
        row.beneficiary,
        row.beneficiaryAccount,
        row.paymentType,
        row.status,
        row.amount.toString(),
      ]
        .filter(Boolean)
        .some((value) => value.toLocaleLowerCase('es-ES').includes(normalizedQuery)),
    );
  }

  render() {
    return html`
      <section class="dashboard" aria-labelledby="transfer-title">
        <nav class="tabs" aria-label="Tipo de transferencia">
          <a class="tab active" href="#" aria-current="page">Últimas transferencias</a>
          <a class="tab" href="#">Próximas transferencias</a>
        </nav>

        <article class="card">
          <header class="account-header">
            <h1 id="transfer-title">Últimas transferencias de</h1>
            <button class="account-picker" type="button" aria-label="Cambiar cuenta">
              <span>${selectedAccount}</span>
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <path d="m5 7 5 5 5-5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.4"></path>
              </svg>
            </button>
          </header>

          <div class="notice" role="note">
            <span class="notice-icon" aria-hidden="true">i</span>
            <p>
              Se muestran resultados de los últimos 90 días. Para consultas anteriores, por normativa europea,
              es necesario introducir un código de seguridad.
            </p>
          </div>

          <div class="toolbar">
            <div class="downloads">
              <button type="button">${downloadIcon}<span>Descargar transferencias</span></button>
              <button type="button">${downloadIcon}<span>Descargar justificantes</span></button>
            </div>

            <div class="filters" role="search">
              <label class="search">
                <span class="sr-only">Buscar beneficiario o concepto</span>
                <input
                  type="search"
                  placeholder="Buscar beneficiario/concepto"
                  .value=${this.query}
                  @input=${this._handleSearch}
                />
              </label>

              <div class="date-range" aria-label="Rango de fechas">
                <label>
                  <span>Desde</span>
                  <input inputmode="numeric" placeholder="dd/mm/aaaa" aria-label="Fecha desde" />
                </label>
                <span class="divider" aria-hidden="true"></span>
                <label>
                  <span>Hasta</span>
                  <input inputmode="numeric" placeholder="dd/mm/aaaa" aria-label="Fecha hasta" />
                </label>
                <button class="calendar" type="button" aria-label="Abrir calendario">${calendarIcon}</button>
              </div>

              <button class="more-filters" type="button">${filterIcon}<span>Ver más filtros</span></button>
              <button class="search-button" type="button">Buscar</button>
            </div>
          </div>

          <transfer-table .rows=${this._filteredRows} total="161"></transfer-table>
        </article>
      </section>
    `;
  }

  _handleSearch(event) {
    this.query = event.target.value;
  }

  static styles = css`
    :host {
      --bbva-blue: #001b7f;
      --bbva-navy: #070e57;
      --bbva-light-blue: #d9ecfb;
      --bbva-text-muted: #666a73;
      --border: #d8dbe2;

      color: var(--bbva-navy);
      display: block;
      font-family:
        'Benton Sans',
        'BBVA Web',
        'Segoe UI',
        sans-serif;
      min-height: 100svh;
      padding: 1.25rem;
    }

    .dashboard {
      margin: 0 auto;
      max-width: 119rem;
    }

    .tabs {
      border-bottom: 0.125rem solid #dfe3ea;
      display: flex;
      gap: 2.4rem;
      margin-bottom: 1.9rem;
    }

    .tab {
      color: var(--bbva-blue);
      font-size: 1rem;
      font-weight: 700;
      padding: 0 0 0.95rem;
      position: relative;
      text-decoration: none;
    }

    .tab.active::after {
      background: var(--bbva-navy);
      bottom: -0.125rem;
      content: '';
      height: 0.125rem;
      left: 0;
      position: absolute;
      right: 0;
    }

    .card {
      background: #ffffff;
      border-radius: 1.4rem;
      box-shadow: 0 1.5rem 4rem rgba(7, 14, 87, 0.08);
      padding: 4rem 2.2rem 1.1rem;
    }

    .account-header {
      align-items: center;
      display: flex;
      flex-wrap: wrap;
      gap: 1.1rem;
      margin-bottom: 1.9rem;
    }

    h1 {
      font-size: 1.25rem;
      font-weight: 400;
      letter-spacing: -0.01em;
      margin: 0;
    }

    .account-picker {
      align-items: center;
      background: transparent;
      border: 0;
      color: var(--bbva-blue);
      cursor: pointer;
      display: inline-flex;
      font: inherit;
      font-size: 1rem;
      font-weight: 700;
      gap: 1.25rem;
      padding: 0;
    }

    .account-picker svg {
      height: 1.25rem;
      width: 1.25rem;
    }

    .notice {
      align-items: center;
      background: var(--bbva-light-blue);
      border-radius: 1rem;
      display: flex;
      gap: 1.3rem;
      margin-bottom: 1.55rem;
      padding: 1.55rem 2.3rem;
    }

    .notice p {
      font-size: 1rem;
      line-height: 1.45;
      margin: 0;
    }

    .notice-icon {
      align-items: center;
      background: var(--bbva-navy);
      border-radius: 999px;
      color: #ffffff;
      display: inline-flex;
      flex: 0 0 auto;
      font-weight: 700;
      height: 2rem;
      justify-content: center;
      width: 2rem;
    }

    .toolbar {
      display: grid;
      gap: 1.3rem;
      margin-bottom: 0.4rem;
    }

    .downloads,
    .filters {
      align-items: center;
      display: flex;
      flex-wrap: wrap;
      gap: 1rem 1.5rem;
    }

    .downloads button,
    .more-filters {
      align-items: center;
      background: transparent;
      border: 0;
      color: var(--bbva-blue);
      cursor: pointer;
      display: inline-flex;
      font: inherit;
      font-weight: 700;
      gap: 0.7rem;
      padding: 0;
    }

    svg {
      height: 1.4rem;
      width: 1.4rem;
    }

    .filters {
      display: grid;
      grid-template-columns: minmax(16rem, 27rem) minmax(22rem, 30rem) auto auto;
      margin-bottom: 0.35rem;
    }

    input {
      background: #ffffff;
      border: 0;
      color: var(--bbva-navy);
      font: inherit;
      min-width: 0;
      outline: 0;
      width: 100%;
    }

    input::placeholder {
      color: #666a73;
      opacity: 1;
    }

    .search,
    .date-range {
      border: 0.125rem solid #4c5873;
      border-radius: 0.55rem;
      min-height: 3.25rem;
    }

    .search {
      align-items: center;
      display: flex;
      padding: 0 1rem;
    }

    .date-range {
      align-items: center;
      display: grid;
      grid-template-columns: 1fr auto 1fr auto;
      overflow: hidden;
      padding: 0 0.8rem 0 1rem;
    }

    .date-range label {
      display: grid;
      gap: 0.1rem;
      min-width: 0;
    }

    .date-range label span {
      color: var(--bbva-text-muted);
      font-size: 0.78rem;
      line-height: 1;
    }

    .divider {
      background: #c6cad2;
      height: 2.4rem;
      margin: 0 1rem;
      width: 0.0625rem;
    }

    .calendar {
      background: transparent;
      border: 0;
      color: var(--bbva-blue);
      cursor: pointer;
      display: inline-flex;
      padding: 0;
    }

    .more-filters {
      justify-self: center;
      min-height: 3.25rem;
    }

    .search-button {
      background: var(--bbva-blue);
      border: 0;
      border-radius: 0.55rem;
      color: #ffffff;
      cursor: pointer;
      font: inherit;
      font-weight: 700;
      min-height: 3.25rem;
      padding: 0 2rem;
    }

    button:focus-visible,
    input:focus-visible {
      outline: 0.125rem solid #1973b8;
      outline-offset: 0.18rem;
    }

    .sr-only {
      border: 0;
      clip: rect(0 0 0 0);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      white-space: nowrap;
      width: 1px;
    }

    @media (max-width: 1100px) {
      .filters {
        grid-template-columns: 1fr 1fr;
      }
    }

    @media (max-width: 760px) {
      :host {
        padding: 0.8rem;
      }

      .tabs {
        gap: 1.25rem;
        overflow-x: auto;
      }

      .card {
        border-radius: 1rem;
        padding: 1.5rem 1rem 1rem;
      }

      .notice {
        align-items: flex-start;
        padding: 1rem;
      }

      .filters {
        grid-template-columns: 1fr;
      }

      .date-range {
        grid-template-columns: 1fr;
        gap: 0.75rem;
        padding: 0.85rem 1rem;
      }

      .divider {
        display: none;
      }

      .calendar {
        justify-self: start;
      }

      .more-filters {
        justify-self: start;
      }

      .search-button {
        width: 100%;
      }
    }
  `;
}

if (!customElements.get('transfer-dashboard')) {
  customElements.define('transfer-dashboard', TransferDashboard);
}

