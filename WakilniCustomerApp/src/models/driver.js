import * as UserUtils from './user';
import * as VehicleUtils from './vehicles';

/**
 * Create a new driver object
 * @param {object} data Data returned from server
 */
export function Driver(data) {
    return {
        nationality: data.nationality,
        color: data.color,
        hasGps: data.has_gps,
        hasInternet: data.has_internet,
        status: data.status,
        user: UserUtils.User(data.user.id, data.user.email, data.user.phone_number),
        languageType: data.language_type,
        type: UserUtils.UserType(data.type.id, data.type.type, data.type.label),
        nowDriving: {
            id: data.now_driving.id,
            count: data.now_driving.count,
            remaining: data.now_driving.remaining,
            maintenance: data.now_driving.maintenance,
            typeId: data.now_driving.maintenance
        }
    }
}


/**
 * Create a new driver object for Tasks Response
 * @param {object} data Data returned from server
 */
export function DriverForTasks(data) {

    let vehicles = []
    if(data.drives){

        data.drives.forEach((vehicle) => {
            vehicles.push(VehicleUtils.Vehicle(vehicle.vehicle))
        })
    }

    return {
        nationality: data.nationality,
        color: data.color,
        hasGps: data.has_gps,
        hasInternet: data.has_internet,
        status: data.status,
        languageType: data.language_type,
        vehicles: vehicles
    }
}

/**
 * Create a driver model for help messages
 * @param {object} data JSON returned from server
 */
export function DriverForHelpMessages(data) {
    return {
        driverId: data.id,
        name: data.user.contact.name,
        phoneNumber: data.user.contact.phone_number
    }
}