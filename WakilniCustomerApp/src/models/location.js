/**
 * Create a new location object
 * @param {string} city City name
 * @param {string} country Country name
 * @param {string} building Building name
 * @param {int} floor Floor number
 * @param {string} directions Directions
 * @param {int} zoneId ID of zone
 * @param {int} typeId ID of type
 */
export function Location(city, country, building, floor, directions, zoneId, typeId) {
    return {
        city: city,
        country: country,
        building: building,
        floor: floor,
        directions: directions,
        zoneId: zoneId,
        typeId: typeId
    }
}


/**
 * Create a location object to be used with Task Object
 * @param {object} data JSON data of location from Task Response
 */
export function LocationForTask(data) {

    let locationLogs = [];

    if (data.location_logs) {
        data.location_logs.forEach((item) => {

            locationLogs.push({
                id: item.id,
                type: item.type ? {
                    id: item.type.id,
                    type: item.type.type,
                    label: item.type.label,
                    deletedAt: item.type.deleted_at,
                    createdAt: item.type.created_at,
                    updatedAt: item.type.updated_at
                } : null,
                data: item.data
            })
        })
    }

    return {
        id: data.id,
        building: data.building ? data.building + ', ' : '',
        floor: data.floor,
        directions: data.directions ? data.directions : '',
        longitude: data.longitude ? parseFloat(data.longitude) : null,
        latitude: data.latitude ? parseFloat(data.latitude) : null,
        areaId: data.area.zone.id,
        areaData: data.area ? {
            id: data.area.id,
            name: data.area.name,
            zone: data.area.zone ? {
                id: data.area.zone.id,
                label: data.area.zone.label
            } : null,
        } : null,
        personableId: data.personable_id,
        personableType: data.personable_type,
        typeId: data.type.id,
        locationLogs: locationLogs
    }
}

export function LocationCustomer(data) {

    let locationFinal = data.full_location
    // if (data.full_location && data.full_location != '') {
    //     let tempArray = data.full_location.split("-")
    //     if (tempArray.length > 2) {
    //         locationFinal = tempArray[1] + ' - ' + tempArray[2]
    //     } else if (tempArray.length > 1) {
    //         locationFinal = tempArray[1]
    //     }
    // }

    return {
        id: data.id,
        // isActive: data.is_active,
        location: locationFinal ? locationFinal.trim() : '',
        allowDriverContact: data.allow_driver_contact,
        // building: data.building,
        // floor: data.floor,
        // directions: data.directions,
        // longitude: data.longitude,
        // latitude: data.latitude,
        area: data.area ? {
            id: data.area.id,
            // name: data.area.name,
            // zone: data.area.zone ? {
            //     id: data.area.zone.id,
            //     label: data.area.zone.label,
            //     withinGBA: data.area.zone.within_gba
            // } : null,
        } : null,
        // type: data.type ? {
        //     id: data.type.id,
        //     type: data.type.type,
        //     label: data.type.label,
        // } : null,
        // personable: data.personable ? {
        //     id: data.personable.id,
        //     name: data.personable.name,
        //     phoneNumber: data.personable.phone_number,
        //     isActive: data.personable.is_active,
        //     secondaryPhoneNumber: data.personable.secondary_phone_number,
        //     allowDriverContant: data.personable.allowDriverContant,
        //     viewer: data.personable.viewer
        // } : null
    }
}