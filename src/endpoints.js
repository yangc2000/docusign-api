'use strict';

var endpoint = {

  login: '/login_information',

  createEnvelopeFromTemplate: '/envelopes',

  getRecipientView: function (envelopeId) {
    return this.createEnvelopeFromTemplate + '/' + envelopeId + '/views/recipient';
  },
  getEnvelopeStatus: function(envelopeId) {
  	return this.createEnvelopeFromTemplate + '/' + envelopeId;
  },
  getSenderView: function (envelopeId) {
    return this.createEnvelopeFromTemplate + '/' + envelopeId + '/views/sender';
  }
};

module.exports = endpoint;
