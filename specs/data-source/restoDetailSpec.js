/* eslint-disable no-unused-vars */
import fetchMock from 'fetch-mock';

import RestoDataSource from '../../src/scripts/data/resto-data-source';
import API_ENDPOINT from '../../src/scripts/global/api-endpoint';
import dummyData from '../helper/dummy-data';

describe('getRestoDetail', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe('When response status ok', () =>{
    describe('valid JSON response', () => {
      it('returns restaurant detail', async () => {
        fetchMock.get(API_ENDPOINT.DETAIL('123'), {
          status: 200,
          body: dummyData.getRestaurantDetail,
        });
        const response = await RestoDataSource.getRestoDetail('123');
        expect(response)
            .toEqual(dummyData.getRestaurantDetail.restaurant);
      });
    });

    describe('empty JSON response', () => {
      it('should throw error', async () => {
        fetchMock.get(API_ENDPOINT.DETAIL('123'), {
          status: 200,
          body: {},
        });
        try {
          const response = await RestoDataSource.getRestoDetail('123');
        } catch (error) {
          expect(error instanceof Error)
              .toEqual(true);
          expect(error.message)
              .toEqual('Detail restaurant tidak ditemukan.');
        }
      });
    });

    describe('invalid JSON response', () => {
      it('should throw error', async () => {
        fetchMock.get(API_ENDPOINT.DETAIL('123'), 200);
        try {
          const response = await RestoDataSource.getRestoDetail('123');
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
      fetchMock.get(API_ENDPOINT.DETAIL('123'), 404);
      try {
        const response = await RestoDataSource.getRestoDetail('123');
      } catch (error) {
        expect(error instanceof Error)
            .toEqual(true);
        expect(error.message)
            .toEqual('Terjadi kesalahan saat memproses data.');
      }
    });
  });
});
