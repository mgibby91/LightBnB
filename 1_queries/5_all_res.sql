SELECT properties.id, properties.title, properties.cost_per_night, reservations.start_date, avg(property_reviews.rating) as average_rating
FROM properties
  JOIN reservations ON properties.id = property_id
  JOIN property_reviews ON reservations.id = reservation_id
  JOIN users on property_reviews.guest_id = users.id
WHERE users.id = 1
  AND reservations.end_date < now()
::date
GROUP BY reservations.start_date, properties.id
ORDER BY start_date;
-- LIMIT 10;