import { authMiddleware, loggerMiddleware } from './middleware';
import { t } from './singleton';

export const { router } = t;
const { procedure } = t;

export const loggedProcedure = procedure.use(loggerMiddleware);
export const protectedProcedure = t.procedure.use(loggerMiddleware).use(authMiddleware);
