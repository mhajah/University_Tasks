CREATE TABLE sunken_city 
(
    name VARCHAR(50),
    country VARCHAR(4),
    province VARCHAR(50),
    population DECIMAL Constraint citypo
        CHECK (population >= 0::numeric),
    latitude DECIMAL Constraint citylat
        CHECK (latitude >= '-90'::integer::numeric AND latitude <= 90::numeric),
    longitude DECIMAL Constraint citylon
        CHECK (longitude >= '-180'::integer::numeric AND longitude <= 180::numeric),
    elevation DECIMAL,
    sinking_date DATE,
    Constraint SunkenCityKey PRIMARY KEY (name, country, province)
);

CREATE TABLE Params (Key VARCHAR(50) PRIMARY KEY, Val INT);
INSERT INTO Params VALUES ('Sea Level', 0);

CREATE FUNCTION sea_level(level int) RETURNS INT AS $$
INSERT INTO sunken_city
    SELECT City.*, now() FROM city WHERE elevation < level;
DELETE FROM CITY WHERE elevation < level;
DELETE FROM AIRPORT WHERE elevation < level;
UPDATE AIRPORT SET city = NULL, province = NULL, country = NULL
    WHERE (city, province, country) NOT IN (SELECT city, province, country FROM City);
UPDATE Params SET Val = level WHERE Key = 'Sea Level';
SELECT level;
$$ LANGUAGE sql;

--3

CREATE FUNCTION utop_nowe() RETURNS TRIGGER AS $$
BEGIN 
IF NEW.elevation < (SELECT Val FROM Params WHERE Key = 'Sea Level') THEN 
    INSERT INTO sunken_city VALUES
        (NEW.name, NEW.Country, NEW.Province, NEW.population, NEW.latitude, NEW.longitude, NEW.elevation, now());
    RETURN NULL;
END IF;
END
$$ language plpgsql;

CREATE FUNCTION utop_stare() RETURNS TRIGGER AS $$
BEGIN
IF NEW.elevation < (SELECT Val FROM Params WHERE Key = 'Sea Level') THEN 
    INSERT INTO sunken_city VALUES
        (NEW.name, NEW.Country, NEW.Province, NEW.population, NEW.latitude, NEW.longitude, NEW.elevation, now());
    DELETE FROM City WHERE (Name, Province, Country) = (OLD.Name, OLD.Province, OLD.Country);
    RETURN NULL;
ELSE 
    RETURN NEW;
END IF;
END;
$$ language plpgsql;

CREATE TRIGGER utop_nowe_miasto BEFORE INSERT ON City FOR EACH ROW
    EXECUTE PROCEDURE utop_nowe();

CREATE TRIGGER utop_stare_miasto BEFORE UPDATE ON City FOR EACH ROW
    EXECUTE PROCEDURE utop_stare();

--zad2

CREATE TABLE Params (key VARCHAR(50), val int);
INSERT INTO PARAMS VALUES ('Sea level', 0);

CREATE FUNCTION sea_level(level int) RETURNS int AS $$
INSERT INTO sunken_city
    SELECT City.*, now() WHERE elevation < level;
DELETE FROM city WHERE elevation < level;
DELETE FROM airport WHERE elevation < level;
UPDATE airport SET city=NULL WHERE city NOT IN (select name FROM city);
UPDATE Params SET Val=level WHERE key='Sea level';
SELECT level;
$$ language sql;

--zad3

CREATE FUNCTION utop_nowe() RETURNS TRIGGER AS $$
BEGIN 
IF NEW.elevation < (SELECT val FROM Params WHERE key = 'Sea level') THEN
INSERT INTO sunken_city VALUES 
    (NEW.name, NEW.Country, NEW.Province, NEW.population, NEW.latitude, NEW.longitude, NEW.elevation, now());
    RETURN NULL;
END IF;
END
$$ language plpgsql;

CREATE FUNCTION utop_stare() RETURNS TRIGGER AS $$
BEGIN 
IF NEW.elevation < (SELECT val FROM Params WHERE key = 'Sea level') THEN
INSERT INTO sunken_city VALUES 
    (NEW.name, NEW.Country, NEW.Province, NEW.population, NEW.latitude, NEW.longitude, NEW.elevation, now());
DELETE FROM city WHERE Name = OLD.Name;
RETURN NULL;
ELSE
RETURN NEW
END IF;
END
$$ language plpgsql;

CREATE TRIGGER utop_nowe_miasto BEFORE INSERT ON City FOR EACH ROW
    EXECUTE PROCEDURE utop_nowe();

CREATE TRIGGER utop_stare_miasto BEFORE UPDATE ON City FOR EACH ROW
    EXECUTE PROCEDURE utop_stare();
