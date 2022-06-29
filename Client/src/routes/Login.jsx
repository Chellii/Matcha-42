import React from 'react';
import LoginForm from '../Components/LogForm'
import Navbar from '../Components/Navbar'
import './Register.css'
import img from "/Users/cel-oiri/Desktop/matcha/Client/src/img/img6.jpg";

const Login = () => {
    return (
        <div id="wrap-all">
            <Navbar id="header"/>
            <div className="main">
                <div class="inside_main">
                    <div className="main-item">
                        <div className="imgdiv">
                            <img className="imgreg" src={img} alt="img" />
                        </div>
                    </div>
                    <div class="main-item container-reg">
                        <LoginForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Login;