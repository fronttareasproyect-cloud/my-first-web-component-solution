import { LitElement, css, html, nothing } from 'lit';
import './transfer-table-header-cell.js';
import './transfer-date-cell.js';
import './transfer-text-cell.js';
import './transfer-status-cell.js';
import './transfer-amount-cell.js';
import './transfer-row-actions.js';

const paymentIcon = html`
  <span class="transfer-icon" slot="clip" aria-hidden="true">
    <svg viewBox="0 0 24 24">
      <path d="M5 7.5h14a1.5 1.5 0 0 1 1.5 1.5v8.5A1.5 1.5 0 0 1 19 19H5a1.5 1.5 0 0 1-1.5-1.5V9A1.5 1.5 0 0 1 5 7.5Z" fill="none" stroke="currentColor" stroke-width="1.6"></path>
      <path d="M8 7.5V5.75A1.75 1.75 0 0 1 9.75 4h4.5A1.75 1.75 0 0 1 16 5.75V7.5M15.5 13h3" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.6"></path>
    </svg>
  </span>
`;

export class TransferTable extends LitElement {
  static properties = {
    rows: { type: Array },
    sortAscending: { type: Boolean, attribute: 'sort-ascending' },
    total: { type: Number },
  };

  constructor() {
    super();
    this.rows = [];
    this.sortAscending = true;
    this.total = 161;
  }

  get _sortedRows() {
    return [...this.rows].sort((a, b) => {
      const first = new Date(a.isoDate).getTime();
      const second = new Date(b.isoDate).getTime();
      return this.sortAscending ? second - first : first - second;
    });
  }

  render() {
    return html`
      <div class="table-shell">
        <div class="table-scroll">
          <table aria-describedby="transfer-table-description">
            <caption id="transfer-table-description">
              Últimas transferencias realizadas en la cuenta seleccionada.
            </caption>
            <thead>
              <tr>
                <th scope="col" class="date-col">
                  <transfer-table-header-cell
                    order
                    sort-active
                    ?sort-ascending=${this.sortAscending}
                    @sort-criteria=${this._handleSortCriteria}
                  >
                    Fecha
                  </transfer-table-header-cell>
                </th>
                <th scope="col" class="concept-col">
                  <transfer-table-header-cell>Concepto/Nombre del pago</transfer-table-header-cell>
                </th>
                <th scope="col" class="beneficiary-col">
                  <transfer-table-header-cell>Beneficiario</transfer-table-header-cell>
                </th>
                <th scope="col" class="type-col">
                  <transfer-table-header-cell>Tipo de pago</transfer-table-header-cell>
                </th>
                <th scope="col" class="status-col">
                  <transfer-table-header-cell>Estado</transfer-table-header-cell>
                </th>
                <th scope="col" class="amount-col">
                  <transfer-table-header-cell variant="amount">Importe</transfer-table-header-cell>
                </th>
                <th scope="col" class="actions-col">
                  <span class="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody>
              ${this._sortedRows.length
                ? this._sortedRows.map((row) => this._rowTemplate(row))
                : this._emptyTemplate}
            </tbody>
          </table>
        </div>
        <button class="load-more" type="button">
          Ver más transferencias (${this._sortedRows.length} de ${this.total})
        </button>
      </div>
    `;
  }

  _rowTemplate(row) {
    return html`
      <tr>
        <td class="date-cell">
          <transfer-date-cell .date=${row.date} .year=${row.year}></transfer-date-cell>
        </td>
        <td>
          <transfer-text-cell>
            ${paymentIcon}
            <span slot="main" title=${row.concept}>${row.concept}</span>
            <span slot="sub">${row.payments}</span>
          </transfer-text-cell>
        </td>
        <td>
          <transfer-text-cell>
            <span slot="main" title=${row.beneficiary}>${row.beneficiary}</span>
            ${row.beneficiaryAccount
              ? html`<span slot="sub" title=${row.beneficiaryAccount}>${row.beneficiaryAccount}</span>`
              : nothing}
          </transfer-text-cell>
        </td>
        <td class="payment-type">${row.paymentType}</td>
        <td>
          <transfer-status-cell .description=${row.statusDescription || ''} variant=${row.statusVariant}>
            ${row.status}
          </transfer-status-cell>
        </td>
        <td class="amount-cell">
          <transfer-amount-cell
            .amount=${row.amount}
            currency=${row.currency}
            language="es-ES"
          ></transfer-amount-cell>
        </td>
        <td class="actions-cell">
          <transfer-row-actions></transfer-row-actions>
        </td>
      </tr>
    `;
  }

  get _emptyTemplate() {
    return html`
      <tr>
        <td class="empty" colspan="7">No hay transferencias que coincidan con la búsqueda.</td>
      </tr>
    `;
  }

  _handleSortCriteria(event) {
    this.sortAscending = event.detail.sortAscending;
  }

  static styles = css`
    :host {
      display: block;
    }

    .table-shell {
      background: #ffffff;
      border: 0.125rem solid #f0f2f5;
      border-radius: 1rem;
      overflow: hidden;
    }

    .table-scroll {
      overflow-x: auto;
    }

    table {
      border-collapse: collapse;
      min-width: 73rem;
      table-layout: fixed;
      width: 100%;
    }

    caption {
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

    th,
    td {
      border-bottom: 0.0625rem solid #d8dbe2;
      padding: 1.1rem 0.9rem;
      text-align: left;
      vertical-align: middle;
    }

    th {
      padding-bottom: 0.85rem;
      padding-top: 0.95rem;
    }

    tbody tr {
      transition:
        background-color 160ms ease,
        box-shadow 160ms ease;
    }

    tbody tr:hover {
      background: #f8fbff;
      box-shadow: inset 0.25rem 0 0 #1973b8;
    }

    .date-col {
      width: 7.5rem;
    }

    .concept-col {
      width: 24%;
    }

    .beneficiary-col {
      width: 18%;
    }

    .type-col {
      width: 25%;
    }

    .status-col {
      width: 11.5rem;
    }

    .amount-col {
      width: 10rem;
    }

    .actions-col {
      width: 6rem;
    }

    .payment-type {
      color: #070e57;
      font-size: 1rem;
      font-weight: 500;
    }

    .amount-cell,
    .actions-cell {
      text-align: right;
    }

    .transfer-icon svg {
      height: 1.25rem;
      width: 1.25rem;
    }

    .load-more {
      background: transparent;
      border: 0;
      color: #001b7f;
      cursor: pointer;
      display: block;
      font: inherit;
      font-size: 1rem;
      font-weight: 700;
      margin: 0 auto;
      padding: 1.05rem 1rem 1.25rem;
    }

    .load-more:focus-visible {
      border-radius: 0.35rem;
      outline: 0.125rem solid #1973b8;
      outline-offset: -0.15rem;
    }

    .empty {
      color: #666a73;
      padding: 2rem;
      text-align: center;
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

    @media (max-width: 760px) {
      .table-shell {
        border-radius: 0.8rem;
      }

      table {
        min-width: 60rem;
      }

      th,
      td {
        padding-left: 0.75rem;
        padding-right: 0.75rem;
      }
    }
  `;
}

if (!customElements.get('transfer-table')) {
  customElements.define('transfer-table', TransferTable);
}

