--1

UPDATE offer
    SET company_id = company_branch.company_id
    FROM company_branch
    WHERE company_branch_id = company_branch.id
        AND offer.company_branch_id != company_branch.company_id;

--3

CREATE FUNCTION block_incosistent_inserts_to_offer() RETURNS TRIGGER AS $$
DECLARE
    correct_company_id int;
BEGIN

--poprawne id, to te ktore jest odpowiadajace w company_branch
SELECT company_id INTO correct_company_id
FROM company_branch
WHERE id=NEW.company_branch_id

IF (correct_company_id != NEW.company_id) THEN
    RAISE NOTICE 'Nie ma takiego'
    RETURN NULL;
ELSE 
    RETURN NEW;
END IF;
END
$$ language plpgsql;


CREATE OR REPLACE FUNCTION block_inconsistent_updates_to_offer() RETURNS TRIGGER AS
  $foo$
  DECLARE
    correct_company_id int;
  BEGIN
  
  SELECT company_id INTO correct_company_id
    FROM company_branch
    WHERE id = NEW.company_branch_id;
  
  IF (NEW.company_branch_id != OLD.company_branch_id) THEN
    IF (NEW.company_id != OLD.company_id) THEN
      IF (NEW.company_id != correct_company_id) THEN
        RAISE NOTICE
          'Skipped row setting company_id = %, company_branch_id = % (correct company_id for this branch is %)',
          NEW.company_id, NEW.company_branch_id, correct_company_id;
        RETURN NULL; -- zasada 1
      ELSE
        RETURN NEW;
      END IF;
    ELSE
      IF (NEW.company_id != correct_company_id) THEN
        RAISE NOTICE
          'Corrected row setting company_branch_id = % by setting correct company_id = %',
          NEW.company_branch_id, correct_company_id;
        NEW.company_id := correct_company_id; -- zasada 2
      END IF;
      RETURN NEW;
    END IF;
  ELSE
    IF (NEW.company_id != OLD.company_id AND NEW.company_id != correct_company_id) THEN
    -- wyjątek dla "poprawiania" company_id potrzebny m.in., żeby trzeci wyzwalacz mógł zadziałać
      RAISE NOTICE
        'Skipped row setting company_id = % keeping company_branch_id = % (you may want to change company_id for this branch in company_branch)',
        NEW.company_id, NEW.company_branch_id;
      RETURN NULL;
    ELSE
      RETURN NEW; -- zmiana jest "nieciekawa" z punktu widzenia spójności ID firm
    END IF;
  END IF;
    
  END; $foo$ LANGUAGE plpgsql;


