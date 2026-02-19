/*
  Warnings:

  - Changed the type of `role` on the `ChatMessage` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "Chat_updatedAt_idx";

-- DropIndex
DROP INDEX "Chat_userId_idx";

-- DropIndex
DROP INDEX "ChatMessage_chatId_idx";

-- DropIndex
DROP INDEX "ChatMessage_createdAt_idx";

-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "isUserRenamed" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "title" SET DEFAULT 'New Chat';

-- AlterTable
ALTER TABLE "ChatMessage" DROP COLUMN "role",
ADD COLUMN     "role" TEXT NOT NULL;
