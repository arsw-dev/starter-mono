ALTER TABLE "notes" RENAME COLUMN "name" TO "title";--> statement-breakpoint
ALTER TABLE "notes" DROP CONSTRAINT "name_min_length";--> statement-breakpoint
ALTER TABLE "notes" DROP CONSTRAINT "note_min_length";--> statement-breakpoint
ALTER TABLE "notes" ADD COLUMN "subtitle" varchar(256);--> statement-breakpoint
ALTER TABLE "notes" ADD COLUMN "priority" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "notes" ADD COLUMN "archived" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "notes" ADD COLUMN "note_type" "note_type" DEFAULT 'general' NOT NULL;--> statement-breakpoint
ALTER TABLE "notes" ADD CONSTRAINT "title_min_length" CHECK (char_length(btrim("notes"."title")) >= 1);--> statement-breakpoint
ALTER TABLE "notes" ADD CONSTRAINT "subtitle_trimmed_if_present" CHECK ("notes"."subtitle" IS NULL OR char_length(btrim("notes"."subtitle")) >= 1);--> statement-breakpoint
ALTER TABLE "notes" ADD CONSTRAINT "priority_non_negative" CHECK ("notes"."priority" >= 0);--> statement-breakpoint
ALTER TABLE "notes" ADD CONSTRAINT "note_min_length" CHECK (char_length(btrim("notes"."note")) >= 1);