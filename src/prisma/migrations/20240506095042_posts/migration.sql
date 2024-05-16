-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "fullname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
