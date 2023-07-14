INSERT INTO bill (id, title, date, total, archived) VALUES
    (1, '12 Chairs', '2023-03-21', 50.0, False),
    (2, 'Cooper''s', '2023-06-28', 45.0, False),
    (3, 'B''artusi', '2023-07-08', 0.0, False);

INSERT INTO item (id, bill_id, description, price, quantity) VALUES
    (1, 1, 'Pita', 22.0, 1),
    (2, 1, 'Beer', 8.0, 2),
    (3, 1, 'Wine', 12.0, 1),
    (4, 2, 'Burger', 11.0, 3),
    (5, 2, 'Lager', 6.0, 2);
