INSERT INTO User (name, email, password) VALUES ('ADMIN','admin@skillz.fr', '$2a$10$YHZYNw8ifJUy16eaGoG8HeTkTQM6JsvCChJhklv7dsI4rY60UHNAG');

INSERT INTO UserRole(user_id,roles_id) VALUES ((SELECT id FROM User WHERE email LIKE 'admin@skillz.fr'), 1);
INSERT INTO UserRole(user_id,roles_id) VALUES ((SELECT id FROM User WHERE email LIKE 'admin@skillz.fr'), 2);
INSERT INTO UserRole(user_id,roles_id) VALUES ((SELECT id FROM User WHERE email LIKE 'admin@skillz.fr'), 3);
INSERT INTO UserRole(user_id,roles_id) VALUES ((SELECT id FROM User WHERE email LIKE 'admin@skillz.fr'), 4);
INSERT INTO UserRole(user_id,roles_id) VALUES ((SELECT id FROM User WHERE email LIKE 'admin@skillz.fr'), 5);
INSERT INTO UserRole(user_id,roles_id) VALUES ((SELECT id FROM User WHERE email LIKE 'admin@skillz.fr'), 6);
