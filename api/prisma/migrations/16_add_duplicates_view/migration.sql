CREATE VIEW "application_flagged_set_possibilities" AS (
    SELECT
        LOWER(a.first_name) || '-' || LOWER(a.last_name) || '-' || a.birth_month || '-' || a.birth_day || '-' || a.birth_year as "key",
        app.listing_id,
        app.id as "application_id",
        'nameAndDOB' as "type"
    from
        applicant a,
        applications app
    where
        a.id = app.applicant_id
        and app.deleted_at is null
)
UNION
(
    SELECT
        a.email_address as "key",
        app.listing_id,
        app.id as "application_id",
        'email' as "type"
    from
        applications app,
        applicant a
    where
        a.id = app.applicant_id
        and a.email_address is not null
        and app.deleted_at is null
)
UNION
(
    SELECT
        LOWER(hm.first_name) || '-' || LOWER(hm.last_name) || '-' || hm.birth_month || '-' || hm.birth_day || '-' || hm.birth_year as "key",
        app.listing_id,
        app.id as "application_id",
        'nameAndDOB' as "type"
    from
        applications app,
        household_member hm
    where
        hm.application_id = app.id
        and app.deleted_at is null
);

ALTER TYPE "rule_enum"
ADD
    VALUE 'combination';

ALTER TABLE
    application_flagged_set DROP CONSTRAINT IF EXISTS "application_flagged_set_rule_key_key";

DROP INDEX IF EXISTS "application_flagged_set_rule_key_key";

CREATE UNIQUE INDEX "application_flagged_set_rule_key_listing_id_key" ON "application_flagged_set"("rule_key", "listing_id");