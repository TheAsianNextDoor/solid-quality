import { BadRequestError } from './bad-request-error';

export class MissingResourceError extends BadRequestError {
  constructor({ missingResource, cause }: { missingResource: string; cause?: Error }) {
    super({ message: `Missing resource - ${missingResource}`, cause });
  }
}
