import { useEffect, useState } from "react";

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api
        fetch("/api/check-login")
            .then(res => res.json())
            .then(data => {
                if (data.loggedIn) setUser(data.user);
                setLoading(false);
            });
    }, []);

    return { user, loading };
};
