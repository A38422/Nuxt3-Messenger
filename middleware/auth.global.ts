export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore();

    if (to.path === '/signup') {
        return;
    }

    if(!authStore.$state.user && to.path !== '/login'){
        return navigateTo('/login');
    }
    return;
})