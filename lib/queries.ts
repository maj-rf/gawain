import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { board, boardMember } from '@/db/schema';

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
  return await db.query.boardMember.findMany({
    where: eq(boardMember.userId, userId),
    with: { board: true },
  });
}
