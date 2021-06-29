/* eslint-disable no-unused-vars */
import fetchMock from 'fetch-mock';

import RestoDataSource from '../../src/scripts/data/resto-data-source';
import API_ENDPOINT from '../../src/scripts/global/api-endpoint';
import dummyData from '../helper/dummy-data';

describe('getAllResto', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe('When response status ok', () =>{
    describe('valid JSON response', () => {
      it('returns restaurant list', async () => {
        fetchMock.get(API_ENDPOINT.LIST, {
          status: 200,
          body: dummyData.getRestaurants,
        });
        const response = await RestoDataSource.getAllResto();
        expect(response.length)
            .toEqual(dummyData.getRestaurants.restaurants.length);
      });
    });

    describe('empty JSON response', () => {
      it('should throw error', async () => {
        fetchMock.get(API_ENDPOINT.LIST, {
          status: 200,
          body: {},
        });
        try {
          const response = await RestoDataSource.getAllResto();
        } catch (error) {
          expect(error instanceof Error)
              .toEqual(true);
          expect(error.message)
              .toEqual('Daftar restaurant kosong.');
        }
      });
    });

    describe('invalid JSON response', () => {
      it('should throw error', async () => {
        fetchMock.get(API_ENDPOINT.LIST, 200);
        try {
          const response = await RestoDataSource.getAllResto();
        } catch (error) {
          expect(error instanceof Error)
              .toEqual(true);
          expect(error.message)
              .toEqual('Terjadi kesalahan saat memproses data.');
        }
      });
    });
  });

  describe('When response status not ok', () =>{
    it('should throw error', async () => {
      fetchMock.get(API_ENDPOINT.LIST, 404);
      try {
        const response = await RestoDataSource.getAllResto();
      } catch (error) {
        expect(error instanceof Error)
            .toEqual(true);
        expect(error.message)
            .toEqual('Terjadi kesalahan saat memproses data.');
      }
    });
  });
});
