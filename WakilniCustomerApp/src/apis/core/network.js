// export const BASE_URL = 'http://34.239.129.110/api/';
export const BASE_URL = 'https://api.wakilni.com/api/';
// export const BASE_URL = 'http://api-dev.wakilni.com/api/';
// export const BASE_URL = 'https://2e7f412d.ngrok.io/wakilni/public/api/'
// export const BASE_URL = 'http://172.17.5.5/wakilni/public/api/';

import * as localStorage from '../../utils/helpers/localStorage';

/**
 * Check if result is success
 * @param {Response} result Server Response
 */
function isSuccess(result) {
    return (result.status >= 200 && result.status < 300)
}

/**
 * Fetch JSON data from server without authorization
 * @param {string} url Request URL
 * @param {function} onSuccess Success callback
 * @param {function} onFailure Failure callback
 */
export function fetchJSONData(url, onSuccess, onFailure) {
    fetch(BASE_URL + url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }).then((result) => {
        if (isSuccess(result)) {
            if (result.status == 204) {
                return {}
            }
            return result.json();
        } else {

            if (result.status == 401 || result.status == 403) {
                localStorage.saveAuthStatus("true")
            }

            result.json().then(function (err) {
                if (err.message) {

                    return onFailure(err.message);
                } else if (err.error) {

                    return onFailure(err.error);
                } else if (err.errors) {

                    return onFailure(err.errors);
                } else {

                    return onFailure('something went wrong');
                }
            });

            return null;
        }
    }).then((json) => {
        if (onSuccess && json) {
            onSuccess(json);
        }
    }).catch((error) => {
        if (onFailure) {
            if (error.message) {
                onFailure(error.message)
            } else {
                onFailure(error);
            }
        }
    })
}


/**
 * Fetch JSON data from server with authorization header
 * @param {string} url Request URL
 * @param {string} token User authorization token
 * @param {function} onSuccess Success callback
 * @param {function} onFailure Failure callback
 */
export function fetchJSONDataWithAuthentication(url, token, onSuccess, onFailure, isForTokenValidation) {
    fetch(BASE_URL + url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }).then((result) => {
        if (isSuccess(result)) {
            if (result.status == 204) {
                return {}
            }
            return result.json();
        } else {

            if (result.status == 401 || result.status == 403) {
                localStorage.saveAuthStatus("true")
                if (isForTokenValidation) {
                    return onFailure(result.status)
                }
            }

            result.json().then(function (err) {
                if (err.message) {

                    return onFailure(err.message);
                } else if (err.error) {

                    return onFailure(err.error);
                } else if (err.errors) {

                    return onFailure(err.errors);
                } else {

                    return onFailure('something went wrong');
                }
            });

            return null;
        }
    }).then((json) => {
        if (onSuccess && json) {
            onSuccess(json);
        }
    }).catch((error) => {
        if (onFailure) {
            if (error.message) {
                onFailure(error.message)
            } else {
                onFailure(error);
            }
        }
    })
}

/**
 * POST JSON data to server - Without authorization header
 * @param {string} url Request URL
 * @param {string} token User authorization token
 * @param {function} onSuccess Success callback
 * @param {function} onFailure Failure callback
 */
export function postFormData(url, data, onSuccess, onFailure) {
    fetch(BASE_URL + url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        },
        body: data
    }).then((result) => {
        if (isSuccess(result)) {
            if (result.status == 204) {
                return {}
            } else {
                return result.json();
            }
        } else {

            if (result.status == 401 || result.status == 403) {
                localStorage.saveAuthStatus("true")
            }

            result.json().then(function (err) {
                if (err.message) {

                    return onFailure(err.message);
                } else if (err.error) {

                    return onFailure(err.error);
                } else if (err.errors) {

                    return onFailure(err.errors);
                } else {

                    return onFailure('something went wrong');
                }
            });

            return null;
        }
    }).then((json) => {
        if (onSuccess && json) {
            onSuccess(json);
        }
    }).catch((error) => {
        if (error.message) {
            onFailure(error.message)
        } else {
            onFailure(error);
        }
    })
}

/**
 * POST JSON data to server - With authorization header
 * @param {string} url Request URL
 * @param {string} token User authorization token
 * @param {function} onSuccess Success callback
 * @param {function} onFailure Failure callback
 */
export function postFormDataWithAuthentication(url, token, data, onSuccess, onFailure) {

    fetch(BASE_URL + url, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        },
        body: data
    }).then((result) => {
        if (isSuccess(result)) {
            if (result.status == 204) {
                return {}
            } else {
                return result.json();
            }
        } else {

            if (result.status == 401 || result.status == 403) {
                localStorage.saveAuthStatus("true")
            }

            result.json().then(function (err) {
                if (err.message) {

                    return onFailure(err.message);
                } else if (err.error) {

                    return onFailure(err.error);
                } else if (err.errors) {

                    return onFailure(err.errors);
                } else {

                    return onFailure('something went wrong');
                }
            });

            return null;
        }
    }).then((json) => {
        if (onSuccess && json) {
            onSuccess(json);
        }
    }).catch((error) => {
        // console.log(error)
        if (error.message) {
            onFailure(error.message)
        } else {
            onFailure(error);
        }
    })
}

