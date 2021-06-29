const assert = require('assert');

Feature('UnFavoriting Restaurants');

let firstRestoName;

Before(async ({I}) => {
  // Navigate to homepage
  I.amOnPage('/');

  // Resto list should display with their own names
  I.seeElement('.resto__name');
  const firstResto = locate('.resto__name').first();
  firstRestoName = await I.grabTextFrom(firstResto);

  // Navigate to first resto detail
  I.click(firstResto);

  // Fav Button should display
  I.seeElement('#fav-button');

  // Clicked fav button to favoriting its restaurant
  I.click('#fav-button');

  // Navigate to favorite resto page
  I.amOnPage('/#/favorite');
});

Scenario('Showing favorited resto', async ({I}) => {
  I.seeElement('favorite-page');
  const favoritedRestoName = await I.grabTextFrom('.resto__name');

  // Resto name that has been favorited should same.
  assert.strictEqual(firstRestoName, favoritedRestoName);
});

Scenario('Unfavoriting a resto', ({I}) => {
  I.seeElement('.resto__name');

  // Navigate to first resto detail
  I.click(locate('.resto__name').first());

  // Fav Button should display
  I.seeElement('#fav-button');
  // Fav Button clicked to unfavoriting this resto
  I.click('#fav-button');

  // After unfavorited button clicked, snackbar should displayed
  I.see('Restaurant berhasil dihapus dari favorite', '#snackbar');

  // Navigate to favorite resto page
  I.amOnPage('/#/favorite');

  // Favorite resto page should show empty resto
  I.seeElement('favorite-page');
  I.see('Daftar restaurant kosong', '.message__content');
});
