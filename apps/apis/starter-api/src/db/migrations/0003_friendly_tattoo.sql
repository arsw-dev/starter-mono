ALTER TABLE "notes" DROP CONSTRAINT "notes_name_min_length";--> statement-breakpoint
ALTER TABLE "notes" DROP CONSTRAINT "notes_note_min_length";--> statement-breakpoint
ALTER TABLE "notes" ALTER COLUMN "note" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "notes" ADD CONSTRAINT "note_min_length" CHECK (char_length("notes"."note") >= 1);--> statement-breakpoint
ALTER TABLE "notes" ADD CONSTRAINT "name_min_length" CHECK (char_length("notes"."name") >= 1);