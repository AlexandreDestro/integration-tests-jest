const pactum = require('pactum');
const { StatusCodes } = require('http-status-codes');
const { SimpleReporter } = require('../simple-reporter');

describe('Coinlore API', () => {
  const p = pactum;
  const rep = SimpleReporter;
  const baseUrl = 'https://api.coinlore.net/api';

  p.request.setDefaultTimeout(30000);

  beforeAll(() => p.reporter.add(rep));
  afterAll(() => p.reporter.end());

  // ----- Tickes -----
  describe('Tickers', () => {
    it('Get all tickers', async () => {
      await p
        .spec()
        .get(`${baseUrl}/tickers/`)
        .expectStatus(StatusCodes.OK)
        .expectJsonLike({
          data: [
            {
              id: /\d+/,
              symbol: /\w+/,
              name: /\w+/
            }
          ]
        });
    });

    it('Get Bitcoin by ID', async () => {
      await p
        .spec()
        .get(`${baseUrl}/ticker/?id=90`)
        .expectStatus(StatusCodes.OK)
        .expectJsonLike([
          {
            id: '90',
            symbol: 'BTC',
            name: 'Bitcoin'
          }
        ]);
    });
  });

  // ----- Global -----
  describe('Global Market', () => {
    it('Get global market data', async () => {
      await p
        .spec()
        .get(`${baseUrl}/global/`)
        .expectStatus(StatusCodes.OK)
        .expectJsonLike([
          {
            coins_count: /\d+/,
            active_markets: /\d+/,
            total_mcap: /\d+/,
            total_volume: /\d+/
          }
        ]);
    });
  });

  // ----- Exchanges -----
  describe('Exchanges', () => {

    it('Get all exchanges', async () => {
      await p
        .spec()
        .get(`${baseUrl}/exchanges/`)
        .expectStatus(StatusCodes.OK)
        .expectJsonLike({
          '5': {
            id: '5',
            name: /\w+/,
            url: /https?:\/\/.+/,
            country: /\w+/
          }
        });
    });
// ----- ta dando pau -----
        it('Get exchange data by ID (Binance)', async () => {
        await p
            .spec()
            .get(`${baseUrl}/exchange/?id=5`)
            .expectStatus(StatusCodes.OK)
            .expectJsonLike({
            '0': {
                name: /\w+/,
                date_live: /\d{4}-\d{2}-\d{2}/,
                url: /https?:\/\/.+/
            },
            pairs: [
                {
                base: /\w+/,
                quote: /\w+/,
                volume: /\d+/,
                price: /\d+/,
                price_usd: /\d+/,
                time: /\d+/
                }
            ]
        });
    });


  });
});
