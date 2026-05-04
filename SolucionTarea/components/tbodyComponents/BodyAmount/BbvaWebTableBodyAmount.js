import { LitElement, html } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import { BbvaCoreIntlMixin } from '@bbva-web-components/bbva-core-intl-mixin';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { BbvaWebAmountFormat } from '@bbva-web-components/bbva-web-amount';
import { BbvaWebBadgeDefault } from '@bbva-web-components/bbva-web-badge-default';
import { BbvaWebBadgeVariability } from '@bbva-web-components/bbva-web-badge-variability';
import { BbvaWebProgressBar } from '@bbva-web-components/bbva-web-progress-bar';
import { BbvaWebTableBodyNotification } from '../BbvaWebTableBodyNotification/BbvaWebTableBodyNotification.js';
import styles from './BbvaWebTableBodyAmount-styles.js';

/**
![LitElement component](https://img.shields.io/badge/litElement-component-blue.svg)

This component is meant to be used as a table body cell content to show amounts. It complies with BBVA Experience Web Studio design.

It expects a main 'amount' and 'currency', as well as a 'language' for the amount. As an additional block, it can show a description, a badge, a notification, or a secondary amount. The additional block can also show a graph bar. For accessibility purposes, the component can also provide optional main and secondary labels to describe main and secondary amounts for screen readers.

```html
<bbva-web-table-body-amount
  amount="2000.50"
  currency="EUR"
  language="es"
  description="Lorem"
></bbva-web-table-body-amount>
<bbva-web-table-body-amount
  amount="0"
  currency="EUR"
  language="es"
  notification="Alert"
></bbva-web-table-body-amount>
<bbva-web-table-body-amount
  amount="2000.50"
  currency="EUR"
  language="es"
  badge="Success"
  badge-variant="success"
></bbva-web-table-body-amount>
<bbva-web-table-body-amount
  amount="2000.50"
  secondary-amount="2500.11"
  currency="EUR"
  language="es"
></bbva-web-table-body-amount>
<bbva-web-table-body-amount
  amount="2000.50"
  currency="EUR"
  language="es"
  graph
  graph-max="2500"
></bbva-web-table-body-amount>
<bbva-web-table-body-amount
  amount="2000.50"
  secondary-amount="2500"
  currency="EUR"
  language="es"
  graph
></bbva-web-table-body-amount>
<bbva-web-table-body-amount
  amount="2000.50"
  secondary-amount="250000.11"
  currency="EUR"
  language="en"
  main-amount-label="Importe del movimiento"
  secondary-amount-label="Importe total disponible"
></bbva-web-table-body-amount>
```

## Size

This element accepts three sizes: L (default), M, and S.
```html
<bbva-web-table-body-amount
  amount="2000.50"
  currency="EUR"
  language="es"
  description="Lorem"
></bbva-web-table-body-amount>
<bbva-web-table-body-amount
  amount="2000.50"
  currency="EUR"
  language="es"
  description="Lorem"
  size="m"
></bbva-web-table-body-amount>
<bbva-web-table-body-amount
  amount="2000.50"
  currency="EUR"
  language="es"
  description="Lorem"
  size="s"
></bbva-web-table-body-amount>
```

## Slots

- `main`: overrides top (main amount) block
- `sub`: overrides bottom (description, badge, notification, graph) block

@customElement bbva-web-table-body-amount
*/
export class BbvaWebTableBodyAmount extends BbvaCoreIntlMixin(ScopedElementsMixin(LitElement)) {
  static get is() {
    return 'bbva-web-table-body-amount';
  }

  static get scopedElements() {
    return {
      'bbva-web-amount-format': BbvaWebAmountFormat,
      'bbva-web-badge-default': BbvaWebBadgeDefault,
      'bbva-web-badge-variability': BbvaWebBadgeVariability,
      'bbva-web-progress-bar': BbvaWebProgressBar,
      'bbva-web-table-body-notification': BbvaWebTableBodyNotification,
    };
  }

