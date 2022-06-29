function verify_password(password) {
    let l_case = false;
    let u_case = false;
    let symbol = false;
    let number = false;
    let size = (password.length > 8);
    let all_symbols = "-#!$@%^&*()_+|~=`{}\[\]:\";'<>?,.\/ ";
    for (char in password) {
        if (char >= 'a' && char <= 'z')
            l_case = true;
        if (char >= 'A' && char <= 'Z')
            u_case = true;
        if (all_symbols.includes(char))
            symbol = true;
        if (char >= '0' && char <= '9')
            number = true;
    }
    if (!size) 
        return "short password";
    if (!l_case)
        return "Password does not contain a lower case character";
    if (!u_case)
        return "Password does not contain an upper case character";
    if (!symbol)
        return "Password should at least contain one special character";
    if (!number)
        return "Password should at least contain one number";
    return "";
}

function validate_name(first_name) {
    const pattern = /^[a-zA-Z]+[\s'-]?[a-zA-Z]+[\s'-]?[a-zA-Z]+$/;
    const pattern1 = /^[a-zA-Z]+[\s'-]?[a-zA-Z]+$/;
    const pattern2 = /^[a-zA-Z]+$/;
    let valid = 0;
    valid |= (pattern.exec(first_name) != null);
    valid |= (pattern1.exec(first_name) != null);
    valid |= (pattern2.exec(first_name) != null);
    return valid;
}

function is_alpha_numeric(word) {
    for (letter in word) {
        if (!(letter >= 'A' && letter <= 'Z') &&
            !(letter >= 'a' && letter <= 'z') &&
            !(letter >= '0' && letter <= '9'))
            return false;
    }
    return true;
}

function is_email(email) {
    const pattern = /^\S+@\S+\.\S+$/;
    return pattern.exec(email) != null;
}



const register_form_validation = (input) => {
    if (input.first_name.length == 0)
        return {
            message: "First name should not be empty",
            error: true
        }
    if (!(validate_name(input.first_name)))
        return {
            message: "First name should consist of at most three words separated by one space, ', or -",
            error: true
        }
    if (input.last_name.length == 0)
        return {
            message: "Last name should not be empty",
            error: true
        }
    if (!(validate_name(input.last_name)))
        return {
            message: "First name should consist of at most three words separated by one space, ', or -",
            error: true
        }
    if (input.username.length == 0)
        return {
            message: "Username should not be empty",
            error: true
        }
    if (!(is_alpha_numeric(input.username)))
        return {
            message: "username should contains only letters and numbers",
            error: true
        }
    if (!(is_email(input.email)))
        return {
            message: "Insert a correct email",
            error: true
        }
    if (!verify_password(input.password) === "" ) {
            const msg = verify_password(input.password);
            return {
                message: msg,
                error: true
            }
        }
    return {
        message: "",
        error: false
    }
}

module.exports = register_form_validation;
