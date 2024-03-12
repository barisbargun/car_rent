import useTheme from "@/hooks/useTheme";
import { useGetCurrentUser } from "@/lib/data";
import { IUser } from "@/types/exports";
import React, { createContext, useContext, useEffect, useState } from "react";

type ContextProviderProps = {
    children: React.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
}

const INITIAL_USER = {
    id: "",
    username: "",
    email: "",
    imgUrl: "",
    role: -1
};

interface IContext {
    user: IUser;
    theme: Theme;
    setTheme: (theme: Theme) => void;
    isLogin: boolean | undefined;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

const INITIAL_STATE = {
    user: INITIAL_USER,
    theme: "dark" as Theme,
    setTheme: () => null,
    isLogin: undefined,
    setIsLogin: () => null,
};

const DataContext = createContext<IContext>(INITIAL_STATE)

export const DataProvider = ({
    children,
    defaultTheme,
    storageKey,
    ...props
}: ContextProviderProps) => {
    const [user, setUser] = useState<IUser>(INITIAL_USER);
    const [isLogin, setIsLogin] = useState<boolean | undefined>(INITIAL_STATE.isLogin);

    const { theme, setTheme } = useTheme({ storageKey, defaultTheme });
    const { data: currentUser, isSuccess, isError } = useGetCurrentUser();


    useEffect(() => {
        if (isSuccess && currentUser) {
            setUser(currentUser);
            setIsLogin(true);
        } else if (isError) {
            setUser(INITIAL_USER);
            setIsLogin(false);
        }
    }, [isSuccess, isError, currentUser])


    const value = {
        user, isLogin, setIsLogin, theme, setTheme
    };

    return (
        <DataContext.Provider {...props} value={value}>
            {children}
        </DataContext.Provider>
    )
}

export const _useContext = () => useContext(DataContext);