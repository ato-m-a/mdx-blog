-- CreateTable
CREATE TABLE "authorized_github_user" (
    "id" SERIAL NOT NULL,
    "github_id" TEXT NOT NULL,
    "github_username" TEXT NOT NULL,
    "github_email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "authorized_github_user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "authorized_github_user_github_id_key" ON "authorized_github_user"("github_id");

-- CreateIndex
CREATE UNIQUE INDEX "authorized_github_user_github_email_key" ON "authorized_github_user"("github_email");
