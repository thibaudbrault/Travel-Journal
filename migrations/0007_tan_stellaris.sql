ALTER TABLE "day" ALTER COLUMN "morning" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "day" ALTER COLUMN "afternoon" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "day" ADD COLUMN "depart" timestamp;--> statement-breakpoint
ALTER TABLE "day" ADD COLUMN "arrival" timestamp;