import React from 'react'
import BgLogo from './BgEffect/bgLogo.jpg';
import BgDark from './BgEffect/dark.png';
import './home.css';
function Bg() {
    return (
        <div>
            <img className="bg-image" src={BgLogo} alt="bgLogo" />
            <img className="bg-image-dark" src={BgDark} alt="bgLogo" />
        </div>
    )
}

export default Bg
