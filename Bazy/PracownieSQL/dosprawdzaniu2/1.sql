--sprawdzian2023
--zad1
SELECT s.name, COUNT(distinct o.title) AS stanowiska, COUNT(o.title) AS oferty, MIN(s.value), MAX(s.value), round(AVG(s.value)) AS avg
FROM skill s
JOIN offer o ON o.id=s.offer_id
GROUP BY s.name
ORDER BY 2 DESC;

--zad2
SELECT o.title, COUNT(distinct s.name), (array_agg(distinct s.name))[1:4] 
FROM offer o
JOIN skill s ON s.offer_id=o.id
GROUP BY o.title
HAVING COUNT(distinct s.name)>20
ORDER BY 2 DESC;

--zad3
SELECT distinct c.name
FROM company c
JOIN offer o ON c.id=o.company_id
WHERE o.id NOT IN
(SELECT s.offer_id FROM skill s
WHERE s.name ILIKE '%sql%'
OR s.name ILIKE '%database%')
ORDER BY 1;

--zad4
SELECT distinct c.name
FROM company c
WHERE c.id NOT IN
(
    SELECT o.company_id
    FROM offer o JOIN
        skill s ON s.offer_id=o.id
    WHERE s.name ILIKE '%sql%'
    OR s.name ILIKE '%database%'
)

--zad5
WITH cities AS 
(
    SELECT cb.city, COUNT(o.company_branch_id)
    FROM company_branch cb
    JOIN offer o ON o.company_branch_id=cb.id
    GROUP BY cb.city
    ORDER BY 2 DESC
    LIMIT 10
),
snowflakeSkill AS 
(
    SELECT s.name, s.offer_id
    FROM skill s
    WHERE s.name ILIKE '%snowflake%'
)
SELECT cb.city, count(s.name)
FROM cities c 
JOIN company_branch cb ON cb.city=c.city 
JOIN offer o ON o.company_branch_id=cb.id 
LEFT JOIN snowflakeSkill s ON (o.id=s.offer_id)
GROUP BY cb.city;
