INSERT INTO "Sale" ("productId", "quantity", "total", "createdAt")
VALUES
    (1, 2, 130.00, NOW() - INTERVAL '1 day'),   -- Yesterday
    (2, 1,  65.00, NOW()),                     -- Today
    (1, 3, 195.00, NOW() - INTERVAL '2 days'), -- 2 days ago
    (1, 2, 130.00, NOW() - INTERVAL '1 day'),   -- Yesterday
    (4, 1,  65.00, NOW()),                     -- Today
    (3, 3, 195.00, NOW() - INTERVAL '2 days'); -- 2 days ago

