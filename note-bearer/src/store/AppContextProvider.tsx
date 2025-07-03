import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase-config";
import { useEffect, useState } from "react";
import { getUserData } from "../services/user.services";
import { AppContext } from "./app-context";
import type { ReactNode } from "react";
import type { User } from "firebase/auth";
import type { AppUserData } from "../types/UserTypes";

type Props = {
    children: ReactNode;
}

export const AppContextProvider = ({ children }: Props) => {
    const [user, loading] = useAuthState(auth);
    const [appState, setAppState] = useState<{
        user: User | null;
        userData: AppUserData | null;
        loading?: boolean;
    }>({
        user: null,
        userData: null,
        loading: true,
    });

    useEffect(() => {
        async function fetchUserData() {
            if (!user) {
                setAppState({
                    user: null,
                    userData: null,
                    loading: false,
                })
                return;
            }

            try {
                const userData = await getUserData(user.uid);
                setAppState({
                    user,
                    userData: userData || null,
                    loading: false,
                });
                console.log('User data fetched:', userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setAppState({
                    user,
                    userData: null,
                    loading: false,
                });
            }
        }
        if(!loading) {
            fetchUserData();
        }
    }, [user]);

    const customSetAppState = (state: Partial<typeof appState>) => {
        setAppState(prev => ({
            ...prev,
            ...state,
        }));
    };

    return (
        <AppContext.Provider value={{ ...appState, setAppState: customSetAppState }}>
            {children}
        </AppContext.Provider>
    );
}