import {register_form_validation, login_form_validation} from './validation';

function reg_validate(values) {
    let errors = {};
    const valid = register_form_validation(values);
    if (valid.error)
    {
        if (valid.type === "fname")
            errors.fname = valid.message
        if (valid.type === "lname")
            errors.lname = valid.message
        if (valid.type === "username")
            errors.username = valid.message
        if (valid.type === "email")
            errors.email = valid.message
        if (valid.type === "pwd")
            errors.pwd = valid.message
        if (valid.type === "pwd2")
            errors.pwd2 = valid.message
    }

    return errors;
}

function log_validate(values) {
    let errors = {};
    const valid = login_form_validation(values);
    if (valid.error)
    {
        if (valid.type === "username")
            errors.username = valid.message
        if (valid.type === "pwd")
            errors.pwd = valid.message
    }

    return errors;
}

export {
    reg_validate,
    log_validate
};