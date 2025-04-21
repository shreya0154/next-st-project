
"use client";

import { useEffect, useRef } from 'react';
// import '@ant-design/v5-patch-for-react-19';
import '../styles/style.scss'; 
import { Button } from 'antd';
import LogoutHandler from './logoutHandler';
// import LogoutHandler from './logoutHandler';
import LoginPageNavigation from './loginPageNavigation';

interface InteractivePageProps {
    msg: string;
    ButtonHandler: () => void;
    btnType: string;
}

export default function InteractiveBackground({ msg, ButtonHandler, btnType}: InteractivePageProps) {
    
useEffect(()=>{
    const interBubble = document.querySelector<HTMLDivElement>('.interactive')!;
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    function move() {
        curX += (tgX - curX) / 20;
        curY += (tgY - curY) / 20;
        interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
        requestAnimationFrame(() => {
            move();
        });
    }

    window.addEventListener('mousemove', (event) => {
        tgX = event.clientX;
        tgY = event.clientY;
    });

    move();
}, []);

    return (
        <div className="gradient-bg">
            <div className="gradients-container">
                <div className="g1"></div>
                <div className="g2"></div>
                <div className="g3"></div>
                <div className="g4"></div>
                <div className="g5"></div>
                <div className="interactive"></div>
                <div className='center-content-dashboard'>
                <h1 >{msg}</h1>
                <Button className="interactive-page-button" onClick={ButtonHandler}>
                    {btnType}
                </Button>
                </div>
            </div>
        </div>
    );
}






