-- CreateIndex
CREATE INDEX "github_authorized_user_github_id_idx" ON "github_authorized_user"("github_id");

-- CreateIndex
CREATE INDEX "github_authorized_user_github_email_idx" ON "github_authorized_user"("github_email");
