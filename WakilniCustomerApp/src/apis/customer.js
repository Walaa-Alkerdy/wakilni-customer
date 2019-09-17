import * as routes from './core/routes';
import * as network from './core/network';
import * as ServerStatus from '../constants/server_states';
import * as RecipientUtils from '../models/Recipients';
import * as LocationUtils from '../models/location';
import * as helpers from '../utils/helpers/localStorage';
import Locals from '../localization/local';

/**
 * Create new customer
 * @param {function} onSuccess Success Callback
 * @param {function} onFailure Failure Callback
 */
export function createCustomer(values, onSuccess, onFailure) {

    let body = {
        golden_rule: values.goldenRule,
        phone_number: values.shopPhone,
        shop_name: values.shopName,
        mof: values.mof,
        vat: values.vat,
        accounting_ref: values.accountingReferenceNumber,
        users: [{
            email: values.email,
            password: values.password,
            password_confirmation: values.password,
            new: true,
            contact: {
                first_name: values.firstName,
                last_name: values.lastName,
                gender: values.genderType == 0 ? ServerStatus.Gender.Male.id : ServerStatus.Gender.Female.id,
                date_of_birth: values.dob,
                phone_number: values.phoneNumber,
                new: true
            }
        }],
        payment_method: values.deliveryPaymentMethods,
        type_id: values.customerType,
        location: {
            latitude: values.coordinates.latitude,
            longitude: values.coordinates.longitude,
            area_id: values.area,
            building: values.building,
            floor: values.floor,
            directions: values.directions,
            type_id: values.locationType,
        }
    }

    console.log(body)

    network.postJSONData(routes.Customers.create, body, (result) => {

        let canEnter = false

        let roleData = { id: -1, name: '' }
        if (result.info.roles.length > 0) {

            result.info.roles.forEach((role) => {

                if (role.id == ServerStatus.UserRoles.Customer.id) {
                    canEnter = true
                }

                roleData = { id: role.id, name: role.name }
            })
        }

        if (!canEnter) {
            return onFailure(Locals.error_role_can_not_login)
        } else {

            let user = {
                tokenData: {
                    accessToken: result.access_token,
                    fcmToken: values.fcmToken,
                    // tokenType: result.token_type,
                    // expiresIn: result.expires_in
                },
                userInfo: {
                    id: result.info.id,
                    customerId: result.info.customer.id,
                    contactId: result.info.contact.id,
                    email: result.info.email,
                    firstName: result.info.contact.first_name,
                    lastName: result.info.contact.last_name,
                    phoneNumber: result.info.contact.phone_number,
                    dateOfBirth: result.info.contact.date_of_birth,
                    languageType: ServerStatus.LanguageType.ENGLISH,
                    // userType: result.user_info.role_name,
                    roleId: roleData.id,
                    isLastLogin: true,
                }
            }

            if (helpers.saveUser(user)) {

                let lang = 'en'

                if (helpers.saveLanguage(lang)) {
                    Locals.setLanguage(lang);
                    return onSuccess({ data: user, lang: lang });
                } else {

                    return onFailure('failed to selected language');
                }

            } else {
                return onFailure('failed to save user');
            }
        }

    }, (error) => {
        console.log(error)
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

    // console.log(body)

    network.postJSONDataWithAuthentication(String.format(routes.Customers.createNewReceiver, values.customerId), values.accessToken, body, (result) => {

        console.log(result, 'here')

        let newReceiverLocation = null

        if (result.data) {

            if (result.data.default_address) {
                newReceiverLocation = LocationUtils.LocationCustomer(result.data.default_address)
            }
        }
        console.log(newReceiverLocation);
        onSuccess({ newReceiverLocation });
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

    network.fetchJSONDataWithAuthentication(url, values.accessToken, (result) => {

        var recipients = result.data.map((item) => {
            return RecipientUtils.Recipient(item);
        })

        onSuccess({ data: recipients, meta: result.meta })

    }, (error) => {
        onFailure(error);
    });
}