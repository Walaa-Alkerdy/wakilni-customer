import * as routes from './core/routes';
import * as network from './core/network';
import * as CurrencyUtils from '../models/Currency';
import * as ConstantsUtils from '../models/ConstantsList';
import * as AreaUtils from '../models/Area';

/**
 * Upload File to server
 * @param {file} values Everything related to the file
 * @param {function} onSuccess Success Callback
 * @param {function} onFailure Failure Callback
 */
export function uploadFile(values, accessToken, onSuccess, onFailure) {

    let body = new FormData()
    let tempImage = {
        data: values.file.path,
        name: values.file.name,
        type: values.file.type,
    }
    body.append('file', JSON.stringify(tempImage))

    console.log(body)

    network.postFormDataWithAuthentication(routes.Upload.uploadFile, accessToken, body, (result) => {
        onSuccess(result);
    }, (error) => {
        onFailure(error);
    });
}

export function getCurrencies(accessToken, onSuccess, onFailure) {

    network.fetchJSONDataWithAuthentication(routes.Currency.getCurrencies, accessToken, (result) => {

        var finalResult = result.data.map((item) => {
            return CurrencyUtils.Currency(item);
        })
        onSuccess({ data: finalResult, meta: result.meta });
    }, (error) => {
        onFailure(error);
    });
}

export function getConstantsList(accessToken, onSuccess, onFailure) {

    network.fetchJSONData(routes.Constants.getConstantsList, (result) => {

        onSuccess({ data: ConstantsUtils.ConstantsListMain(result.data), meta: result.message });
    }, (error) => {
        onFailure(error);
    });
}

export function getAreas(onSuccess, onFailure) {

    network.fetchJSONData(routes.Constants.getAreas, (result) => {
        var finalResult = result.data.map((item) => {
            return AreaUtils.Area(item);
        })
        onSuccess({ data: finalResult, meta: result.meta });
    }, (error) => {
        onFailure(error);
    });
}