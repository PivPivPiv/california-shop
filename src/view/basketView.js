import View from "./View";

class BasketView extends View {
  constructor() {
    super();
    this._addHandlerShowBasket();
    this._addHandlerHideBasket();
    this._addHandlerHideBasketOverlay();
  }

  _basketBtn = document.querySelector(".header-basket");
  _basketCloseBtn = document.querySelector(".basket-modal-closeBtn");
  _basketEl = document.querySelector(".basket");
  _overlayEl = document.querySelector(".overlay");

  _showBasket() {
    this._basketEl.classList.add("basket-active");
    this._overlayEl.classList.add("basket-active");
  }
  _hideBasket() {
    this._basketEl.classList.remove("basket-active");
    this._overlayEl.classList.remove("basket-active");
  }
  _hideBasketOverlay() {
    this._overlayEl.classList.remove("basket-active");
    this._basketEl.classList.remove("basket-active");
  }

  _addHandlerShowBasket() {
    this._basketBtn.addEventListener("click", this._showBasket.bind(this));
  }
  _addHandlerHideBasket() {
    this._basketCloseBtn.addEventListener("click", this._hideBasket.bind(this));
  }
  _addHandlerHideBasketOverlay() {
    this._overlayEl.addEventListener(
      "click",
      this._hideBasketOverlay.bind(this)
    );
  }
}

export default new BasketView();
