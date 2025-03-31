DELETE FROM "Sale"
WHERE "productId" NOT IN (SELECT "id" FROM "Product");



