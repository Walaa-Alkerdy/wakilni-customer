import * as routes from './core/routes';
import * as network from './core/network';
import * as ServerStatus from '../constants/server_states';
import * as RecipientUtils from '../models/Recipients';

/**
 * Create new customer
 * @param {function} onSuccess Success Callback
 * @param {function} onFailure Failure Callback
 */
export function createCustomer(values, onSuccess, onFailure) {

    let body = {
        golden_rule: values.goldenRule,
        mof: values.mof,
        vat: values.vat,
        surcharge: values.surcharge,
        discount: values.discount,
        quality_check: values.qualityCheck,
        note: values.note,
        flag: values.flag,
        flag_reason: values.flagReason,
        user: {
            email: values.email,
            password: values.password,
            phone_number: values.phoneNumber,
            new: true,
            contact: {
                first_name: values.firstName,
                last_name: values.lastName,
                gender: values.gender,
                date_of_birth: values.dob,
                phone_number: values.phoneNumber,
                new: true
            }
        },
        payment_method: values.paymentMethod,
        type_id: values.typeId,
        operator_id: values.operatorId
    }

    network.postJSONData(routes.Customers.create, body, (result) => {
        onSuccess(result);
    }, (error) => {
        onFailure(error);
    });
}

/**
 * Create new receiver
 */
export function createNewReceiver(values, onSuccess, onFailure) {

    let body = {
        first_name: values.firstName,
        last_name: values.lastName,
        phone_number: values.phoneNumber,
        secondary_phone_number: values.secondaryPhoneNumber,
        date_of_birth: values.dob,
        gender: values.gender == 0 ? ServerStatus.Gender.Male.id : ServerStatus.Gender.Female.id,
        email: values.email,
        allow_driver_contact: values.allowDriverContact,
        location: {
            latitude: values.location.latitude,
            longitude: values.location.longitude,
            area_id: values.location.areaId,
            building: values.location.building,
            floor: values.location.floor,
            directions: values.location.directions,
            type_id: values.location.typeId
        }
    }

    console.log(body)

    network.postJSONDataWithAuthentication(String.format(routes.Customers.createNewReceiver, values.customerId), values.accessToken, body, (result) => {
        onSuccess(result);
    }, (error) => {
        onFailure(error);
    });
}

/**
 * fetch customer recipients
 */
export function fetchCustomerRecipients(values, onSuccess, onFailure) {

    let url = String.format(routes.Customers.getCustomerRecipients, values.customerId)

    if (values.pageNumber != null) {
        url = url + '?with_pagination=true&page=' + values.pageNumber
    } else {
        url = url + '?with_pagination=true&page=1'
    }

    console.log(url)

    network.fetchJSONDataWithAuthentication(url, values.accessToken, (result) => {

        var recipients = result.data.map((item) => {
            return RecipientUtils.Recipient(item);
        })
        onSuccess({ data: recipients, meta: result.meta })

    }, (error) => {
        onFailure(error);
    });
}