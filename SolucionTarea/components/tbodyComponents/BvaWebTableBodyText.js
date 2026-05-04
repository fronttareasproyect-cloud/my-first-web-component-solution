import { LitElement, html } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import { mask } from '@bbva-web-components/bbva-core-lit-helpers/utils/mask.js';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { BbvaWebLink } from '@bbva-web-components/bbva-web-link';
import { BbvaWebBadgeDefault } from '@bbva-web-components/bbva-web-badge-default';
import { BbvaWebTableBodyNotification } from '../BbvaWebTableBodyNotification/BbvaWebTableBodyNotification.js';
import styles from './BbvaWebTableBodyText-styles.js';

export class BbvaWebTableBodyText extends ScopedElementsMixin(LitElement) {
  static get is() {
    return 'bbva-web-table-body-text';
  }

  static get scopedElements() {
    return {
      'bbva-web-badge-default': BbvaWebBadgeDefault,
      'bbva-web-link': BbvaWebLink,
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
       * Maskable text for element; it will override slotted content
       */
      text: {
        type: String,
      },
      /**
       * If true, main text will be clickable
       */
      textAction: {
        type: Boolean,
        attribute: 'text-action',
      },
      /**
       * Href attribute for main text link
       */
      textLinkHref: {
        type: String,
        attribute: 'text-link-href',
      },
      /**
       * Rel attribute for main text link
       */
      textLinkRel: {
        type: String,
        attribute: 'text-link-rel',
      },
      /**
       * Target attribute for main text link
       */
      textLinkTarget: {
        type: String,
        attribute: 'text-link-target',
      },
      /**
       * Mask for text when notification is shown
       */
      textMask: {
        type: String,
        attribute: 'text-mask',
      },
      /**
       * Amount of visible chars when main text is masked
       */
      maskVisibleChars: {
        type: Number,
        attribute: 'mask-visible-chars',
      },
      /**
       * Notification text
       */
      notification: {
        type: String,
      },
      /**
       * Variant for notification, as defined in `bbva-web-table-body-notification`
       */
      notificationVariant: {
        type: String,
        attribute: 'notification-variant',
      },
      /**
       * Link text for notification
       */
      notificationLink: {
        type: String,
        attribute: 'notification-link',
      },
      /**
       * Href attribute for notification link
       */
      notificationLinkHref: {
        type: String,
        attribute: 'notification-link-href',
      },
      /**
       * Rel attribute for notification link
       */
      notificationLinkRel: {
        type: String,
        attribute: 'notification-link-rel',
      },
      /**
       * Target attribute for notification link
       */
      notificationLinkTarget: {
        type: String,
        attribute: 'notification-link-target',
      },
      /**
       * Description text
       */
      description: {
        type: String,
      },
      /**
       * Text for badge
       */
      badge: {
        type: String,
      },
      /**
       * Variant for badge, as defined in `bbva-web-badge-default`
       */
      badgeVariant: {
        type: String,
        attribute: 'badge-variant',
      },
      /**
       * Variant for links, as defined in `bbva-web-link`
       */
      linkVariant: {
        type: String,
        attribute: 'link-variant',
      },
      /**
       * When the row is on the Error, Select or Sucess state, the Link colour is BBVA Core Light Blue #1464A5 (variant contrast-subdued)
       */
      state: {
        type: String,
        reflect: true,
      },

      /**
       * If true, bottom block will be hidden and margins adjusted for grouping multiple text elements in the same cell
       */
      grouped: {
        type: Boolean,
        reflect: true,
      },
    };
  }

  constructor() {
    super();

    this.textMask = '*** ';
    this.maskVisibleChars = 4;
    this.notificationVariant = 'blocked';
  }

  static get styles() {
    return [styles, getComponentSharedStyles('bbva-web-table-body-text-shared-styles')];
  }

  render() {
    return html`
      <div class="clip">
        <slot name="clip"></slot>
      </div>

      <div class="info">
        <div class="main">
          <slot name="main"> ${this._text} ${this._notification} </slot>
        </div>
        <div class="sub"><slot name="sub">${this._sub}</slot></div>
      </div>
    `;
  }

  /**
   * Returns interactable action element if available
   */
  get actionElement() {
    return this.shadowRoot.querySelector('.link');
  }

  get _text() {
    return html`
      ${this.textAction || this.textLinkHref
        ? html`
            <bbva-web-link
              class="link"
              .href="${this.textLinkHref}"
              .rel="${this.textLinkRel}"
              .target="${this.textLinkTarget}"
              .variant="${this._linkVariant}"
              @click="${this._onTextClick}"
            >
              ${this._slottedText}
            </bbva-web-link>
          `
        : html` <span class="text"> ${this._slottedText} </span> `}
    `;
  }

  get _slottedText() {
    return this.text ? html` ${this._maskedText} ` : html` <slot></slot> `;
  }

  get _maskedText() {
    return mask(this.text, this.textMask, this.notification, this.maskVisibleChars);
  }

  /**
   * Returns notification element
   */
  get notificationElement() {
    return this.shadowRoot.querySelector('.notification');
  }

  get _notification() {
    return html`
      <div class="notification-wrapper">
        <slot name="notification">
          ${this.notification
            ? html`
                <bbva-web-table-body-notification
                  class="notification"
                  size="s"
                  .linkHref="${this.notificationLinkHref}"
                  .linkRel="${this.notificationLinkRel}"
                  .linkTarget="${this.notificationLinkTarget}"
                  .linkVariant="${this.linkVariant}"
                  .link="${this.notificationLink}"
                  .state="${this.state}"
                  .variant="${this.notificationVariant}"
                  @link-click="${this._onNotificationClick}"
                >
                  ${this.notification}
                </bbva-web-table-body-notification>
              `
            : ''}
        </slot>
      </div>
    `;
  }

  get _sub() {
    return html`
      ${this.description ? html` <span class="description">${this.description}</span> ` : ''}
      ${this.badge
        ? html`
            <bbva-web-badge-default class="badge" .variant="${this.badgeVariant}">
              ${this.badge}
            </bbva-web-badge-default>
          `
        : ''}
    `;
  }

  get _linkVariant() {
    return (
      this.linkVariant ||
      (this.state === 'success' || this.state === 'error' ? 'contrast-subdued' : '')
    );
  }

  _onTextClick() {
    /**
     * Fired when main text link is clicked
     * @event main-click
     */
    this.dispatchEvent(
      new CustomEvent('main-click', {
        bubbles: true,
      }),
    );
  }

  _onNotificationClick() {
    /**
     * Fired when notification link is clicked
     * @event notification-click
     */
    this.dispatchEvent(
      new CustomEvent('notification-click', {
        bubbles: true,
      }),
    );
  }
}
