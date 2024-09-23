DO $$ BEGIN
 CREATE TYPE "public"."transportation" AS ENUM('car', 'train', 'plane');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "day" ADD COLUMN "transportation" "transportation";