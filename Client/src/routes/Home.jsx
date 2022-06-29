import React from 'react';
import Navbar from '../Components/Navbar';
import './Home.css'
import Img1 from '../img/img1.jpg'
import Img2 from '../img/img2.jpg'
import Img3 from '../img/img3.jpg'
import Img4 from '../img/img5.jpg'
import { Fade } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'

const slideImages = [
    {
        url: Img1
    },
    {
        url: Img2
    },
    {
        url: Img3
    },
    {
        url: Img4
    }
];

const fadeProperties = {
    duration: 3000,
    canSwipe: false,
  };

export default function Home() {
    return (
        <div>
            <Navbar />
            <div className="div-img">
                <Fade {...fadeProperties}>
                    {slideImages.map((slideImage, index) => (
                        <div className="home"
                        style={{  
                            backgroundImage: `url(${slideImage.url})`}}
                            >
                        </div>
                    ))
                }
                </Fade>    
            </div>
            <div className="main-paragraph">
                <div className="inside-paragraph">
                    <h1 className="title-h1">
                        <span className="title-span">
                            Dating at higher level
                        </span>
                    </h1>
                    <p className="paragraph">
                    Matcha is the perfect platform to present yourself to others in a comfortable ambiance.
                    </p>
                </div>
            </div>
        </div>
    )
}
