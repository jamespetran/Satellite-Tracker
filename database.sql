
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

-- user table ---------------------------------------------------

CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    username character varying(80) NOT NULL UNIQUE,
    password character varying(1000) NOT NULL,
    email character varying(255),
    "validEmail" boolean DEFAULT false,
    "saveLocation" boolean DEFAULT false,
    latitude double precision,
    longitude double precision,
    elevation integer
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX user_pkey ON "user"(id int4_ops);
CREATE UNIQUE INDEX user_username_key ON "user"(username text_ops);

-- trackedSatellite table ----------------------------------------
CREATE TABLE "trackedSatellite" (
    id integer DEFAULT nextval('"trackedSatellite_id_seq"'::regclass) PRIMARY KEY,
    "userID" integer REFERENCES "user"(id),
    "noradID" integer,
    notifications boolean DEFAULT false,
    "allowNotifications" boolean DEFAULT false,
    displayed boolean DEFAULT false,
    name character varying(255),
    line1 character varying(255),
    line2 character varying(255)
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX "trackedSatellite_pkey" ON "trackedSatellite"(id int4_ops);
