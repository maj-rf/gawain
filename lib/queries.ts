import { db } from '@/db';
import { desc, eq } from 'drizzle-orm';
import { board, boardMember, user } from '@/db/schema';

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
