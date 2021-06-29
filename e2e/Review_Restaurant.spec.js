/* eslint-disable max-len */
const assert = require('assert');

Feature('Review Restaurant');

Before(({I}) => {
  // Navigate to homepage
  I.amOnPage('/');

  // Navigate to first resto detail
  I.click(locate('.resto__name').at(3));
});

Scenario('Reviewing a Restaurant', async ({I}) => {
  // Dummy data
  const timeStamp = Date.now();
  const nameOfReviewer = `Reviewer ${timeStamp}`;
  const reviewContent = `Review ${timeStamp}`;

  // Review form should displayed
  I.seeElement('#review-form');

  // Fill form with dummy data and then submit.
  I.fillField('#name', nameOfReviewer);
  I.fillField('#review', reviewContent);
  I.click('button[type="submit"]');

  // Wait until the button loading indicator show.
  // This means that review data is being sent.
  I.waitForElement('.btn__loading', 5);

  // Wait until the button loading indicator gone.
  // This means, the review data has been sent successfully.
  I.waitToHide('.btn__loading', 5);

  // The review data that has been successfully sent will be returned in
  // the response data and it will displayed at the end of the review list.
  const submittedNameOfReviewer = await I
      .grabTextFrom(locate('.review_item .review_name').last());
  const submittedReviewContent = await I
      .grabTextFrom(locate('.review_item p').last());

  // So our last step is to compare the data that has been sent with the
  // response received is the same or not.
  assert.strictEqual(nameOfReviewer, submittedNameOfReviewer);
  assert.strictEqual(reviewContent, submittedReviewContent);
});
