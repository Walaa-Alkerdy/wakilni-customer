import * as routes from './core/routes';
import * as network from './core/network';
import { DriverForHelpMessages } from '../models/driver';
import * as LocationUtils from '../models/location';


/**
 * Fetch list of drivers for a specific zone
 * @param {int} locationId ID of location
 * @param {string} accessToken User authorization token
 * @param {function} onSuccess Success callback
 * @param {function} onFailure Failure callback
 */
export function fetchDriversOfLocation(locationId, accessToken, onSuccess, onFailure) {
    network.fetchJSONDataWithAuthentication(String.format(routes.Location.listDrivers, locationId), accessToken, (result) => {
        var drivers = [];
        if (result && result.data && Array.isArray(result.data)) {
            drivers = result.data.map((item) => {
                return DriverForHelpMessages(item);
            })
        }
        onSuccess(drivers)
    }, (error) => {
        if (onFailure) {
            onFailure(error);
        }
    });
}

/**
 * Fetch Locations
 * @param {string} accessToken User's authorization token
 * @param {string} customerId 
 */
export function getLocations(values, onSuccess, onFailure) {

    let url = String.format(routes.Location.getLocations, values.customerId)

    if (values.queryString) {
        url = url + '&name=' + values.queryString
    } else {
        url = url + '&just_customer=true'
    }

    network.fetchJSONDataWithAuthentication(url, values.accessToken, (result) => {

        var Locations = [];
        if (result && result.data && Array.isArray(result.data)) {
            Locations = result.data.map((item) => {
                return LocationUtils.LocationCustomer(item);
            })
            try {
                Locations = Locations.sort((a, b) => {
                    return a.location > b.location
                })
            } catch (e) { }
        }
        onSuccess(Locations)
    }, (error) => {
        if (onFailure) {
            onFailure(error);
        }
    });
}

/**
 * Create new customer location
 * @param {function} onSuccess Success Callback
 * @param {function} onFailure Failure Callback
 */
export function createCustomerLocation(values, onSuccess, onFailure) {

    let body = {
        customer_id: values.customerId,
        area_id: values.areaId,
        type_id: values.typeId,
        building: values.building,
        latitude: values.coordinates.latitude,
        longitude: values.coordinates.longitude,
        floor: values.floor,
        directions: values.directions,
        picture: values.picture
    }

    network.postJSONDataWithAuthentication(routes.Location.create, values.accessToken, body, (result) => {
        onSuccess(result);
    }, (error) => {
        onFailure(error);
    });
}
