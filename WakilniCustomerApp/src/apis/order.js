import * as routes from './core/routes';
import * as network from './core/network';
import * as OrderUtils from '../models/order';

import * as generalHelpers from '../utils/helpers/generalHelpers';

/**
 * Get Customer Orders
 * @param {string} accessToken
 */
export function getOrders(values, onSuccess, onFailure) {

    let url = String.format(routes.Orders.getOrders, values.id)

    if (values.isFiltering) {
        url = routes.Orders.createOrder + '?search='

        if (values.wayBill != '') {
            url = url + 'waybill:' + values.wayBill + ';'
        }

        if (values.selectedRecipient) {
            url = url + 'orderDetails.receiverable_id:' + values.selectedRecipient.id + ';'
        }

        if (values.selectedOrderType) {
            url = url + 'orderDetails.type_id:' + values.selectedOrderType.key + ';'
        }

        if (values.selectedStatus) {
            url = url + 'status:' + values.selectedStatus.key + ';'
        } else {
            url = url + 'status:1,2,3,5;'//all
        }

        url = url + `orderDetails.customer_id:${values.id}&searchJoin=and`;

        if (values.createdOn) {
            url = url + '&from_created_at=' + values.createdOn
        }

        if (values.createdTill) {
            url = url + '&to_created_at=' + values.createdTill
        }

        if (values.completedOn) {
            url = url + '&from_completed_on=' + values.completedOn
        }

        if (values.completedTill) {
            url = url + '&to_completed_on=' + values.completedTill
        }

    }

    if (values.pageNumber != null) {
        url = url + '&page=' + values.pageNumber
    } else {
        url = url + '&page=0'
    }

    console.log(url)

    network.fetchJSONDataWithAuthentication(url, values.accessToken, (result) => {

        console.log(result)

        var orders = result.data.map((item) => {
            return OrderUtils.OrderForCustomer(item);
        })
        onSuccess({ data: orders, meta: result.meta })

    }, (error) => {
        console.log(error)
        onFailure(error)
    })
}

/**
 * Create Order 
 */
export function createOrder(values, onSuccess, onFailure) {

    let tempReceiveData = []

    values.orderDetails.receiveData.forEach((item) => {

        let tempPackages = []

        item.packages.forEach((pack) => {
            tempPackages.push({
                new: true,
                quantity: pack.quantity,
                type_id: pack.typeId,
                trip_number: pack.tripNumber
            })
        })

        tempReceiveData.push({
            receiver_location_id: item.receiverLocationId,
            preferred_receiver_date: item.preferredReceiverDate,
            preferred_receiver_from_time: item.preferredReceiverFromTime,
            preferred_receiver_to_time: item.preferredReceiverToTime,
            description: item.description,
            collection_currency: item.collectionCurrency,
            cash_collection_type_id: item.collectionTypeId,
            collection_amount: item.collectionAmount,
            allow_receiver_contact: item.allowReceiverContact,
            send_receiver_msg: item.sendReceiverMsg,
            same_package: item.isSamePackage,
            waybill: item.wayBill,
            packages: tempPackages
        })
    })

    let body = {
        new: true,
        orderDetails: {
            preferred_sender_date: values.orderDetails.senderData,
            preferred_sender_from_time: values.orderDetails.senderFromTime,
            preferred_sender_to_time: values.orderDetails.senderToTime,
            new: true,
            type_id: values.orderDetails.typeId,
            // same_package: values.orderDetails.isSamePackage,
            customer_id: values.orderDetails.customerId,
            payment_type_id: values.orderDetails.paymentTypeId,
            sender_location_id: values.orderDetails.senderLocationId,
            receive_data: tempReceiveData,
            sender_location_area_id: values.orderDetails.senderLocationAreaId,
            require_signature: values.orderDetails.requireSignature,
            require_picture: values.orderDetails.requirePicture
        }
    }

    network.postJSONDataWithAuthentication(routes.Orders.createOrder, values.accessToken, body, (result) => {

        // console.log(result, 'create Order')
        onSuccess(result)

    }, (error) => {

        onFailure(error)
    })
}