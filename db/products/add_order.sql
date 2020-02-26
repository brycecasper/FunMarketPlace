insert into order_products (
    cart_id,
    products_id,
    qty,
    total_price
) values (
    ${order_id},
    ${products_id},
    1,
    ${price}
);