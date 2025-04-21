"use client";

import { useEffect, useState } from "react";
import { HomePage } from "./components/home";
import styles from "./page.module.css";

import Session from "supertokens-auth-react/recipe/session";
import { redirectToAuth } from "supertokens-auth-react";
import { redirect } from "next/navigation";
import InteractiveBackground from './components/interactivePage';
import LoginPageNavigation from './components/loginPageNavigation';




export default function Home() {
    // const [isLoggedIn, setIsLoggedIn] = useState(false);

    // useEffect(() => {
    //     Session.doesSessionExist().then((exists) => {
    //         if (!exists) {
    //             redirect('/login'); // or router.push("/login")
    //         } else {
    //             setIsLoggedIn(true);
    //         }
    //     });
    // }, []);


    // if (!isLoggedIn) return null;
    // return <InteractiveBackground msg="Welcome to protected user dashboard" ButtonHandler={LogoutHandler} btnType="Logout"/>
    // return <div>Welcome to your dashboard!</div>;
    
    return (
        <main className={styles.main}>
            {/* <HomePage /> */}
            <InteractiveBackground msg="Welcome !" ButtonHandler={LoginPageNavigation} btnType="Login"/>

        </main>
    );
}
