import { db } from '@/db';
import { and, asc, desc, eq, gt, max, sql } from 'drizzle-orm';
import { board, boardMember, card, column, user } from '@/db/schema';

export async function createBoard(data: { ownerId: string; title: string }) {
  return await db.transaction(async (tx) => {
    const [newBoard] = await tx
      .insert(board)
      .values({
        ownerId: data.ownerId,
        title: data.title,
      })
      .returning();
    await tx.insert(boardMember).values({
      userId: data.ownerId,
      boardId: newBoard.id,
      role: 'owner',
    });
    return newBoard;
  });
}

export async function getUserBoards(userId: string) {
  // return await db.query.boardMember.findMany({
  //   where: eq(boardMember.userId, userId),
  //   with: { board: true },
  // });
  return await db
    .select({
      userId: boardMember.userId,
      role: boardMember.role,
      id: board.id,
      title: board.title,
      ownerId: board.ownerId,
      ownerName: user.name,
      createdAt: board.createdAt,
      updatedAt: board.updatedAt,
    })
    .from(boardMember)
    .innerJoin(board, eq(boardMember.boardId, board.id))
    .leftJoin(user, eq(board.ownerId, user.id))
    .where(eq(boardMember.userId, userId))
    .orderBy(desc(board.createdAt));
}

export async function getMembership(id: string, userId: string) {
  const arr = await db
    .select({ role: boardMember.role, userId: boardMember.userId })
    .from(boardMember)
    .where(and(eq(boardMember.userId, userId), eq(boardMember.boardId, id)));
  return arr[0];
}

export async function getBoardWithColumns(id: string) {
  const arr = await db.query.board.findFirst({
    where: eq(board.id, id),
    with: {
      column: {
        orderBy: asc(column.order),
        with: {
          card: {
            orderBy: asc(card.order),
          },
        },
      },
    },
  });
  // const arr = await db
  // .select({
  //   boardId: boards.id,
  //   boardTitle: boards.title,
  //   columnId: columns.id,
  //   columnTitle: columns.title,
  //   columnCreatedAt: columns.createdAt,
  //   cardId: cards.id,
  //   cardTitle: cards.title,
  //   cardCreatedAt: cards.createdAt,
  // })
  // .from(boards)
  // .leftJoin(columns, eq(columns.boardId, boards.id))
  // .leftJoin(cards, eq(cards.columnId, columns.id))
  // .orderBy(asc(columns.order), asc(cards.order));
  return arr;
}

// Column Queries
export async function createColumn({ boardId, title }: { boardId: string; title: string }) {
  const [result] = await db
    .select({ value: max(column.order) })
    .from(column)
    .where(eq(column.boardId, boardId));
  const newOrder = (result?.value ?? -1) + 1;
  const [newCol] = await db.insert(column).values({ boardId, title, order: newOrder }).returning();
  return newCol;
}

export async function reorderColumn({
  boardId,
  updates,
}: {
  boardId: string;
  updates: { id: string; order: number }[];
}) {
  return await db.transaction(async (tx) => {
    for (const { id, order } of updates) {
      await tx
        .update(column)
        .set({ order })
        .where(and(eq(column.id, id), eq(column.boardId, boardId)));
    }
  });
}

// Card Queries
export async function createCard({ columnId, title }: { columnId: string; title: string }) {
  // 1. get the maximum order value from card in a specific column (columnId)
  // 2. if no result, no existing card so start from zero
  // 3. else, increase order by 1.
  const [result] = await db
    .select({ value: max(card.order) })
    .from(card)
    .where(eq(card.columnId, columnId));
  const newOrder = (result?.value ?? -1) + 1;
  const [newCard] = await db.insert(card).values({ columnId, title, order: newOrder }).returning();
  return newCard;
}

export async function deleteCard({ columnId, cardId, order }: { columnId: string; cardId: string; order: number }) {
  return await db.transaction(async (tx) => {
    const deleted = await tx.delete(card).where(eq(card.id, cardId)).returning();
    if (deleted.length === 0) throw new Error('Card not found');
    await tx
      .update(card)
      .set({ order: sql`${card.order} - 1` })
      .where(and(eq(card.columnId, columnId), gt(card.order, order)));
    return deleted[0];
  });
}

export async function editCard({ columnId, cardId, title }: { columnId: string; cardId: string; title: string }) {
  return await db
    .update(card)
    .set({ title })
    .where(and(eq(card.columnId, columnId), eq(card.id, cardId)));
}
