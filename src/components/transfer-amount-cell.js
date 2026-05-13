import { LitElement, css, html, nothing } from 'lit';

export class TransferAmountCell extends LitElement {
  static properties = {
    amount: { type: Number },
    currency: { type: String },
    language: { type: String },
  };

  constructor() {
    super();
    this.currency = 'EUR';
    this.language = 'es-ES';
  }

  get _formattedAmount() {
    if (typeof this.amount !== 'number' || Number.isNaN(this.amount)) {
      return '';
    }

    return new Intl.NumberFormat(this.language, {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(this.amount);
  }

  render() {
    if (!this._formattedAmount) {
      return nothing;
    }

    return html`
      <span class="amount">${this._formattedAmount}</span>
      <span class="currency">${this.currency}</span>
    `;
  }

  static styles = css`
    :host {
      color: #070e57;
      display: inline-flex;
      font-size: 1rem;
      font-weight: 500;
      gap: 0.35rem;
      justify-content: flex-end;
      line-height: 1.2;
      min-width: 7.5rem;
      white-space: nowrap;
    }
  `;
}

if (!customElements.get('transfer-amount-cell')) {
  customElements.define('transfer-amount-cell', TransferAmountCell);
}

