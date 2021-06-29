/* eslint-disable max-len */
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
      it('should return existing + new reviews that has been sent.', async () => {
        const review = {
          'id': 'abc123',
          'name': 'Nama reviewer',
          'review': 'Isi Review!',
        };

        fetchMock.post(API_ENDPOINT.ADD_REVIEW, (_, opts) => {
          const resp = dummyData.reviews;
          resp.customerReviews.push(JSON.parse(opts.body));
          return {
            status: 200,
            body: resp,
          };
        });

        const reviewResponse = await RestoDataSource.addReview(review);
        expect(review.name)
            .toEqual(reviewResponse[1].name);
        expect(review.review)
            .toEqual(reviewResponse[1].review);
      });
    });

    describe('empty JSON response', () => {
      it('should throw error', async () => {
        fetchMock.post(API_ENDPOINT.addReview, {
          status: 200,
          body: {},
        });

        try {
          const data = await RestoDataSource.addReview({});
        } catch (error) {
          expect(error instanceof Error)
              .toEqual(true);
          expect(error.message)
              .toEqual('Terjadi kesalahan, silahkan ulangi kembali.');
        }
      });
    });

    describe('invalid JSON response', () => {
      it('should throw error', async () => {
        fetchMock.post(API_ENDPOINT.addReview, 200);
        try {
          const data = await RestoDataSource.addReview({});
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
      fetchMock.post(API_ENDPOINT.addReview, 404);
      try {
        const data = await RestoDataSource.addReview({});
      } catch (error) {
        expect(error instanceof Error)
            .toEqual(true);
        expect(error.message)
            .toEqual('Terjadi kesalahan saat memproses data.');
      }
    });
  });
});
