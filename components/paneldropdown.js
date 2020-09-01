import React from "react";
import CurrencyItems from "./currencydropdown";
class paneldropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCurr: this.props.currency,
      currentFlag: this.props.flag,
      convert: this.props.convert,
    };
  }

  handleHover = (e, node) => {
    var input_wrapper = document.getElementsByClassName(node);
    for (let i = 0; i < input_wrapper.length; i++) {
      const element = input_wrapper[i];
      element.classList.add("normalBorder");
      if (element.classList.contains("activeFocus")) {
        element.classList.add("activeFocus");
      }
    }
    e.currentTarget.parentNode.classList.add("activeHover");
  };
  handleLeave = (e) => {
    e.currentTarget.parentNode.classList.remove("activeHover");
    e.currentTarget.parentNode.classList.add("normalBorder");
  };
  handleDown = (e, node) => {
    var input_wrapper = document.getElementsByClassName(node);
    for (let i = 0; i < input_wrapper.length; i++) {
      const element = input_wrapper[i];
      element.classList.remove("activeFocus");
    }
    e.currentTarget.parentNode.classList.remove("activeHover");
    e.currentTarget.parentNode.classList.remove("normalBorder");
    e.currentTarget.parentNode.classList.add("activeFocus");
    this.showDropDown(e);
  };
  showDropDown = (e) => {
    this.props.showDropDown(true, e);
  };

  setCurrency = (currency) => {
    this.props.selected(currency);
  };
  hideCurrency = (e) => {
    this.props.hideDropDown(false);
  };

  removeCurrencyFromDropdown = () => {
    var res = this.props.allCurrencies.filter((item) => {
      return item.name !== this.props.filterCurrency;
    });
    return res;
  };
  render() {
    return (
      <div className="panel_dropdown">
        <div className="label_convert">
          <label>{this.state.convert}</label>
        </div>
        <div className="panel_drop_option">
          {!this.props.showDrop ? null : (
            <CurrencyItems
              dropCurrency={this.setCurrency}
              hideCurrency={(e) => {
                this.hideCurrency(e);
              }}
              currencies={this.removeCurrencyFromDropdown()}
            />
          )}
          <div
            title={this.props.currency}
            className="panel_drop_select"
            onMouseEnter={(e) => this.handleHover(e, "panel_drop_option")}
            onMouseLeave={(e) => this.handleLeave(e, "panel_drop_option")}
            onClick={(e) => {
              this.handleDown(e, "panel_drop_option");
            }}
          >
            <div className="panel_flag">
              <img src={this.props.flag} alt="" />
            </div>
            <div className="panel_curr_info">
              <span>{this.props.currency}</span>
            </div>
            <div className="drop_arrow">
              <i>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="angle-down"
                  className="svg-inline--fa fa-angle-down fa-w-10"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                >
                  <path
                    fill="currentColor"
                    d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"
                  ></path>
                </svg>
              </i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default paneldropdown;
