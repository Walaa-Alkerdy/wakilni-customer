import * as routes from './core/routes';
import * as network from './core/network';

/**
 * ReOpen task
 * @param {string} accessToken User authorization Token
 * @param {body} body request Body
 * @param {function} onSuccess Success callback
 * @param {function} onFailure Failure callback
 */
export function cashAccountSubmission(accessToken, driverId, body, onSuccess, onFailure) {
    network.postJSONDataWithAuthentication(String.format(routes.Submissions.submitCashAccount, driverId), accessToken, body, (result) => {
        
        onSuccess({ data: result.data, meta: result.meta });
    }, (error) => {
        if (onFailure) {
            onFailure(error);
        }
    })
}