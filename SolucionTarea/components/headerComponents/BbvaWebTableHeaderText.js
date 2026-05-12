import { LitElement, html } from 'lit-element';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import { bbvaUparrow, bbvaDownarrow } from '@bbva-web-components/bbva-foundations-icons';
import { BbvaCoreFocusVisibleMixin } from '@bbva-web-components/bbva-core-focus-visible-mixin';
import { bbvaFoundationsStylesFocus } from '@bbva-web-components/bbva-foundations-styles';
import { BbvaCoreIcon } from '@bbva-web-components/bbva-core-icon';
import styles from './BbvaWebTableHeaderText-styles.js';

const iconUparrow = bbvaUparrow();
const iconDownarrow = bbvaDownarrow();

/**
![LitElement component](https://img.shields.io/badge/litElement-component-blue.svg)

This component provides a custom text element or sort button for table header row following BBVA Experience UI Web Studio specifications.

Example:

```html
<table>
  <thead>
    <tr>
      <th>
        <bbva-web-table-header-checkbox></bbva-web-table-header-checkbox>
      </th>
      <th>
        <bbva-web-table-header-text>Header 1</bbva-web-table-header-text>
      </th>
      <th>
        <bbva-web-table-header-text>Header 2</bbva-web-table-header-text>
      </th>
      <th>
        <bbva-web-table-header-text
          order
          secondary-order
        >
          Header 3.1
          <span slot="secondary-text">Header 3.2</span>
        </bbva-web-table-header-text>
      </th>
      <th>
        <bbva-web-table-header-text variant="amount">Header 4</bbva-web-table-header-text>
      </th>
      <th>
        <bbva-web-table-header-text variant="amount" order sort-ascending>
          Header 5
        </bbva-web-table-header-text>
      </th>
      <th>
        <bbva-web-table-header-text variant="amount" order>
          Header 6
        </bbva-web-table-header-text>
      </th>
    </tr>
  </thead>
</table>
```

@customElement bbva-web-table-header-text
*/
export class BbvaWebTableHeaderText extends BbvaCoreFocusVisibleMixin(
  ScopedElementsMixin(LitElement),
) {
  static get is() {
    return 'bbva-web-table-header-text';
  }

  static get scopedElements() {
    return {
      'bbva-core-icon': BbvaCoreIcon,
    };
  }

  static get properties() {
    return {
      /**
       * Icon Order ascending. Default bbva:uparrow
       */
      iconAscending: {
        type: String,
      },
      /**
       * Icon Order ascending. Default bbva:downarrow
       */
      iconDescending: {
        type: String,
      },

      /**
       * If is true, the component will be an order button instead of only text.
       */
      order: {
        type: Boolean,
        reflect: true,
      },

      /**
       * If true, sort order will be ascending instead of descending
       */
      sortAscending: {
        type: Boolean,
        attribute: 'sort-ascending',
      },

      /**
       * If true, the component is the current sorting criteria
       */
      sortActive: {
        type: Boolean,
        attribute: 'sort-active',
        reflect: true,
      },

      /**
       * Align header order text item. Can be:
       * - text, align left (default) for account numbers, names, dates, cards, bank clips and other text elements.
       * - icon, align center for icons and actions.
       * - amount, align right for amounts and badges.
       */
      variant: {
        type: String,
        reflect: true,
      },
    };
  }

  constructor() {
    super();
    this.iconAscending = iconUparrow;
    this.iconDescending = iconDownarrow;
    this.order = false;
    this.sortAscending = false;
    this.sortActive = false;
  }

  get _sortIcon() {
    return this.sortAscending ? this.iconAscending : this.iconDescending;
  }

  static get styles() {
    return [
      bbvaFoundationsStylesFocus('button:focus'),
      styles,
      getComponentSharedStyles('bbva-web-table-header-text-shared-styles'),
    ];
  }

  render() {
    return html` <div class="text">${this.order ? this._buttonTpl : this._contentTpl}</div> `;
  }

  get _buttonTpl() {
    return html`
      <button @click="${this._onClick}">
        ${this._contentTpl}
        <bbva-core-icon class="icon" .icon="${this._sortIcon}" size="20"></bbva-core-icon>
      </button>
    `;
  }

  /* eslint-disable class-methods-use-this */
  get _contentTpl() {
    return html`
      <span>
        <slot></slot>
      </span>
    `;
  }
  /* eslint-enable class-methods-use-this */

  _onClick() {
    if (this.sortActive) {
      this.sortAscending = !this.sortAscending;
    }
    this.sortActive = true;

    /**
     * Emit an event when clicking the order button
     * @event sort-criteria
     */
    this.dispatchEvent(
      new CustomEvent('sort-criteria', {
        bubbles: true,
        detail: {
          sortAscending: this.sortAscending,
        },
      }),
    );
  }
}
