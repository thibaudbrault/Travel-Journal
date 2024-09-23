CREATE TABLE IF NOT EXISTS "travel" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"location" text,
	"from" timestamp,
	"to" timestamp,
	"user_id" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "travel" ADD CONSTRAINT "travel_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
