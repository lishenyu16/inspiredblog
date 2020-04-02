
// this is not a pure selector as it doesn't take state as arguement
export const checkAuthState = () =>{
    const expirationTime = localStorage.getItem('expirationTime');
    const currentDate = new Date();
    if(localStorage.getItem('token')){
        if (currentDate >= expirationTime){
            localStorage.removeItem('username');
            localStorage.removeItem('email');
            localStorage.removeItem('isAdmin');
            localStorage.removeItem('token');
            localStorage.removeItem('expirationTime');
            return false;
        } 
        return true;
    }
    return false;
}