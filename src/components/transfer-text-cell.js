import { LitElement, css, html } from 'lit';

export class TransferTextCell extends LitElement {
  static properties = {
    description: { type: String },
    text: { type: String },
  };

  render() {
    return html`
      <span class="clip"><slot name="clip"></slot></span>
      <span class="info">
        <span class="main"><slot name="main">${this.text}</slot></span>
        <span class="sub"><slot name="sub">${this.description}</slot></span>
      </span>
    `;
  }

  static styles = css`
    :host {
      align-items: center;
      color: #070e57;
      display: grid;
      gap: 0.8rem;
      grid-template-columns: auto minmax(0, 1fr);
      min-width: 0;
    }

    .clip:empty {
      display: none;
    }

    .info {
      display: grid;
      gap: 0.26rem;
      min-width: 0;
    }

    .main,
    .sub {
      display: block;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .main {
      font-size: 1rem;
      font-weight: 500;
    }

    .sub {
      color: #666a73;
      font-size: 0.86rem;
    }

    .sub:empty {
      display: none;
    }

    ::slotted(.transfer-icon) {
      align-items: center;
      background: #070e57;
      border-radius: 999px;
      color: #ffffff;
      display: inline-flex;
      height: 2.5rem;
      justify-content: center;
      width: 2.5rem;
    }
  `;
}

if (!customElements.get('transfer-text-cell')) {
  customElements.define('transfer-text-cell', TransferTextCell);
}

