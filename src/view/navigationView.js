import View from "./View.js";
import { REVEAL_SECTION_THRESHOLD_SEC } from "../config.js";
class NavigationView extends View {
  constructor() {
    super();
    this._addObserver();
    this._addHandlerScrollToSearch();
  }

  _searchBtn = document.querySelector(".header-search");
  _allSectionsForReveal = document.querySelectorAll(".reveal");
  _searchSectionEl = document.querySelector(".search");

  _scrollToSearch() {
    this._searchSectionEl.scrollIntoView({ behavior: "smooth" });
  }
  _addHandlerScrollToSearch() {
    this._searchBtn.addEventListener("click", this._scrollToSearch.bind(this));
  }

  _addObserver() {
    const revealSection = function (entries, observer) {
      const [entry] = entries;

      entry.target.classList.remove("section-hidden");
    };

    const obsOptions = {
      root: null,
      threshold: REVEAL_SECTION_THRESHOLD_SEC,
    };

    const observer = new IntersectionObserver(revealSection, obsOptions);
    this._allSectionsForReveal.forEach(function (section) {
      observer.observe(section);
      section.classList.add("section-hidden");
    });
  }
}

export default new NavigationView();
