import { ERROR_CODES } from "talk-common/errors";
import { InvalidRequestError } from "talk-framework/lib/errors";

/**
 * TODO: This is a hacky way to support custom errors during test.
 * We are currently barred from using `extensions` as it is not
 * supported inside `graphql-js` which we use for mocking away the
 * GraphQL server.
 *
 * Related file: talk-framework/testHelpers/createRelayEnvironment.ts
 * Related issue: https://github.com/graphql/graphql-js/issues/1591
 */
export default function createInvalidRequestError(code: ERROR_CODES) {
  return new InvalidRequestError({
    code,
    message: `INVALID_REQUEST_ERROR:${code}`,
  });
}
