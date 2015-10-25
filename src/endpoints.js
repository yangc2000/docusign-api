'use strict';

var endpoint = {

  login: '/login_information',

  createEnvelopeFromTemplate: '/envelopes',

  moveEnvelope: '/folders',

  getRecipientView: function (envelopeId) {
    return this.createEnvelopeFromTemplate + '/' + envelopeId + '/views/recipient';
  },
  getEnvelopeStatus: function(envelopeId) {
  	return this.createEnvelopeFromTemplate + '/' + envelopeId;
  },
  getSenderView: function (envelopeId) {
    return this.createEnvelopeFromTemplate + '/' + envelopeId + '/views/sender';
  },
  deleteEnvelope : function(envelopeId) {
    return this.moveEnvelope + '/recyclebin';

  }

};

module.exports = endpoint;
