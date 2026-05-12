import { LitElement, html } from 'lit-element';
import { nothing } from 'lit-html';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import { BbvaCoreAmountFormatMixin } from '@bbva-web-components/bbva-core-amount-format-mixin';
import styles from './BbvaWebAmountFormat-styles.js';

/**
This element can receive an amount (as number) and format it as an amount string with language-dependant thousands grouping and fractional separator.

It uses `BbvaCoreAmountFormatMixin`, from this same package, so it accepts configuration options as how many decimal digits to show, abbreviations for large numbers, hide decimals if they are equal to zero, or custom separator/grouping characters. Check the mixin documentation for more info. The element renders visually the formatted amount and also sets an accessibility-ready formatted text for assistive technologies. It will also fire an event each time the formatted amount is updated.

This element does not set visual styling as colors or size, but it will automatically add an ellipsis if the amount is too long.

```html
<bbva-web-amount-format amount="123456.789"></bbva-web-amount-format>
<bbva-web-amount-format amount="123456.789" language="es"></bbva-web-amount-format>
<bbva-web-amount-format amount="123456.789" decimal-digits="1"></bbva-web-amount-format>
<bbva-web-amount-format amount="123456.789" abbr="3"></bbva-web-amount-format>
<bbva-web-amount-format amount="123456.789" decimals-hidden></bbva-web-amount-format>
<bbva-web-amount-format amount="123456" zero-decimals-hidden></bbva-web-amount-format>
<bbva-web-amount-format amount="123456.700" trailing-zero-decimals-hidden></bbva-web-amount-format>
<bbva-web-amount-format amount="123456.700" separator-char="," group-char=" "></bbva-web-amount-format>
```
*/
export class BbvaWebAmountFormat extends BbvaCoreAmountFormatMixin(LitElement) {
  /* istanbul ignore next */
  static get is() {
    return 'bbva-web-amount-format';
  }

  updated(props) {
    super.updated && super.updated(props);
    this._sendFormattedAmount();
  }

  /* eslint-disable class-methods-use-this */
  _formattedAmountEventDetail(amount) {
    return {
      amount,
    };
  }
  /* eslint-disable class-methods-use-this */

  _sendFormattedAmount() {
    const negative = this._isNegative ? '-' : '';
    const amount = `${negative}${this._integerSrBlock}`;
    const detail = this._formattedAmountEventDetail(amount);
    /**
     * Fired when formatted amount changes
     * @event amount-formatted
     * @param bubbles
     * @param { String } detail.amount Formatted amount
     */
    this.dispatchEvent(
      new CustomEvent('amount-formatted', {
        bubbles: true,
        detail,
      }),
    );
  }

  static get styles() {
    return [styles, getComponentSharedStyles('bbva-web-amount-format-shared-styles')];
  }

  get _hasAmount() {
    return typeof this.amount === 'number' && !Number.isNaN(this.amount);
  }

  render() {
    if (!this._hasAmount) {
      return nothing;
    }
    return html`
      ${this.amountLabel ? html`<span class="sr-only">${this.amountLabel}</span>` : nothing}
      <span class="sr-only">${this.srAmount}</span>
      <span class="amount-wrapper" aria-hidden="true">${this._amountContentTpl}</span>
    `;
  }

  get _amountContentTpl() {
    return html`
      ${this._isNegative ? html` <span class="minus">-</span> ` : ''} ${this._validAmountTpl}
    `;
  }

  get _validAmountTpl() {
    return this._isValidAmount
      ? html`
          <span class="amount-block">
            <span class="integer">${this._integer}</span>

            ${!this._decimalsHidden && this._fractional
              ? html`
                  <span class="separator">${this._separator}</span>
                  <span class="fractional">${this._fractional}</span>
                `
              : ''}
            ${this._safeAbbrValue
              ? html` <span class="abbreviation">&nbsp;${this._abbreviation}</span> `
              : ''}
          </span>
        `
      : '';
  }
}
