export const userDarkMode = () => {
    const isDarkMode = useState<boolean>("darkMode", () => false);

    onMounted(() => {
       isDarkMode.value = localStorage.getItem("theme") === "dark"
           || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    });

    const toggleDarkMode = (value: boolean) => {
        isDarkMode.value = value;
        localStorage.setItem("theme", value ? "dark" : "light");
        setDarkMode();
    };

    const setDarkMode = () => {
        const theme = localStorage.getItem("theme");
        if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return {
        isDarkMode,
        toggleDarkMode
    }
}