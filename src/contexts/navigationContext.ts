import { createContext } from "react";

type navigationContextType = {
    navigation: string;
    setNavigation: React.Dispatch<React.SetStateAction<string>>;
}

export const NavigationContext = createContext<navigationContextType | null>(null)