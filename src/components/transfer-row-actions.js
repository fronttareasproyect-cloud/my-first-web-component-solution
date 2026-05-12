import { LitElement, css, html } from 'lit';

export class TransferRowActions extends LitElement {
  render() {
    return html`
      <button class="icon-button" type="button" aria-label="Abrir acciones de transferencia">
        <svg viewBox="0 0 8 28" aria-hidden="true">
          <circle cx="4" cy="5" r="2"></circle>
          <circle cx="4" cy="14" r="2"></circle>
          <circle cx="4" cy="23" r="2"></circle>
        </svg>
      </button>
      <button class="icon-button" type="button" aria-label="Ver detalle de transferencia">
        <svg viewBox="0 0 12 20" aria-hidden="true">
          <path d="M2 2l8 8-8 8" fill="none" stroke="currentColor" stroke-width="3"></path>
        </svg>
      </button>
    `;
  }

  static styles = css`
    :host {
      align-items: center;
      display: inline-flex;
      gap: 0.55rem;
      justify-content: flex-end;
    }

    .icon-button {
      align-items: center;
      background: transparent;
      border: 0;
      color: #001b7f;
      cursor: pointer;
      display: inline-flex;
      height: 2.25rem;
      justify-content: center;
      padding: 0;
      width: 2.25rem;
    }

    .icon-button:focus-visible {
      border-radius: 0.35rem;
      outline: 0.125rem solid #1973b8;
      outline-offset: 0.125rem;
    }

    svg {
      fill: currentColor;
      height: 1.35rem;
      width: 1.35rem;
    }
  `;
}

if (!customElements.get('transfer-row-actions')) {
  customElements.define('transfer-row-actions', TransferRowActions);
}

