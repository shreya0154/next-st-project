'use client';

import { useEffect, useState } from "react";
import Session from "supertokens-auth-react/recipe/session";
import { redirectToAuth } from "supertokens-auth-react";
import InteractiveBackground from "../components/interactivePage";
import { redirect } from "next/navigation";
import LogoutHandler from '../components/logoutHandler';

export default function DashboardPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        Session.doesSessionExist().then((exists) => {
            if (!exists) {
                redirect('/login'); // or router.push("/login")
            } else {
                setIsLoggedIn(true);
            }
        });
    }, []);


    if (!isLoggedIn) return null;
    return <InteractiveBackground msg="Welcome to protected user dashboard" ButtonHandler={LogoutHandler} btnType="Logout"/>
    // return <div>Welcome to your dashboard!</div>;
}
