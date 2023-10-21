export const userDarkMode = () => {
    const isDarkMode = useState<boolean>("darkMode", () => false);

    const toggleDarkMode = () => {
        isDarkMode.value = !isDarkMode.value;
    };

    return {
        isDarkMode,
        toggleDarkMode
    }
}