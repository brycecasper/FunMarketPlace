select * from fun_marketplace_user
join cart
on fun_marketplace_user.fun_marketplace_user_id = cart.fun_marketplace_user_id
where fun_marketplace_user.email = $1
and cart.paid = false;