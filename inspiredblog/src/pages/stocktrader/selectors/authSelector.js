
// this is not a pure selector as it doesn't take state as arguement
export const checkAuthState = () =>{
    const expirationTime = localStorage.getItem('stock_expirationTime');
    const currentDate = new Date();
    if(localStorage.getItem('stock_token')){
        if (currentDate >= new Date(expirationTime)){
            localStorage.removeItem('stock_username');
            localStorage.removeItem('stock_token');
            localStorage.removeItem('stock_expirationTime');
            return false;
        } 
        return true;
    }
    return false;
}