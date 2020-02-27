select * from products
where name ilike '%' || $1 || '%';