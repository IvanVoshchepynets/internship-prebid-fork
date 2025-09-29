import { expect } from 'chai';
import { spec } from 'modules/voshchepynetsBidAdapter.js';

describe('VoshchepynetsBidAdapter', function () {
  const bid = {
    bidder: 'voshchepynetsBidAdapter',
    params: { placementId: '123' }
  };

  it('valid bid', function () {
    expect(spec.isBidRequestValid(bid)).to.equal(true);
  });

  it('invalid bid', function () {
    expect(spec.isBidRequestValid({})).to.equal(false);
  });

  it('build request', function () {
    const request = spec.buildRequests([bid], { refererInfo: { page: 'test' } });
    expect(request[0].data.placementId).to.equal('123');
  });

  it('interpret response', function () {
    const response = {
      body: {
        bids: [{
          cpm: 1.23,
          width: 300,
          height: 250,
          ad: '<div>ad</div>'
        }]
      }
    };
    const result = spec.interpretResponse(response, { data: { bidId: 'test' } });
    expect(result[0].cpm).to.equal(1.23);
  });
});
