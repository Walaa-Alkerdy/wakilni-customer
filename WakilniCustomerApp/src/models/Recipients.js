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
        allowDriverContact: data.allow_driver_contact ? data.allow_driver_contact : false,
        secondaryNumber: data.secondary_number,
        address: data.locations != null ? prepareAddress(data.locations) : '',
        note: data.note
    }
}

function prepareAddress(locations) {

    let final = ''

    if (locations.length > 0) {

        final = `${locations[0].type.label}`

        if (locations[0].area) {

            if (locations[0].area.zone) {

                final = `${final}: ${locations[0].area.zone.label}. ${locations[0].area.name}`
            } else {

                final = `${final}: ${locations[0].area.name}`
            }
        }
    }

    return final
}