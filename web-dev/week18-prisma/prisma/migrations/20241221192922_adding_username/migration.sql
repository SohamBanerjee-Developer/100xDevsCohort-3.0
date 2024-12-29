/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[userName]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `city` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "userId" SERIAL NOT NULL,
ALTER COLUMN "userName" DROP DEFAULT,
ALTER COLUMN "userName" SET DATA TYPE TEXT,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("userId");
DROP SEQUENCE "user_userName_seq";

-- CreateTable
CREATE TABLE "todo" (
    "todoId" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "todo_pkey" PRIMARY KEY ("todoId")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_userName_key" ON "user"("userName");
