'use strict';

var request = require('request');
var schema = require('./schema');
var endpoint = require('./endpoints');
var Helper = require('./helper/Helper');

function DocuSign(config, req) {
  this.isProduction = config.isProduction;
  schema.config.assert(config);

  this.helper = new Helper(config, req || request);
}

DocuSign.prototype.login = function () {
  console.log("in DocuSign login... isProduction=" + this.isProduction);
  var url = this.isProduction ? 
            'https://www.docusign.net/restapi/v2/login_information' :
            'https://demo.docusign.net/restapi/v2/login_information';

  return this.helper
    .get(url, '', 'GET')
    .then(function (response) {
      return response.loginAccounts[0];
    });
};

/**
 * Request a DocuSign signature via a pre-defined Template.
 *
 * @see {@link https://www.docusign.com/p/RESTAPIGuide/Content/REST%20API%20References/Send%20an%20Envelope%20from%20a%20Template.htm}
 * @param {Object} envelopeRequest
 * @returns {Promise} Returns a promise that eventually returns ID of envelope that was created
 */
DocuSign.prototype.requestSignature = function (envelopeRequest) {
  var self = this;

  return self.helper
    .validateSchema(envelopeRequest)
    .then(function () {
      return self.login();
    })
    .then(function (response) {
      var url = response.baseUrl + endpoint.createEnvelopeFromTemplate;
      return self.helper.get(url, envelopeRequest, 'POST');
    })
    .then(function (response) {
      return response.envelopeId;
    });
};

DocuSign.prototype.getRecipientView = function (envelopeId, recipientRequest) {
  var self = this;

  return self.helper
    .validateSchema(recipientRequest)
    .then(function () {
      return self.login();
    })
    .then(function (response) {
      var url = response.baseUrl + endpoint.getRecipientView(envelopeId);
      return self.helper.get(url, recipientRequest, 'POST');
    });
};

DocuSign.prototype.getEnvelopeStatus = function (envelopeId) {
  var self = this;

  return self.login()
    .then(function (response) {
      var url = response.baseUrl + endpoint.getEnvelopeStatus(envelopeId);
      return self.helper.get(url, {}, 'GET');
    });
};

DocuSign.prototype.getSenderView = function (envelopeId, recipientRequest) {
  var self = this;

  return self.helper
    .validateSchema(recipientRequest)
    .then(function () {
      return self.login();
    })
    .then(function (response) {
      var url = response.baseUrl + endpoint.getSenderView(envelopeId);
      return self.helper.get(url, recipientRequest, 'POST');
    });
};

DocuSign.prototype.deleteEnvelope = function (envelopeId) {
  var self = this;

  var msg = { "envelopeIds" : [ envelopeId ] };
  return self.login()
    .then(function (response) {
      var url = response.baseUrl + endpoint.deleteEnvelope(envelopeId);
      return self.helper.get(url, msg, 'PUT');
    });
};

module.exports = DocuSign;
