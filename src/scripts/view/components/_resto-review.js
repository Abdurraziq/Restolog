import accountIcon from '../../../public/images/icons/account_circle.svg';

class RestoReview extends HTMLElement {
  constructor() {
    super();
    this._loadMoreButtonHandler = this._onLoadMoreButtonClick.bind(this);
  }

  set reviews(customerReviews) {
    this._reviews = customerReviews;
    this._render();
  }

  _render() {
    this.innerHTML = /* html */`
      <h2>Review Palanggang</h2>
    `;
    this._reviewList = document.createElement('ul');
    this.appendChild(this._reviewList);

    this._renderReviewContent();
    this._renderReviewForm();
  }

  _renderReviewContent() {
    this._reviewList.innerHTML = '';

    if (this._reviews.length > 4) {
      const firstThreeReviews = this._reviews.slice(0, 3);
      const lastReview = this._reviews.slice(-1);

      // Show only first three and the last Reviews and
      // a button (to load/show all Reviews) in the middle.
      this._renderReviews(firstThreeReviews);
      this._createLoadMoreButton();
      this._renderReviews(lastReview);
    } else {
      this._renderReviews(this._reviews);
    }
  }

  /**
   * Render all Review content based on reviews array.
   * @param {Array} reviews an Object array from review to iterate over.
   */
  _renderReviews(reviews) {
    reviews.forEach((review) => {
      const reviewItem = this._renderReviewItem(review);
      this._reviewList.insertAdjacentHTML('beforeend', reviewItem);
    });
  }

  /**
   * Render review data object as a string that contain html list (li)
   * element.
   * @param {Object} reviews - review data
   * @param {string} reviews.name - name of reviewer
   * @param {string} reviews.review - review content
   * @param {string} reviews.date - date of review
   * @return {string} - Return a string contain html list (li) element.
   */
  _renderReviewItem({name, review, date}) {
    return /* html*/`
      <li class="review_item">
        <img
          src="${accountIcon}"
          alt="Foto dari akun ${name}"
          width="48"
          height="48"
          class="reviewer_photo"
          >
        <div class="review_content">
          <p class="review_name">${name}</p>
          <p class="review_date">${date}</p>
          <p>${review}</p>
        </div>
      </li>
    `;
  }

  _createLoadMoreButton() {
    const loadMoreButton = /* html*/`
      <li><button id="load-more">Tampilkan review lainnya...</button></li>
    `;
    this._reviewList.insertAdjacentHTML('beforeend', loadMoreButton);
    this._loadMoreButton = this.querySelector('#load-more');
    this._loadMoreButton.addEventListener('click', this._loadMoreButtonHandler);
  }

  /**
   * Remove last review item that showing and than show all last review item.
   * The last, remove load more button from this._reviewList element.
   */
  _onLoadMoreButtonClick() {
    const allLastReview = this._reviews.slice(3, this._reviews.length);
    const lastItem = this._reviewList.childNodes[13];
    this._reviewList.removeChild(lastItem);
    this._renderReviews(allLastReview);
    this._loadMoreButton.remove();
  }

  _renderReviewForm() {
    this.insertAdjacentHTML('beforeend', /* html*/`
      <h2>Review Kamu</h2>
      <section class="review_item">
        <img
          src="${accountIcon}"
          alt="Foto dari akun Anda"
          width="48"
          height="48"
          class="reviewer_photo">
        <form id="review-form" autocomplete="off">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Masukkan nama Kamu..."
            required>
          <textarea
            name="review"
            id="review"
            placeholder="Masukkan review Kamu..."></textarea>
          <button type="submit" aria-label="Submit review">
            <span class="btn__loading"></span>
            <span>Submit</span>
          </button>
        </form>
      </section>
    `);
  }

  /**
   * Re-render new review after review was successful submit
   * @param {Object} customerReviews review data object.
   */
  reRenderReviewElement(customerReviews) {
    this._reviews = customerReviews;
    this._renderReviewContent();
  }
}

customElements.define('resto-review', RestoReview);
