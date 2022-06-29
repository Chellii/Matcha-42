import React from 'react';
import Registration from '../Components/RegForm';
import Navbar from '../Components/Navbar';
import './Register.css'
import img from '../img/img4.jpg';

const Register = () => {
    return (
        <div id="wrap-all">
            <Navbar id="header"/>
            <div className="main">
                <div class="inside_main">
                    <div className="main-item imgdiv">
                        <img className="imgreg" src={img} alt="img" />
                    </div>
                    <div class="main-item container-reg">
                        <Registration />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Register;