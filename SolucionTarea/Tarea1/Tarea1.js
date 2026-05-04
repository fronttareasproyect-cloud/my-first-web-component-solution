const { html } = require("lit");

export class tareaq extends LitElement {
  _headTpl(type) {
    let headerText;
    let sort = true;
    if (type === REMITTANCE_MAIN) {
      headerText = this.t(
        "bbva-btge-tracking-solution-labels-detail-creation-date",
      );
      sort = this._isRenderSortDate;
    }
    if (type === REMITTANCE_DRAFTS) {
      headerText = this.t(
        "bbva-btge-tracking-solution-labels-detail-creation-date",
      );
    }
    if (type === REMITTANCE_PENDING) {
      headerText = this.t(
        "bbva-btge-tracking-solution-labels-detail-creation-pending-date",
      );
    }
    this._setTDAccordionHidden(type);
    return html`
      <tr class="tr">
        <th
          scope="col"
          class="date-col"
          aria-sort="${this.setAriaSortType(type)}"
        >
          <bbva-web-table-header-text
            variant="text"
            ?sort-ascending=${sort}
            order
            sort-active
            @sort-criteria="${(event) =>
              this._handleSortTable(
                event,
                type,
                this._mainFilterDetails?.orderBy || "creationDate",
              )}"
          >
            ${headerText}
          </bbva-web-table-header-text>
        </th>
        <th scope="col" class="concept-col">
          <bbva-web-table-header-text variant="text">
            ${this.t("bbva-btge-tracking-solution-table-headers-concept-name")}
          </bbva-web-table-header-text>
        </th>
        <th scope="col" class="beneficiary-col">
          <bbva-web-table-header-text variant="text">
            ${this.t("bbva-btge-tracking-solution-table-headers-receiver")}
          </bbva-web-table-header-text>
        </th>
        ${this._getTableHeader(type)}
        <th scope="col" class="amount-col">
          ${this._renderTableHeaderAmount(type)}
        </th>
        <td ?hidden="${this.istdHidden}"></td>
      </tr>
    `;
  }

  _renderTableHeaderAmount(type) {
    const sort = true;
    return COLUMN_SORT_TRANSFERMAIN.AMOUNT
      ? html`
          <bbva-web-table-header-text
            variant="amount"
            order
            sort-active
            ?sort-ascending=${sort}
            @sort-criteria="${(event) =>
              this._handleSortTable(
                event,
                type,
                this._mainFilterDetails?.orderBy || "amount",
              )}"
          >
            ${this.t("bbva-btge-tracking-solution-table-headers-amount")}
          </bbva-web-table-header-text>
        `
      : html`
          <bbva-web-table-header-text variant="text">
            ${this.t("bbva-btge-tracking-solution-table-headers-amount")}
          </bbva-web-table-header-text>
        `;
  }

  _getTableHeader(type) {
      this._beneficiaryColWidth();
      const typeWidthClass = this._typeColWidth(type);
      if (!this._openedRightSidebar) {
        return type !== REMITTANCE_DRAFTS
          ? html`
              <th scope="col" class="type-col">
                <bbva-web-table-header-text variant="text">
                  ${this.t(
    'bbva-btge-tracking-solution-table-headers-payment-type'
  )}
                </bbva-web-table-header-text>
              </th>
              <th scope="col" class="status-col">
                <bbva-web-table-header-text variant="text">
                  ${this.t('bbva-btge-tracking-solution-table-headers-state')}
                </bbva-web-table-header-text>
              </th>
            `
          : html`
              <th scope="col" class="${typeWidthClass}">
                <bbva-web-table-header-text variant="text">
                  ${this.t(
    'bbva-btge-tracking-solution-table-headers-payment-type'
  )}
                </bbva-web-table-header-text>
              </th>
            `;
      }
      return html``;
  }

  _checkTypeBodyTpl(remittanceResponse, type, actions) {
    const { hiddenRejectedTransferAccordionButton } =
      window.AppConfig.bbvaBtgeTrackingSolution;
    if (
      this[`_states${type}`].isError &&
      !getPropValue(this[`data${type}`], "items")
    ) {
      return this._renderPanelContent("error");
    }
    if (this[`_states${type}`].isLoading) {
      return this._renderPanelContent("loading");
    }

    if (remittanceResponse && remittanceResponse.length) {
      return remittanceResponse.map((remittance, index) => {
        let accordionNavigateTpl = "";
        if (hiddenRejectedTransferAccordionButton) {
          if (
            remittance.currentStatus !== "RECH" &&
            remittance.currentStatus !== "REXO" &&
            remittance.currentStatus !== "LIQN"
          ) {
            accordionNavigateTpl = this._accordionNavigateTpl(
              remittance,
              actions,
              type,
              index,
            );
          }
        } else {
          accordionNavigateTpl = this._accordionNavigateTpl(
            remittance,
            actions,
            type,
            index,
          );
        }
        return html`
          <tr
            class="tr cursor-pointer"
            data-order="${index}"
            @click="${(event) =>
              this._handleClickTBody(event, type, remittance)}"
          >
            <td class="td">
              <bbva-web-table-body-date
                date="${`${getDay(remittance.creationDate)} ${this.t(MONTHS.get(getMonth(remittance.creationDate)))}`}"
                year="${getYear(remittance.creationDate)}"
              ></bbva-web-table-body-date>
            </td>
            <td class="td">
              <bbva-web-table-body-text class="table-body-text">
                <div
                  slot="main"
                  title="${remittance.name ||
                  this.t(
                    "bbva-btge-tracking-solution-payment-no-remittance-name",
                  )}"
                  class="ellipsis-clip ellipsis"
                >
                  ${remittance.name ||
                  this.t(
                    "bbva-btge-tracking-solution-payment-no-remittance-name",
                  )}
                </div>
                <div
                  slot="sub"
                  title="${this._getDescriptionPaymentList(remittance)}"
                  class="pad-col ellipsis-clip ellipsis"
                >
                  ${this._getDescriptionPaymentList(remittance)}
                </div>
                <bbva-web-clip-box
                  slot="clip"
                  size="s"
                  icon="${remittance.isBatch
                    ? sphericaFolder()
                    : sphericaTransfer()}"
                  label="${remittance.isBatch
                    ? this.t(
                        "bbva-btge-tracking-solution-clip-box-multiple-transfer",
                      )
                    : this.t(
                        "bbva-btge-tracking-solution-clip-box-individual-transfer",
                      )}"
                  ;
                  variant="${remittance.isBatch ? "sand" : "blue"}"
                ></bbva-web-clip-box>
              </bbva-web-table-body-text>
            </td>
            <td class="td ">
              ${this._renderDescriptionBeneficiaryList(remittance)}
            </td>
            ${this._getTableBody(remittance, index, type)}
            ${this._symbolCurrentTpl(remittance)} ${accordionNavigateTpl}
          </tr>
        `;
      });
    } else if (remittanceResponse?.error) {
      return this._renderPanelContent(remittanceResponse.error);
    }
    return this._renderPanelContent(
      "empty",
      this.t("bbva-web-table-panel-info-empty-transfers"),
    );
  }

