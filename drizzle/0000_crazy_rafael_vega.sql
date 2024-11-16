CREATE TABLE IF NOT EXISTS "builds_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"build_key" text DEFAULT '' NOT NULL,
	"build_string" text DEFAULT '' NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"character" text NOT NULL,
	"weapons" text[] DEFAULT ARRAY['','','','','']::text[] NOT NULL,
	"banWeapon" boolean DEFAULT false NOT NULL,
	"items" text[] DEFAULT ARRAY['','','','','','']::text[] NOT NULL,
	"stamps" text[] DEFAULT ARRAY['','','']::text[] NOT NULL,
	"stats" text[] DEFAULT ARRAY[]::text[] NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comments_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"build_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	CONSTRAINT "users_table_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "builds_table" ADD CONSTRAINT "builds_table_user_id_users_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments_table" ADD CONSTRAINT "comments_table_build_id_builds_table_id_fk" FOREIGN KEY ("build_id") REFERENCES "public"."builds_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments_table" ADD CONSTRAINT "comments_table_user_id_users_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
