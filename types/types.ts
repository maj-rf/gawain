import { TBoard, TCard, TColumn } from '@/db/schema';
import { PropsWithChildren } from 'react';

export type State = {
  success: boolean;
  message: string;
};

export type CreateActionResponse = {
  success: boolean;
  message: string;
};

type ColumnWithCards = TColumn & { card: TCard[] };
export type BoardWithColumns = TBoard & { column: ColumnWithCards[] };
export type TColumnWithChildren = PropsWithChildren<TColumn>;
