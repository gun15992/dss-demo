// Import Libraries
import Keycloak from 'keycloak-js';
import React, { useState, useEffect, useRef } from 'react';

const client = new Keycloak({
    url: import.meta.env.VITE_KEYCLOAK_URL,
    realm: import.meta.env.VITE_KEYCLOAK_REALM,
    clientId: import.meta.env.VITE_KEYCLOAK_CLIENT
});

const useAuth = () => {
    const isRun = useRef(false);
    const [isLogin, setLogin] = useState(false);

    useEffect(() => {
        if (!isRun.current) {
            isRun.current = true;
            return;
        }
        client.init({ onLoad: "login-required" }).then((res) => setLogin(res));
    }, []);
    return isLogin;
}

export default useAuth;