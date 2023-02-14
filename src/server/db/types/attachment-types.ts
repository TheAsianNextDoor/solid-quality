import type { Attachment } from '@prisma/client';

export type AttachmentWithUrl = Attachment & {
  url: string;
};
