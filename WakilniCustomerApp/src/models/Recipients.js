/**
 * Create a new recipients object
 * @param {object} data Data returned from server
 */
export function Recipient(data) {
    return {
        id: data.id,
        phoneNumber: data.phone_number,
        name: data.name,
        dateOfBirth: data.date_of_birth,
        allowDriverContact: true,
        address: data.type != null && data.locations != null ? prepareAddress(data.type, data.locations) : ''
    }
}

function prepareAddress(type, locations) {

    let final = type.label

    if (locations.length > 0) {

        if (locations.area) {

            if (locations.area.zone) {

                final = `${final}: ${locations[0].area.zone.label} ${locations[0].area.name}`
            } else {

                final = `${final}: ${locations[0].area.name}`
            }
        }
    }

    return final
}