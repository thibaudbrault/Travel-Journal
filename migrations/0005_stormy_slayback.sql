CREATE TABLE IF NOT EXISTS "day" (
	"id" text PRIMARY KEY NOT NULL,
	"date" timestamp NOT NULL,
	"breakfast" text,
	"morning" text NOT NULL,
	"lunch" text,
	"afternoon" text NOT NULL,
	"diner" text,
	"link" text,
	"travel_id" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "day" ADD CONSTRAINT "day_travel_id_travel_id_fk" FOREIGN KEY ("travel_id") REFERENCES "public"."travel"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
