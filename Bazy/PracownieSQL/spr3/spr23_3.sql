-- zadanie1

CREATE TABLE archived_offers (
    LIKE offer INCLUDING ALL,
    archived_at timestamp NOT NULL
);


CREATE FUNCTION archiwizuj() RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO archived_offers VALUES
    (OLD.*, now());
    RETURN OLD;
END
$$ language plpgsql;

CREATE TRIGGER archiwizuj_usuniete AFTER DELETE ON offer FOR EACH ROW
    EXECUTE PROCEDURE archiwizuj();

--zadanie2

ALTER TABLE company ADD COLUMN current_offer_count integer DEFAULT 0;
ALTER TABLE company ADD COLUMN total_offer_count integer DEFAULT 0;

CREATE OR REPLACE FUNCTION update_offer_count_on_insert() RETURNS TRIGGER AS $$
BEGIN
    UPDATE company SET
        current_offer_count = current_offer_count + 1,
        total_offer_count = total_offer_count + 1
    WHERE id = NEW.company_id;
    RETURN NEW;
END
$$ language plpgsql;


CREATE OR REPLACE FUNCTION update_offer_count_on_delete() RETURNS TRIGGER AS $$
BEGIN
    UPDATE company SET
        current_offer_count = current_offer_count - 1
    WHERE id = OLD.company_id;
    RETURN OLD;
END
$$ language plpgsql;

CREATE TRIGGER update_counter_on_insert AFTER UPDATE ON offer FOR EACH ROW
    EXECUTE PROCEDURE update_offer_count_on_insert();

CREATE TRIGGER update_offer_count_on_delete AFTER DELETE ON offer FOR EACH ROW
    EXECUTE PROCEDURE update_offer_count_on_delete();