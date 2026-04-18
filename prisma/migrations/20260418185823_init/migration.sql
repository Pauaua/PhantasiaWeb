-- CreateTable
CREATE TABLE "project_inquiries" (
    "id" SERIAL NOT NULL,
    "projectType" TEXT NOT NULL,
    "currentSituation" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "businessDesc" TEXT NOT NULL,
    "problemSolving" TEXT NOT NULL,
    "features" TEXT NOT NULL,
    "budget" TEXT NOT NULL,
    "timeline" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "contactMethod" TEXT NOT NULL,
    "locale" TEXT NOT NULL DEFAULT 'es',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "project_inquiries_pkey" PRIMARY KEY ("id")
);
