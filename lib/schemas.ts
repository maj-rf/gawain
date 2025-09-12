import { z } from 'zod';
import { notifs } from './notifications';

export const CreateFormSchema = z.object({
  title: z.string().min(3, notifs.COMMON.MIN_TITLE_LENGTH),
});
