import * as BadRequest from './bad-request';
import * as Conflict from './conflict';
import * as Forbidden from './forbidden';
import * as InternalServer from './internal-server';
import * as NotFound from './not-found';
import * as Timeout from './timeout';
import * as TooManyRequests from './too-many-requests';
import * as Unauthorized from './unauthorized';

export const RequestError = {
  ...BadRequest,
  ...Conflict,
  ...Forbidden,
  ...InternalServer,
  ...NotFound,
  ...Timeout,
  ...TooManyRequests,
  ...Unauthorized,
};
