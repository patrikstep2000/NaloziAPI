export const DBUserSelect={
    id:"u.id",
    first_name: "u.first_name",
    last_name: "u.last_name",
    email: "u.email",
    password: "u.password",
    role_id:"ur.id",
    role_name:"ur.name"
}

export const DBOldUserSelect={
    first_name: "u.first_name",
    last_name: "u.last_name",
    email: "u.email",
    old_id: "u.id"
}