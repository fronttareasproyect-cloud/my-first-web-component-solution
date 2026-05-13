import { LitElement, css, html } from 'lit';

export class TransferDateCell extends LitElement {
  static properties = {
    date: { type: String },
    fullDate: { type: String, attribute: 'full-date' },
    year: { type: String },
  };

  updated(changedProperties) {
    if (changedProperties.has('fullDate') && this.fullDate) {
      const [day, month, year] = this.fullDate.split(' ');
      this.date = `${day} ${month}`;
      this.year = year;
    }
  }

  render() {
    const readableDate = this.fullDate || `${this.date} ${this.year}`;

    return html`
      <span class="main" aria-hidden="true"><slot name="date">${this.date}</slot></span>
      <span class="sub" aria-hidden="true"><slot name="year">${this.year}</slot></span>
      <span class="sr-only">${readableDate}</span>
    `;
  }

  static styles = css`
    :host {
      color: #070e57;
      display: inline-flex;
      flex-direction: column;
      line-height: 1.2;
      min-width: 4.5rem;
    }

    .main {
      font-size: 1rem;
      font-weight: 500;
    }

    .sub {
      color: #666a73;
      font-size: 0.86rem;
      margin-top: 0.25rem;
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
  `;
}

if (!customElements.get('transfer-date-cell')) {
  customElements.define('transfer-date-cell', TransferDateCell);
}

