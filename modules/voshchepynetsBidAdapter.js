import { registerBidder } from '../src/adapters/bidderFactory.js';

const BIDDER_CODE = 'voshchepynetsBidAdapter';

const spec = {
  code: BIDDER_CODE,
  aliases: ['voshchepynetsAdapter'],
  isBidRequestValid: (bid) => {
    return !!bid.params.placementId;
  },
  buildRequests: (validBidRequests, bidderRequest) => {
    return validBidRequests.map(bid => {
      return {
        method: 'POST',
        url: 'https://example.com/bid',
        data: {
          placementId: bid.params.placementId,
          bidId: bid.bidId,
          referer: bidderRequest.refererInfo.page
        }
      };
    });
  },
  interpretResponse: (serverResponse, request) => {
    const bidResponses = [];
    if (serverResponse.body && serverResponse.body.bids) {
      serverResponse.body.bids.forEach(bid => {
        bidResponses.push({
          requestId: request.data.bidId,
          cpm: bid.cpm,
          width: bid.width,
          height: bid.height,
          ad: bid.ad,
          currency: 'USD',
          netRevenue: true,
          ttl: 300,
        });
      });
    }
    return bidResponses;
  }
};

registerBidder(spec);
export { spec };
