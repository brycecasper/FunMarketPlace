insert into fun_marketplace_user (
    email,
    password
) values (
    $1,
    $2
)
returning fun_marketplace_user_id, email;