import { LitElement, css, html } from 'lit';
import './components/transfer-dashboard.js';

export class MyElement extends LitElement {
  render() {
    return html`<transfer-dashboard></transfer-dashboard>`;
  }

  static styles = css`
    :host {
      display: block;
      min-height: 100svh;
    }
  `;
}

if (!customElements.get('my-element')) {
  customElements.define('my-element', MyElement);
}

