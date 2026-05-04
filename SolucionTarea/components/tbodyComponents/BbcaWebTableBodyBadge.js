import { html } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import { bbvaCheckmark, bbvaClose } from '@bbva-web-components/bbva-foundations-icons';
import { BbvaWebBadgeDefault } from '@bbva-web-components/bbva-web-badge-default';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { BbvaCoreIcon } from '@bbva-web-components/bbva-core-icon';
import styles from './BbvaWebTableBodyBadge-styles.js';

const iconCheckmark = bbvaCheckmark();
const iconClose = bbvaClose();

/**
![LitElement component](https://img.shields.io/badge/litElement-component-blue.svg)

This component extends `@bbva-web-components/bbva-web-badge-default` to provide a table body badge element, check it for available styling options.  It complies with BBVA Experience Web Studio design.

```html
<bbva-web-table-body-badge variant="success">Success</bbva-web-table-body-badge>
<bbva-web-table-body-badge variant="finance">Finance</bbva-web-table-body-badge>
<bbva-web-table-body-badge variant="blocked">Blocked</bbva-web-table-body-badge>
<bbva-web-table-body-badge variant="warning">Warning</bbva-web-table-body-badge>
<bbva-web-table-body-badge variant="off">Off</bbva-web-table-body-badge>
<bbva-web-table-body-badge variant="pending">Pending</bbva-web-table-body-badge>
```

## Size

This element accepts three sizes: L (default), M, and S.
```html
<bbva-web-table-body-badge variant="success">Success</bbva-web-table-body-badge>
<bbva-web-table-body-badge variant="success" size="m">Success</bbva-web-table-body-badge>
<bbva-web-table-body-badge variant="success" size="s">Success</bbva-web-table-body-badge>
```

## Slots

- __default__: for badge main text content
- `description`: allows to override the description block

@customElement bbva-web-table-body-badge
*/
export class BbvaWebTableBodyBadge extends ScopedElementsMixin(BbvaWebBadgeDefault) {
  static get is() {
    return 'bbva-web-table-body-badge';
  }

  static get scopedElements() {
    return {
      ...(super.scopedElements || {}),
      'bbva-core-icon': BbvaCoreIcon,
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
       * When the row is on the Error, Select or Sucess state, the component will have a background with BBVA White #FFFFFF colour
       */
      state: {
        type: String,
        reflect: true,
      },
      /**
       * Optional description below the badge
       */
      description: {
        type: String,
      },

      /**
       * Special visualization for showing just a 'success' or 'failure' icon instead of default badge
       */
      badgeIcon: {
        type: String,
        attribute: 'badge-icon',
        reflect: true,
      },
    };
  }

  static get styles() {
    return [
      super.styles,
      styles,
      getComponentSharedStyles('bbva-web-table-body-badge-shared-styles'),
    ];
  }

  render() {
    return this.badgeIcon ? this._badgeIconTpl : this._defaultTpl;
  }

  get _defaultTpl() {
    return html` ${super.render()} ${this._descriptionTpl} `;
  }

  get _badgeIconTpl() {
    return html`
      <div class="sr-only">${super.render()}</div>
      ${this._iconTpl}
    `;
  }

  get _descriptionTpl() {
    return html`
      <div class="bottom">
        <slot name="sub">
          ${this.description ? html` <span class="text">${this.description}</span> ` : ''}
        </slot>
      </div>
    `;
  }

  get _icon() {
    return this.badgeIcon === 'success' ? iconCheckmark : iconClose;
  }

  get _iconTpl() {
    return html` <bbva-core-icon class="icon" .icon="${this._icon}"></bbva-core-icon> `;
  }
}
