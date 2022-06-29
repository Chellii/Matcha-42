
function verify_password(password) {
    let l_case = false;
    let u_case = false;
    let symbol = false;
    let number = false;
    if (!password)
        return  "Password should not be empty";
    let size = (password.length > 8);
    let all_symbols = "-#!$@%^&*()_+|~=`{}\[\]:\";'<>?,.\/ ";
    for (let char = 0; char < password.length; char++) {
        if (password[char] >= 'a' && password[char] <= 'z')
            l_case = true;
        if (password[char] >= 'A' && password[char] <= 'Z')
            u_case = true;
        if (all_symbols.includes(password[char]))
            symbol = true;
        if (password[char] >= '0' && password[char] <= '9')
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

function validate_name(name) {
    const pattern = /^[a-zA-Z]+[\s'-]?[a-zA-Z]+[\s'-]?[a-zA-Z]+$/;
    const pattern1 = /^[a-zA-Z]+[\s'-]?[a-zA-Z]+$/;
    const pattern2 = /^[a-zA-Z]+$/;
    let valid = 0;
    valid |= (pattern.exec(name) != null);
    valid |= (pattern1.exec(name) != null);
    valid |= (pattern2.exec(name) != null);
    return valid;
}

function is_alpha_numeric(word) {
    for (let letter = 0; letter < word.length; letter++) {
        if (!(word[letter] >= 'A' && word[letter] <= 'Z') &&
            !(word[letter] >= 'a' && word[letter] <= 'z') &&
            !(word[letter] >= '0' && word[letter] <= '9'))
            return false;
    }
    return true;
}

function is_email(email) {
    const pattern = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return pattern.exec(email) != null;
}


const register_form_validation = (input) => {
    if (!input.fname)
        return {
            message: "First name should not be empty",
            error: true,
            type: "fname"
        }
    if (!(validate_name(input.fname)))
        return {
            message: "First name should consist of at most three words separated by one space, ', or -",
            error: true,
            type: "fname"
        }
    if (!input.lname)
        return {
            message: "Last name should not be empty",
            error: true,
            type: 'lname'
        }
    if (!(validate_name(input.lname)))
        return {
            message: "First name should consist of at most three words separated by one space, ', or -",
            error: true,
            type: "lname"
        }
    if (!input.username)
        return {
            message: "Username should not be empty",
            error: true,
            type: "username"
        }
    if (input.username.length < 3)
        return {
            message: "Username should contain more than 3 characters",
            error: true,
            type: "username"
        }
    if (!(is_alpha_numeric(input.username)))
        return {
            message: "username should contains only letters and numbers",
            error: true,
            type: "username"
        }
    if (!(is_email(input.email)))
        return {
            message: "Insert a correct email",
            error: true,
            type: "email"
        }
    if (!verify_password(input.pwd) == "" ) {
            const msg = verify_password(input.pwd);
            return {
                message: msg,
                error: true,
                type: "pwd"
            }
    }
    if (!input.pwd2)
        return {
            message: "Confirmation password should not be empty",
            error: true,
            type: "pwd2"
        }
    if (input.pwd !== input.pwd2)
        return {
            message: "Does not match the password",
            error: true,
            type: "pwd2"
        }
    
    return {
        message: "",
        error: false
    }
}

const login_form_validation = (input) => {
    if (!input.username)
        return {
            message: "Username should not be empty",
            error: true,
            type: "username"
        }
    if (input.username.length < 3)
        return {
            message: "Username should contain more than 3 characters",
            error: true,
            type: "username"
        }
    if (!(is_alpha_numeric(input.username)))
        return {
            message: "username should contains only letters and numbers",
            error: true,
            type: "username"
        }
    if (!verify_password(input.pwd) == "" ) {
            const msg = verify_password(input.pwd);
            return {
                message: msg,
                error: true,
                type: "pwd"
            }
    }
    return {
        message: "",
        error: false
    }
}
export {register_form_validation, login_form_validation, validate_name,is_alpha_numeric, is_email, verify_password};