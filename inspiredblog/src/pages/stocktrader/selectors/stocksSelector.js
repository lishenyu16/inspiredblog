import { createSelector, createStructuredSelector } from 'reselect';

export const getUsername = (state) => state.auth.username;
export const getUserId = (state) => state.auth.userId;

// export const getIsLoggedInSelector = createSelector(
//     getIsLoggedIn,
//     isLoggedIn => isLoggedIn,
// );

// export const getLoaderVisibleSelector = createSelector(
//     getLoaderVisible,
//     loaderVisible => loaderVisible,
// );

export const userSelector = createStructuredSelector({
    age: getAge,
    countryCode: getCountryCode,
    isLoggedIn: getIsLoggedIn,
    loaderVisible: getLoaderVisible,
    username: getUsername,
});