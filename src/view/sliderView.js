import View from "./View.js";
import { MAX_SLIDER_TABS } from "../config.js";
import { INITIAL_SLIDER_POSITION } from "../config.js";

class SliderView extends View {
  constructor() {
    super();
    this._setSlidePosition();
    this._addHandlerSlideLeft();
    this._addHandlerSlideRight();
    this._addHandlerSlideArrows();
    this._createSliderTabs();
    this._addHandlerTabBtns();
  }

  _allSlides = document.querySelectorAll(".slide");
  _slideBtnLeft = document.querySelector(".sliderBtn-left");
  _slideBtnRight = document.querySelector(".sliderBtn-right");
  _currentSlide = INITIAL_SLIDER_POSITION;
  _maxSlides = this._allSlides.length;

  _sliderTabsEl = document.querySelector(".slider-tabs");

  _setSlidePosition() {
    this._allSlides.forEach(
      (el, i) => (el.style.transform = `translateX(${i * 100}%)`)
    );
  }

  _goToSlide(slide) {
    this._allSlides.forEach(
      (el, i) => (el.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  }

  _slideRight() {
    if (this._currentSlide >= this._maxSlides - 1) {
      this._currentSlide = INITIAL_SLIDER_POSITION;
    } else {
      this._currentSlide++;
    }

    this._goToSlide(this._currentSlide);
    this._activateTab();
  }

  _slideLeft() {
    if (this._currentSlide <= 0) this._currentSlide = MAX_SLIDER_TABS;
    this._currentSlide--;
    this._goToSlide(this._currentSlide);
    this._activateTab();
  }

  _addHandlerSlideLeft() {
    this._slideBtnLeft.addEventListener("click", this._slideLeft.bind(this));
  }
  _addHandlerSlideRight() {
    this._slideBtnRight.addEventListener("click", this._slideRight.bind(this));
  }

  _addHandlerSlideArrows() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") this._slideLeft();
      e.key === "ArrowRight" && this._slideRight();
    });
  }

  _createSliderTabs() {
    this._allSlides.forEach((e, i) => {
      this._sliderTabsEl.insertAdjacentHTML(
        "beforeend",
        `<button class="tab" data-slide='${i}'></button>`
      );
    });
    this._activateTab();
  }

  _sliderBtnHandler(e) {
    if (e.target.classList.contains("tab")) {
      console.log(`Curent slide - ${this._currentSlide}`);
      console.log(`Target slide - ${e.target.dataset.slide}`);

      this._goToSlide(e.target.dataset.slide);
      this._currentSlide = e.target.dataset.slide;
      console.log(`Curent slide - ${this._currentSlide}`);
      console.log(`Target slide - ${e.target.dataset.slide}`);
      this._activateTab();
    }
  }

  _addHandlerTabBtns() {
    this._sliderTabsEl.addEventListener(
      "click",
      this._sliderBtnHandler.bind(this)
    );
  }

  _activateTab() {
    document
      .querySelectorAll(".tab")
      .forEach((el, i) => el.classList.remove("tab-active"));
    document
      .querySelector(`.tab[data-slide="${this._currentSlide}"]`)
      .classList.add("tab-active");
  }
}

export default new SliderView();
