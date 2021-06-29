/* eslint-disable max-len */
const itActsAsFavoriteRestoModel = (favoriteResto) => {
  it('should return the resto that has been added', async () => {
    await favoriteResto.putResto({id: 1});
    await favoriteResto.putResto({id: 2});

    expect(await favoriteResto.getResto(1))
        .toEqual({id: 1});
    expect(await favoriteResto.getResto(2))
        .toEqual({id: 2});
    expect(await favoriteResto.getResto(3))
        .toEqual(undefined);
  });

  it('should refuse a resto from being added if it does not have the correct property', async () => {
    await favoriteResto.putResto({aProperty: 'property'});

    expect(await favoriteResto.getAllResto())
        .toEqual([]);
  });

  it('can return all of the resto that have been added', async () => {
    await favoriteResto.putResto({id: 1});
    await favoriteResto.putResto({id: 2});

    expect(await favoriteResto.getAllResto())
        .toEqual([
          {id: 1},
          {id: 2},
        ]);
  });

  it('should remove favorite resto', async () => {
    await favoriteResto.putResto({id: 1});
    await favoriteResto.putResto({id: 2});
    await favoriteResto.putResto({id: 3});

    await favoriteResto.deleteResto(1);

    expect(await favoriteResto.getAllResto())
        .toEqual([
          {id: 2},
          {id: 3},
        ]);
  });

  it('should handle request to remove a resto even though the resto has not been added', async () => {
    await favoriteResto.putResto({id: 1});
    await favoriteResto.putResto({id: 2});
    await favoriteResto.putResto({id: 3});

    await favoriteResto.deleteResto(4);

    expect(await favoriteResto.getAllResto())
        .toEqual([
          {id: 1},
          {id: 2},
          {id: 3},
        ]);
  });
};

export default itActsAsFavoriteRestoModel;
