const assert = require('assert');

Feature('Favoriting Restaurants');

Before(({I}) => {
  // Navigate to favorite resto page
  I.amOnPage('/#/favorite');
});

Scenario('Showing empty favorited resto', ({I}) => {
  // Favorite resto page should show empty resto
  I.seeElement('favorite-page');
  I.see('Daftar restaurant kosong', '.message__content');
});

Scenario('Favoriting one Restaurant', async ({I}) => {
  I.see('Daftar restaurant kosong', '.message__content');

  // Navigate to homepage
  I.amOnPage('/');

  // Resto list should display with the resto name
  I.seeElement('.resto__name');

  const firstResto = locate('.resto__name').first();
  const firstRestoName = await I.grabTextFrom(firstResto);

  // Navigate to first resto detail
  I.click(firstResto);

  // Detail page should display
  I.seeElement('detail-page');
  // Fav Button should display
  I.seeElement('#fav-button');
  // Fav Button clicked to favoriting this resto
  I.click('#fav-button');

  // After fav button clicked, snackbar should displayed
  I.see('Restaurant berhasil ditambahkan ke favorite', '#snackbar');

  // Navigate to favorite resto list
  I.amOnPage('/#/favorite');
  I.seeElement('.resto__item');

  const favoritedRestoName = await I.grabTextFrom('.resto__name');

  // Resto name that has been favorited should same.
  assert.strictEqual(firstRestoName, favoritedRestoName);
});
