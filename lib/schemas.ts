import { z } from 'zod';
import { notifs } from './notifications';

export const CreateBoardSchema = z.object({
  title: z.string().min(3, notifs.BOARD.MIN_TITLE_LENGTH),
});

export const CreateColumnSchema = z.object({
  title: z.string().min(3, notifs.COLUMN.MIN_TITLE_LENGTH),
});
