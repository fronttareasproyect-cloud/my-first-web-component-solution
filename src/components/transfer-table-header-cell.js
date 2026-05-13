import { LitElement, css, html } from 'lit';

export class TransferTableHeaderCell extends LitElement {
  static properties = {
    order: { type: Boolean, reflect: true },
    sortActive: { type: Boolean, attribute: 'sort-active', reflect: true },
    sortAscending: { type: Boolean, attribute: 'sort-ascending', reflect: true },
    variant: { type: String, reflect: true },
  };

  constructor() {
    super();
    this.order = false;
    this.sortActive = false;
    this.sortAscending = false;
    this.variant = 'text';
  }

  render() {
    const content = html`
      <span class="label"><slot></slot></span>
      ${this.order ? html`<span class="sort-icon" aria-hidden="true"></span>` : ''}
    `;

    return html`
      <div class="text">
        ${this.order
          ? html`<button type="button" @click=${this._handleSort}>${content}</button>`
          : html`<span class="content">${content}</span>`}
      </div>
    `;
  }

  _handleSort() {
    this.sortAscending = !this.sortAscending;
    this.sortActive = true;
    this.dispatchEvent(
      new CustomEvent('sort-criteria', {
        bubbles: true,
        composed: true,
        detail: {
          sortAscending: this.sortAscending,
        },
      }),
    );
  }

  static styles = css`
    :host {
      display: block;
      color: #666a73;
      font-size: 0.82rem;
      font-weight: 500;
      letter-spacing: 0.01em;
      text-transform: uppercase;
      white-space: nowrap;
    }

    :host([variant='amount']) .text {
      text-align: right;
    }

    button,
    .content {
      align-items: center;
      background: transparent;
      border: 0;
      color: inherit;
      display: inline-flex;
      font: inherit;
      gap: 0.45rem;
      letter-spacing: inherit;
      padding: 0;
      text-transform: inherit;
    }

    button {
      color: #001b7f;
      cursor: pointer;
    }

    button:focus-visible {
      border-radius: 0.25rem;
      outline: 0.125rem solid #1973b8;
      outline-offset: 0.25rem;
    }

    .sort-icon {
      border-left: 0.32rem solid transparent;
      border-right: 0.32rem solid transparent;
      display: inline-block;
      height: 0;
      width: 0;
    }

    :host([sort-ascending]) .sort-icon {
      border-bottom: 0.42rem solid currentColor;
    }

    :host(:not([sort-ascending])) .sort-icon {
      border-top: 0.42rem solid currentColor;
    }
  `;
}

if (!customElements.get('transfer-table-header-cell')) {
  customElements.define('transfer-table-header-cell', TransferTableHeaderCell);
}

