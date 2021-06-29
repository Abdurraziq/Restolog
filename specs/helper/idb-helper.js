import FavoriteRestoIdb from '../../src/scripts/data/favorite-resto-idb';

const clearIdb = async () => {
  const allRestodata = await FavoriteRestoIdb.getAllResto();
  allRestodata.forEach(async (resto) => {
    await FavoriteRestoIdb.deleteResto(resto.id);
  });
};

export {clearIdb};
