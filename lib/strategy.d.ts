import Strategy = require('passport-strategy');
import Store = require('./requesttoken/session');

/**
 * The OAuth authentication strategy authenticates requests using the OAuth
 * protocol.
 *
 * OAuth provides a facility for delegated authentication, whereby users can
 * authenticate using a third-party service such as Twitter.  Delegating in this
 * manner involves a sequence of events, including redirecting the user to the
 * third-party service for authorization.  Once authorization has been obtained,
 * the user is redirected back to the application and a token can be used to
 * obtain credentials.
 *
 * Applications must supply a `verify` callback, for which the function
 * signature is:
 *
 *     function(token, tokenSecret, profile, cb) { ... }
 *
 * The verify callback is responsible for finding or creating the user, and
 * invoking `cb` with the following arguments:
 *
 *     done(err, user, info);
 *
 * `user` should be set to `false` to indicate an authentication failure.
 * Additional `info` can optionally be passed as a third argument, typically
 * used to display informational messages.  If an exception occured, `err`
 * should be set.
 *
 * Examples:
 *
 *     passport.use(new OAuthStrategy({
 *         requestTokenURL: 'https://www.example.com/oauth/request_token',
 *         accessTokenURL: 'https://www.example.com/oauth/access_token',
 *         userAuthorizationURL: 'https://www.example.com/oauth/authorize',
 *         consumerKey: '123-456-789',
 *         consumerSecret: 'shhh-its-a-secret'
 *         callbackURL: 'https://www.example.net/auth/example/callback'
 *       },
 *       function(token, tokenSecret, profile, cb) {
 *         User.findOrCreate(..., function (err, user) {
 *           cb(err, user);
 *         });
 *       }
 *     ));
 */
declare class OAuth1Strategy <P extends any> implements Strategy {
  name: string;

  constructor (options: OAuth1Strategy.Options, cb: OAuth1Strategy.VerifyFunction<P>);

  /**
   * Authenticate request by delegating to a service provider using OAuth.
   */
  authenticate (req: OAuth1Strategy.Request, options: OAuth1Strategy.AuthenticateOptions): void;

  /**
   * Retrieve user profile from service provider.
   *
   * OAuth-based authentication strategies can overrride this function in order to
   * load the user's profile from the service provider.  This assists applications
   * (and users of those applications) in the initial registration process by
   * automatically submitting required information.
   */
  userProfile (accessToken: string, done: (err: Error | null, profile: P) => void): void;

  /**
   * Return extra parameters to be included in the user authorization request.
   *
   * Some OAuth providers allow additional, non-standard parameters to be included
   * when requesting authorization.  Since these parameters are not standardized
   * by the OAuth specification, OAuth-based authentication strategies can
   * overrride this function in order to populate these parameters as required by
   * the provider.
   */
  userAuthorizationParams (options: OAuth1Strategy.AuthenticateOptions): { [key: string]: string };

  /**
   * Return extra parameters to be included in the request token request.
   *
   * Some OAuth providers require additional parameters to be included when
   * issuing a request token.  Since these parameters are not standardized by the
   * OAuth specification, OAuth-based authentication strategies can overrride this
   * function in order to populate these parameters as required by the provider.
   */
  requestTokenParams (options: OAuth1Strategy.AuthenticateOptions): { [key: string]: string };

  /**
   * Parse error response from OAuth endpoint.
   *
   * OAuth-based authentication strategies can overrride this function in order to
   * parse error responses received from the request token and access token
   * endpoints, allowing the most informative message to be displayed.
   *
   * If this function is not overridden, a generic error will be thrown.
   */
  parseErrorResponse (body: string, status: number): Error | null;
}

declare namespace OAuth1Strategy {
  export interface Options extends OAuth1Options {
    requestTokenURL: string;
    accessTokenURL: string;
    userAuthorizationURL: string;
  }

  export interface OAuth1Options {
    /**
     * URL used to obtain an unauthorized request token.
     */
    requestTokenURL?: string;
    /**
     * URL used to exchange a user-authorized request token for an access token.
     */
    accessTokenURL?: string;
    /**
     * URL used to obtain user authorization.
     */
    userAuthorizationURL?: string;
    /**
     * Identifies client to service provider.
     */
    consumerKey: string;
    /**
     * Secret used to establish ownership of the consumer key.
     */
    consumerSecret: string;
    /**
     * Signature method used to sign the request (default: 'HMAC-SHA1').
     */
    signatureMethod?: string;
    /**
     * URL to which the service provider will redirect the user after obtaining authorization.
     */
    callbackURL: string;
    /**
     * When `true`, `req` is the first argument to the verify callback (default: `false`).
     */
    passReqToCallback?: boolean;
    sessionKey?: string;
    requestTokenStore?: Store;
    proxy?: boolean;
    skipUserProfile?: boolean;
  }

  export interface Request extends Strategy.Request {
    query: {
      [key: string]: string;
    };
  }

  export interface AuthenticateOptions {
    callbackURL: string;
  }

  export interface VerifyFunction <P> {
    (accessToken: string, refreshToken: string, profile: P, done: (err: Error | null, user: any | boolean, info?: any) => void): void;
  }
}

export = OAuth1Strategy;
