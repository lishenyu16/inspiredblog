export const checkAuthState = () =>{
    console.log('inside authSelector');
    const expirationTime = localStorage.getItem('expirationTime');
    const currentDate = new Date();
    if(localStorage.getItem('token')){
        console.log('has token.')
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
    console.log('auth false')
    return false;
}