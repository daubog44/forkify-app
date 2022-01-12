import view from './view.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends view {
  _parentElemnt = document.querySelector('.pagination');

  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    const pagePrevMarkup = function () {
      return `
          <button data-goto="${
            currPage - 1
          }" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${currPage - 1}</span>
              </button>`;
    };

    const pageNextMarkup = function () {
      return `
          <button data-goto="${
            currPage + 1
          }" class="btn--inline pagination__btn--next">
                <span>Page ${currPage + 1}</span>
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-right"></use>
                </svg>
              </button>`;
    };

    // page 1, and there are other pages
    if (currPage === 1 && numPages > 1) {
      return pageNextMarkup();
    }
    // page 1, and there are NO other pages
    if (currPage === 1 && numPages === 1) {
      return;
    }
    // last page
    if (currPage === numPages && numPages > 1) {
      return pagePrevMarkup();
    }
    // other page
    if (currPage < numPages && currPage > 1) {
      return pagePrevMarkup().concat(pageNextMarkup());
    }
  }
  addHandlerClick(handler) {
    this._parentElemnt.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const gotoPage = +btn.dataset.goto;

      handler(gotoPage);
    });
  }
}

export default new PaginationView();
