import type { AnyZodObject } from 'zod';

export const parseResponseParams = (schema: AnyZodObject, params: Record<string, unknown>) => {
  const parse = schema.safeParse(params);

  if (!parse.success) {
    throw new Response(JSON.stringify(parse.error), { status: 422 });
  }
};
