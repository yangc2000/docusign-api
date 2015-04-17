'use strict';

var _ = require('lodash');
var addRequestHeaders = require('./addRequestHeaders');
var addMultipartHeaders = require('./addMultipartHeaders');

function initializeRequest(url, method, body, authConfig) {
  var options = {
    method: method,
    uri: url,
    body: JSON.stringify(body),
    headers: {}
  };

  var authRequest = addRequestHeaders(authConfig);
  _.merge(options, authRequest);

  var multipartRequest = addMultipartHeaders(body);
  _.merge(options, multipartRequest);

  return options;
}

module.exports = initializeRequest;