/**
 * POST JSON data to server - Without authorization header
 * @param {string} url Request URL
 * @param {string} token User authorization token
 * @param {function} onSuccess Success callback
 * @param {function} onFailure Failure callback
 */
export function postJSONData(url, data, onSuccess, onFailure) {
    fetch(BASE_URL + url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((result) => {
        if (isSuccess(result)) {
            if (result.status == 204) {
                return {}
            } else {
                return result.json();
            }
        } else {

            if (result.status == 401 || result.status == 403) {
                localStorage.saveAuthStatus("true")
            }

            result.json().then(function (err) {

                if (err.errors) {

                    let tempErrors = []
                    Object.keys(err.errors).map((key, value) => {
                        tempErrors.push({
                            msg: err.errors[key][0]
                        });
                    })

                    if (tempErrors.length > 0) {
                        return onFailure(tempErrors[0].msg)
                    } else {
                        return onFailure('Something went wrong')
                    }

                } else {
                    if (err.message) {

                        return onFailure(err.message);
                    } else if (err.error) {

                        return onFailure(err.error);
                    } else if (err.errors) {

                        return onFailure(err.errors);
                    } else {

                        return onFailure('something went wrong');
                    }
                }
            });

            return null;
        }
    }).then((json) => {
        if (onSuccess && json) {
            onSuccess(json);
        }
    }).catch((error) => {
        if (error.message) {
            onFailure(error.message)
        } else {
            onFailure(error);
        }
    })
}

/**
 * POST JSON data to server
 * @param {string} url Request URL
 * @param {string} token User authorization token
 * @param {function} onSuccess Success callback
 * @param {function} onFailure Failure callback
 */
export function postJSONDataWithAuthentication(url, token, data, onSuccess, onFailure) {
    fetch(BASE_URL + url, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((result) => {
        if (isSuccess(result)) {
            if (result.status == 204) {
                return {}
            } else {
                return result.json();
            }
        } else {

            // console.log(result)

            if (result.status == 401 || result.status == 403) {
                localStorage.saveAuthStatus("true")
            }

            result.json().then(function (err) {
                if (err.message) {

                    return onFailure(err.message);
                } else if (err.error) {

                    return onFailure(err.error);
                } else if (err.errors) {

                    return onFailure(err.errors);
                } else {

                    return onFailure('something went wrong');
                }
            });

            return null;
        }
    }).then((json) => {
        if (onSuccess && json) {
            onSuccess(json);
        }
    }).catch((error) => {
        if (error.message) {
            onFailure(error.message)
        } else {
            onFailure(error);
        }
    })
}

/**
 * Update JSON data on server
 * @param {string} url Request URL
 * @param {string} token User authorization token
 * @param {function} onSuccess Success callback
 * @param {function} onFailure Failure callback
 */
export function putJSONDataWithAuthentication(url, token, data, onSuccess, onFailure) {
    fetch(BASE_URL + url, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((result) => {

        // console.log(result)

        if (isSuccess(result)) {
            if (result.status == 204) {
                return {}
            } else {
                return result.json();
            }
        } else {

            if (result.status == 401 || result.status == 403) {
                localStorage.saveAuthStatus("true")
            }

            result.json().then(function (err) {
                if (err.message) {

                    return onFailure(err.message);
                } else if (err.error) {

                    return onFailure(err.error);
                } else if (err.errors) {

                    return onFailure(err.errors);
                } else {

                    return onFailure('something went wrong');
                }
            });

            return null;
        }
    }).then((json) => {
        if (onSuccess && json) {
            onSuccess(json);
        }
    }).catch((error) => {
        if (error.message) {
            onFailure(error.message)
        } else {
            onFailure(error);
        }
    })
}

/**
 * Fetch JSON data from server
 * @param {string} url Request URL
 * @param {string} token User authorization token
 * @param {function} onSuccess Success callback
 * @param {function} onFailure Failure callback
 */
export function deleteJSONDataWithAuthentication(url, token, data, onSuccess, onFailure) {
    fetch(BASE_URL + url, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((result) => {
        if (isSuccess(result)) {
            if (result.status == 204) {
                return {}
            } else {
                return result.json();
            }
        } else {

            if (result.status == 401 || result.status == 403) {
                localStorage.saveAuthStatus("true")
            }

            result.json().then(function (err) {
                if (err.message) {

                    return onFailure(err.message);
                } else if (err.error) {

                    return onFailure(err.error);
                } else if (err.errors) {

                    return onFailure(err.errors);
                } else {

                    return onFailure('something went wrong');
                }
            });

            return null;
        }
    }).then((json) => {
        if (onSuccess && json) {
            onSuccess(json);
        }
    }).catch((error) => {
        if (error.message) {
            onFailure(error.message)
        } else {
            onFailure(error);
        }
    })
}