import _Strategy = require('./strategy');
import _InternalOAuthError = require('./errors/internaloautherror');

declare module './strategy' {
  export const Strategy: typeof _Strategy;
  export const InternalOAuthError: typeof _InternalOAuthError;
}

export = _Strategy;
