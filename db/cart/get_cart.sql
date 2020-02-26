select * from order_products
join products 
on order_products.products_id = products.products_id
where order_products.cart_id = $1;