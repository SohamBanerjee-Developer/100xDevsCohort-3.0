-- CreateTable
CREATE TABLE "user" (
    "userName" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("userName")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
