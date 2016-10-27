/// <reference path="bundle.d.ts" />

import OAuth1Strategy = require('passport-oauth1');

new OAuth1Strategy({
    requestTokenURL: 'https://www.example.com/oauth/request_token',
    accessTokenURL: 'https://www.example.com/oauth/access_token',
    userAuthorizationURL: 'https://www.example.com/oauth/authorize',
    consumerKey: 'abc',
    consumerSecret: '123',
    callbackURL: 'http://127.0.0.1:3000/auth/example/callback',
    signatureMethod: 'RSA-SHA1'
  },
  function(token, tokenSecret, profile, cb) {
    return cb(null, {});
  }
);
