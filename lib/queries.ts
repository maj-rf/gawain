import { db } from '@/db';
import { and, asc, desc, eq } from 'drizzle-orm';
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