  static get properties() {
    return {
      /**
       * Size for element. Available values are 'l' (default), 'm' and 's'
       */
      size: {
        type: String,
        reflect: true,
      },
      /**
       * Main amount to show
       */
      amount: {
        type: Number,
      },
      /**
       * Possible amount types
       * Values: positive, uncovered and grey
       */
      amountVariant: {
        type: String,
        attribute: 'amount-variant',
        reflect: true,
      },
      /**
       * Secondary amount to show
       */
      secondaryAmount: {
        type: Number,
        attribute: 'secondary-amount',
        reflect: true,
      },
      /**
       * Possible secondary amount types
       * Values: positive, uncovered and grey
       */
      secondaryAmountVariant: {
        type: String,
        attribute: 'secondary-amount-variant',
        reflect: true,
      },
      /**
       * Currency code for amount
       */
      currency: {
        type: String,
      },
      /**
       * Currency code for secondary amount. If not defined, main currency code will be used
       */
      secondaryCurrency: {
        type: String,
        attribute: 'secondary-currency',
      },
      /**
       * Language for amount separators
       */
      language: {
        type: String,
      },
      /**
       * Badge text
       */
      badge: {
        type: String,
      },
      /**
       * Badge variant as defined in 'bbva-web-badge-default'
       */
      badgeVariant: {
        type: String,
        attribute: 'badge-variant',
      },
      /**
       * Notification text
       */
      notification: {
        type: String,
      },
      /**
       * Notification variant as defined in 'bbva-web-notification-help'
       */
      notificationVariant: {
        type: String,
        attribute: 'notification-variant',
      },
      /**
       * Description text
       */
      description: {
        type: String,
      },
      /**
       * If true, graph bar will be shown
       */
      graph: {
        type: Boolean,
        reflect: true,
      },
      /**
       * Max value for graph bar when only main amount is provided
       */
      graphMax: {
        type: Number,
        attribute: 'graph-max',
      },
      /**
       * Accessible label for graph bar
       */
      graphLabel: {
        type: String,
        attribute: 'graph-label',
      },
      /**
       * When the row is on the Error, Select or Sucess state, the background bar colour is BBVA Aqua Darkest #006C6C and the background chart colour is BBVA White #FFFFFF
       */
      state: {
        type: String,
        reflect: true,
      },
      /**
       * Badge variability variant
       */
      variabilityVariant: {
        type: String,
        attribute: 'variability-variant',
      },

      /**
       * If true, bottom block will be hidden and margins adjusted for grouping multiple amount elements in the same cell
       */
      grouped: {
        type: Boolean,
        reflect: true,
      },

      /**
       * A label to describe the main amount for accessibility purposes. This label is used for screen readers.
       */
      mainAmountLabel: {
        type: String,
        attribute: 'main-amount-label',
      },

      /**
       * A label to describe the secondary amount for accessibility purposes. This label is used for screen readers.
       */
      secondaryAmountLabel: {
        type: String,
        attribute: 'secondary-amount-label',
      },
    };
  }

  constructor() {
    super();
    this.currency = 'EUR';
    this.language = 'es';
    this.variabilityVariant = '';
    this.notificationVariant = 'blocked';
  }

  static get styles() {
    return [styles, getComponentSharedStyles('bbva-web-table-body-amount-shared-styles')];
  }

  render() {
    return this.graph ? this._graphView : this._amountView;
  }

  get _smallSize() {
    return this.size === 's';
  }

  get _mainAmountAccessibilityLabel() {
    if (this.mainAmountLabel) {
      return html`<span class="sr-only">${this.t(this.mainAmountLabel)}</span>`;
    }
    return html``;
  }

  get _secondaryAmountAccessibilityLabel() {
    if (this.secondaryAmountLabel) {
      return html`<span class="sr-only">${this.t(this.secondaryAmountLabel)}</span>`;
    }
    return html``;
  }

  get _amountView() {
    return html`
      <div class="top">
        <slot name="main">
          ${this._smallSize && this.notification ? this._notification : ''} ${this._mainAmount}
          ${this.variabilityVariant
            ? html`
                <bbva-web-badge-variability
                  .variant="${this.variabilityVariant}"
                ></bbva-web-badge-variability>
              `
            : ''}
        </slot>
      </div>

      <div class="bottom"><slot name="sub">${this._bottomBlock}</slot></div>
    `;
  }

  get _bottomBlock() {
    if (this.badge) {
      return this._badge;
    }
    if (this.notification && !this._smallSize) {
      return this._notification;
    }
    if (this.secondaryAmount || this.secondaryAmount === 0) {
      return this._secondaryAmount;
    }
    return this._description;
  }

  get _mainAmount() {
    return html`
      <span class="main">
        ${this._mainAmountAccessibilityLabel}
        <bbva-web-amount-format
          class="amount"
          .amount="${this.amount}"
          .language="${this.language}"
        ></bbva-web-amount-format>
        <span class="currency">${this.currency}</span>
      </span>
    `;
  }

  get _description() {
    return html` <span class="description">${this.description}</span> `;
  }

  get _notification() {
    return html`
      <bbva-web-table-body-notification
        class="notification"
        size="s"
        .variant="${this.notificationVariant}"
      >
        ${this.notification}
      </bbva-web-table-body-notification>
    `;
  }

  get _badge() {
    return html`
      <bbva-web-badge-default class="badge" .variant="${this.badgeVariant}"
        >${this.badge}</bbva-web-badge-default
      >
    `;
  }

  get _secondaryCurrency() {
    return this.secondaryCurrency || this.currency;
  }

  get _secondaryAmount() {
    return html`
      <span class="secondary">
        ${this._secondaryAmountAccessibilityLabel}
        <bbva-web-amount-format
          class="amount"
          .amount="${this.secondaryAmount}"
          .language="${this.language}"
        ></bbva-web-amount-format>
        <span class="currency">${this._secondaryCurrency}</span>
      </span>
    `;
  }

  get _graphView() {
    return html`
      <div class="top ${this.secondaryAmount || this.secondaryAmount === 0 ? 'spaced' : ''}">
        <slot name="main">
          ${this._mainAmount}
          ${this.secondaryAmount || this.secondaryAmount === 0 ? this._secondaryAmount : ''}
        </slot>
      </div>
      <div class="bottom"><slot name="sub">${this._bar}</slot></div>
    `;
  }

  get _bar() {
    return html`
      <div class="bar-wrap">
        <bbva-web-progress-bar no-shadow class="bar" .current="${this.amount}" .max="${this._max}"
          >${this.graphLabel}</bbva-web-progress-bar
        >
      </div>
    `;
  }

  get _max() {
    return this.secondaryAmount || this.graphMax;
  }
}