  _symbolCurrentTpl(remittance) {
    let tableBodyAmount;
    if (CURRENCY_RIGHT) {
      tableBodyAmount = html`
        <bbva-web-table-body-amount
          amount="${remittance.amount}"
          currency="${remittance.currency}"
          language="${this._amountFormatNumber}"
        >
          ${this._showCounterValueTpl(remittance)}
        </bbva-web-table-body-amount>
      `;
    } else {
      tableBodyAmount = html`
        <bbva-web-table-body-amount>
          <div slot="main" class="amount">
            <span class="number">${this._symbolCurrent}</span>
            <bbva-web-amount-format
              language="${this._amountFormatNumber}"
              amount="${remittance.amount}"
            ></bbva-web-amount-format>
          </div>
          ${this._showCounterValueTpl(remittance)}
        </bbva-web-table-body-amount>
      `;
    }
    return html`
      <td class="td symbol-number">
        ${remittance.isBatch && remittance.totalAmounts.length > 1
          ? html`
              <bbva-web-table-body-text class="text-end">
                <div>
                  ${this.t(
                    "bbva-btge-tracking-solution-table-only-text-multi-currency",
                  )}
                </div>
                <bbva-web-table-body-amount
                  class="currency-amount"
                  currency="(${this._mapSeveralCurrenciesText(
                    remittance.totalAmounts,
                  )})"
                  language="${this._amountFormatNumber}"
                ></bbva-web-table-body-amount>
              </bbva-web-table-body-text>
            `
          : tableBodyAmount}
      </td>
    `;
  }

  _getTableBody(remittance, index, type) {
    const date = new Date(remittance.creationDate);
    const newDateExpired = new Date(date.getTime() + EXPIRED_DAYS);
    const day = `${newDateExpired.getDate()}`.padStart(2, "0");
    const year = newDateExpired.getFullYear();
    const month = newDateExpired.toLocaleString("es-ES", { month: "short" });
    const newDateExpiredFormat = `${day} ${month} ${year}`;

    const badgeVariant =
      type !== REMITTANCE_DRAFTS
        ? getBadgeVariant(remittance.currentStatus)
        : "";
    const descriptionExpired =
      !DISABLED_DATE_STATE_SIGNATURE_PENDING &&
      type === REMITTANCE_PENDING &&
      PAYMENTS_EXPIRED_DATE
        ? this.t(
            "bbva-btge-tracking-solution-section-pending-message-description-expired",
            {
              DateExpired: newDateExpiredFormat,
            },
          )
        : mapStatusBadgeDescription.call(this, remittance);

    const stateMessages =
      remittance.currentStatus === PARTIALLY_SIGNED_STATUS_00 &&
      !this._isSignatureHost
        ? this.t("bbva-btge-tracking-solution-table-headers-state-FI100")
        : this.t(
            `bbva-btge-tracking-solution-table-headers-state-${remittance.currentStatus}`,
          );

    const stateInterbank = CHANGE_STATE_INTERBANK
      ? this._getStateInterbank(remittance)
      : stateMessages;

    if (!this._openedRightSidebar) {
      return type !== REMITTANCE_DRAFTS
        ? html`
            <td class="td" id="transfer-type${index}">
              ${this._renderPaymentTypeList(remittance, index)}
            </td>
            <td class="td">
              <bbva-web-table-body-badge
                class="statusBadge"
                variant=${badgeVariant}
                .description="${descriptionExpired}"
              >
                ${stateInterbank}
              </bbva-web-table-body-badge>
            </td>
          `
        : html`
            <td class="td">${this._renderPaymentTypeList(remittance)}</td>
          `;
    }
    return html``;
  }

  render() {
    return html`
      <table
        class="table table-success"
        aria-describedby="table-succes-description"
      >
        <caption class="hide-element">
          ${this.t("bbva-btge-tracking-solution-success-table-caption")}
        </caption>
        <thead class="thead">
          ${this._headTpl(REMITTANCE_MAIN)}
        </thead>
        <tbody class="tbody">
          ${this._checkTypeBodyTpl(
            this.dataRemittanceMain.items,
            REMITTANCE_MAIN,
          )}
        </tbody>
      </table>
    `;
  }
}
