import { authMiddleware, loggerMiddleware } from './middleware';
import { t } from './singleton';

export const { router } = t;

export const procedure = t.procedure.use(loggerMiddleware);
export const protectedProcedure = t.procedure.use(authMiddleware).use(loggerMiddleware);
