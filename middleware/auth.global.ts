export default defineNuxtRouteMiddleware((to, from) => {
    const isLoggedIn = false;

    // const {getUserList} = useAuth();

    // to is the destination
    // console.log(to)
    // console.log(from)
    if (isLoggedIn) {

        // redirect to the page we want to go
        return navigateTo(to.fullPath);
    }
    // redirect to a login page
    // return navigateTo("/login")
})