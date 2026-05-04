import { LitElement, html } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import styles from './BbvaWebTableBodyDate-styles.js';
/**
![LitElement component](https://img.shields.io/badge/litElement-component-blue.svg)

This component allows to show a date content for table body rows following BBVA Experience UI Web Studio specifications. It does not automatically process or localize dates.

Date visualization varies between sizes. Year must be passed to the 'year' property. Day and month must be passed to the 'date' property. Full date must be passed to the 'fullDate' property.

`fullDate` property allows you to provide a complete date to the component without the need to separately specify `date` and `year`. Please note that you should use either `fullDate` or the combination of `date` and `year`, but not all three properties simultaneously.

Example:

```html
<bbva-web-table-body-date date="30 Abr" year="2020"></bbva-web-table-body-date>
<bbva-web-table-body-date full-date="30 Abr 2020"></bbva-web-table-body-date>
```

## Size

This element accepts three sizes: L (default), M, and S.
```html
<bbva-web-table-body-date date="30 Abr" year="2020"></bbva-web-table-body-date>
<bbva-web-table-body-date date="30 Abr" year="2020" size="m"></bbva-web-table-body-date>
<bbva-web-table-body-date date="30 Abr" year="2020" size="s"></bbva-web-table-body-date>

<bbva-web-table-body-date full-date="30 Abr 2020"></bbva-web-table-body-date>
<bbva-web-table-body-date full-date="30 Abr 2020" size="m"></bbva-web-table-body-date>
<bbva-web-table-body-date full-date="30 Abr 2020" size="s"></bbva-web-table-body-date>
```

## Slots

- `date`: allows to override the top/left date block
- `year`: allows to override the bottom/right year block
- `fullDate`: allows to override the top/left date and the bottom/right year block

@customElement bbva-web-table-body-date
*/
export class BbvaWebTableBodyDate extends LitElement {
  static get is() {
    return 'bbva-web-table-body-date';
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
       * Day and month string to show
       */
      date: {
        type: String,
      },
      /**
       * Year to show
       */
      year: {
        type: String,
      },
      /**
       * Full date (day month year) to show
       */
      fullDate: {
        type: String,
        attribute: 'full-date',
      },
    };
  }

  static get styles() {
    return [styles, getComponentSharedStyles('bbva-web-table-body-date-shared-styles')];
  }

  updated(changedProperties) {
    if (changedProperties.has('fullDate')) {
      if (this.fullDate) {
        const [day, month, year] = this.fullDate.split(' ');
        if (day && month && year) {
          this.date = `${day} ${month}`;
          this.year = year;
        }
      }
    }
  }

  render() {
    if (this.fullDate) {
      return html`
        <span class="main" aria-hidden="true">${this.date}</span>
        <span class="sub" aria-hidden="true">${this.year}</span>
        <span class="sr-only">${this.fullDate}</span>
      `;
    }
    return html`
      <span class="main"><slot name="date">${this.date}</slot></span>
      <span class="sub"><slot name="year">${this.year}</slot></span>
    `;
  }
}
