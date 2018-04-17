
DELETE FROM UserRole WHERE User_id=(SELECT id FROM User WHERE email LIKE 'admin@skillz.fr');

DELETE FROM User WHERE email LIKE 'admin@skillz.fr';
