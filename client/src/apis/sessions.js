import { loginError } from '../actions/sessions';

export function login(userData, cb) {
    return dispatch =>
        fetch( 'http://localhost:5000/users/signIn', {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": userData.email,
                "password": userData.password,
            }),
        }).then(response => {
            if (response.ok) {
                cb();
            }
        }).catch(error => {
                console.log('request failed', error);
                dispatch(loginError(error));
            });
}

