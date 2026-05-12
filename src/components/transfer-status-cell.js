import { LitElement, css, html, nothing } from 'lit';

export class TransferStatusCell extends LitElement {
  static properties = {
    description: { type: String },
    variant: { type: String, reflect: true },
  };

  constructor() {
    super();
    this.description = '';
    this.variant = 'sent';
  }

  render() {
    return html`
      <span class="status"><slot></slot></span>
      ${this.description ? html`<span class="description">${this.description}</span>` : nothing}
    `;
  }

  static styles = css`
    :host {
      color: #07145f;
      display: inline-grid;
      gap: 0.25rem;
      line-height: 1.2;
    }

    :host([variant='destination']) {
      color: #18630f;
    }

    :host([variant='rejected']) {
      color: #c51510;
    }

    .status {
      font-size: 1rem;
      font-style: italic;
      font-weight: 500;
    }

    .description {
      color: #666a73;
      font-size: 0.86rem;
      font-style: normal;
    }
  `;
}

if (!customElements.get('transfer-status-cell')) {
  customElements.define('transfer-status-cell', TransferStatusCell);
}

