import { useState } from "react";

export function useNavigation() {
    const [navigation, setNavigation] = useState<string>("")

    return {navigation, setNavigation}
}