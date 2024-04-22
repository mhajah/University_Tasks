--zadanie1
BEGIN;

INSERT INTO company_branch VALUES
(21379, 737, 'Cenutrm', 'Wrocław' ...)

ROLLBACK;

--zadanie2
SELECT DISTINCT c.name FROM company c
JOIN company_branch cb ON (c.id=cb.company_id)
JOIN offer o ON (cb.id=o.company_branch_id)
JOIN skill s ON (o.id=s.offer_id)
WHERE s.name LIKE '%PostgreSQL%';


--zadanie 3 
SELECT DISTINCT c.name FROM company c
JOIN offer o ON (c.id=o.company_id)
JOIN skill s ON (o.id=s.offer_id)
WHERE s.name LIKE '%PostgreSQL%' OR 
s.name ILIKE '%postres%'
ORDER BY 1 ASC;

--zadanie 4
SELECT c.name, o.title, o.experience_level, round(o.salary_from_b2b::decimal) as widelki_dol, round(o.salary_to_b2b::decimal) as widelki_gora,
round(salary_to_b2b::decimal-salary_from_b2b::decimal) as diff, round(100*(salary_to_b2b::decimal-salary_from_b2b::decimal)/salary_from_b2b::decimal) as "%"
FROM company c
JOIN offer o ON (c.id=o.company_id)
WHERE o.salary_from_b2b::decimal>0 AND
o.if_b2b=true AND
o.published_at::date>='2023-04-22' AND
salary_currency_b2b = 'pln'
ORDER BY 7, 1;

--zadanie 5
CREATE TABLE salary(
    salary_from decimal NOT NULL,
    salary_to decimal NOT NULL,
    offer_id int REFERENCES offer(id) NOT NULL,
    type text,
    currency text
);

--zadanie6
INSERT INTO salary 
SELECT round(salary_from_b2b::decimal), round(salary_to_b2b::decimal),
id, 'b2b', salary_currency_b2b
FROM offer o 
WHERE o.salary_currency_b2b<>'unknown' AND
o.salary_from_b2b::decimal>0 AND
o.salary_to_b2b::decimal>0;

--zadanie7
ALTER TABLE offer
ALTER COLUMN salary_from_b2b 
SET DATA TYPE decimal
USING
salary_from_b2b::decimal;


--zadanie1 
SELECT DISTINCT o_orderkey, o_orderdate, o_orderpriority FROM ORDERS o
JOIN LINEITEM on l_orderkey = o_orderkey
WHERE l_shipdate > o_orderdate + 120
AND (o_orderpriority = '2-HIGH' OR o_orderpriority = '1-URGENT')
AND EXTRACT (month FROM o_orderdate) = '8' 
ORDER BY 3, 2 DESC, 1 ASC;

-- zadanie2
(
    SELECT DISTINCT l1.l_orderkey
FROM lineitem l1
JOIN lineitem l2 ON l2.l_orderkey = l1.l_orderkey
WHERE l1.l_linenumber <> l2.l_linenumber
)
EXCEPT
(
SELECT l1.l_orderkey 
FROM lineitem l1
JOIN lineitem l2 ON l2.l_orderkey = l1.l_orderkey
WHERE l1.l_shipmode <> l2.l_shipmode
)
ORDER BY 1;

--zadanie3
ALTER TABLE nation
ADD CONSTRAINT fk_nation_region
FOREIGN KEY (n_regionkey) REFERENCES region(r_regionkey)
ON DELETE CASCADE;

--Z4
SELECT c_custkey FROM customer
LEFT JOIN orders ON o_custkey=c_custkey
WHERE o_orderkey IS NULL
ORDER BY 1;

(
SELECT c_custkey FROM customer
)
EXCEPT
(
SELECT o_custkey FROM orders
);

--z5
UPDATE customer SET c_acctbal=c_acctbal*1.1 
FROM nation
JOIN region ON r_regionkey=n_regionkey
WHERE n_nationkey=c_nationkey
AND r_name='EUROPE';


--zadanie1
SELECT c_name, SUM(o_totalprice) FROM customer 
JOIN orders ON o_custkey=c_custkey
JOIN nation ON n_nationkey=c_nationkey
JOIN region ON r_regionkey=n_regionkey
WHERE EXTRACT(year FROM o_orderdate) = '1997'
AND r_name = 'EUROPE'
GROUP BY c_custkey
HAVING SUM(o_totalprice) > 500000;

--zadanie2
WITH ordertotals AS (
    SELECT c_custkey, c_name, SUM(o_totalprice) 
    FROM customer
    JOIN orders ON o_custkey=c_custkey
    WHERE EXTRACT(year FROM o_orderdate) = '1997'
    GROUP BY c_custkey
)
SELECT n_name, c_name, total 
    FROM (SELECT c_nationkey, MAX(total) AS total
            FROM ordertotals
            GROUP BY c_nationkey
        ) AS foo 
    NATURAL JOIN ordertotals
    RIGHT JOIN nation ON c_nationkey=n_nationkey;
