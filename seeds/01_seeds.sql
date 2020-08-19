-- INSERT INTO reservations (guest_id, property_id, start_date, end_date) 
-- VALUES (1, 1, '2018-09-11', '2018-09-26'),
-- (2, 2, '2019-01-04', '2019-02-01'),
-- (3, 3, '2021-10-01', '2021-10-14');


INSERT INTO users
  (name, email, password)
VALUES
  ('Eva Stanley', 'seb@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Fred Durst', 'durst@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Sue Luna', 'luna@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Etta West', 'west@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');


INSERT INTO properties
  (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_space, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES
  (1, 'Speed lamp', 'description', 'https://images.pexels.com', 'https://images.pexels.com', '$930.61', 6, 4, 8, 'Canada', 'Namsub Highway', 'Sotboske', 'Quebec', 28142, true),
  (1, 'Blank Corner', 'description', 'https://images.pexels.com', 'https://images.pexels.com', '$930.61', 6, 4, 8, 'Canada', 'Namsub Highway', 'Sotboske', 'Quebec', 28142, true),
  (2, 'Habit mix', 'description', 'https://images.pexels.com', 'https://images.pexels.com', '$930.61', 6, 4, 8, 'Canada', 'Namsub Highway', 'Sotboske', 'Quebec', 28142, true);


INSERT INTO reservations
  (start_date, end_date, property_id, guest_id)
VALUES
  ('2018-09-11', '2018-09-26', 2, 1),
  ('2018-09-11', '2018-09-25', 2, 1),
  ('2018-09-11', '2018-09-24', 1, 2);


INSERT INTO property_reviews
  (guest_id, property_id, reservation_id, rating, message)
VALUES
  (2, 1, 10, 2, 'messages'),
  (1, 1, 11, 3, 'messages'),
  (1, 2, 7, 4, 'messages');