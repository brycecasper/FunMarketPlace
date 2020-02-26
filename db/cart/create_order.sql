insert into cart (
    fun_marketplace_user_id,
    paid
) values (
    $1,
    false
)
returning fun_marketplace_user_id, paid;