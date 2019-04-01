import * as TaskUtils from './task';
import * as PackageUtils from './Packages';

export function OrderForTask(data) {
    return {
        id: data.id,
        orderNumber: data.order_number,
        rate: data.rate,
        scheduleDate: data.schedule_date,
        // preferredFromTime: data.preferred_from_time,
        // preferredToTime: data.preferred_to_time,
        completedOn: data.completed_on,
        paymentStatus: data.payment_status,
        packageStatus: data.package_status,
        status: data.status,
        remainingBalance: data.remaining_balance,
        price: data.price,
        parentId: data.parent_id,
        orderDetailsId: data.order_details_id,
        statusCode: data.status_code,
        packageStatusCode: data.package_status_code,
        customer: data.customer,
        store: data.store,
        orderDetails: {
            id: data.order_details.id,
            price: data.order_details.price,
            collectionAmount: data.order_details.collection_amount,
            note: data.order_details.note,
            description: data.order_details.description,
            requireSignature: data.order_details.require_signature,
            requirePicture: data.order_details.require_picture,
            senderableId: data.order_details.senderable_id,
            senderableType: data.order_details.senderable_type,
            receiverableId: data.order_details.receiverable_id,


            receiverableType: data.order_details.receiverable_id,
            paymentTypeId: data.order_details.payment_type_id,
            cashCollectionTypeId: data.order_details.cash_collection_type_id,
            customerId: data.order_details.customer_id,
            piggyBankId: data.order_details.piggy_bank_id,
            typeId: data.order_details.type_id,
            senderLocationId: data.order_details.sender_location_id,
            receiverLocationId: data.order_details.receiver_location_id,
            collectionCurrency: data.order_details.collection_currency,
            storeId: data.order_details.store_id,
        }
    }
}

export function OrderForCustomer(data) {

    let tasks = []
    let packages = []

    data.t.forEach((task) => { // Tasks
        tasks.push(TaskUtils.Task(task))
    })

    if (data.oD.p) {
        data.oD.p.forEach((packageItem) => { // packages
            packages.push(PackageUtils.Packages(packageItem))
        })
    }

    return {
        additionalCharges: data.aC, //additional Charges
        childrenCount: data.c_c, // children count
        commentId: data.c_i,// comment id
        comments: data.c, // comments
        completedOn: data.c_o, //completed on
        createdDate: data.c_d ? { //created date
            date: data.c_d.date,
            timeZoneType: data.c_d.timeZoneType,
            timeZone: data.c_d.timezone
        } : null,
        id: data.id, // id
        lastWorker: data.l_w ? { //last worker
            id: data.l_w.id,
            nationality: data.l_w.nationality,
            color: data.l_w.color,
            hasGPS: data.l_w.has_gps,
            hasInternet: data.l_w.has_internet,
            name: data.l_w.name,
            phoneNumber: data.l_w.phone_number,
            email: data.l_w.user ? data.l_w.user.email : null
        } : null,
        nextTaskStatus: data.n_t_s, // next task status
        nextTaskStatusCode: data.n_t_s_c, // next tast code
        orderDetails: data.oD ? { // order details
            // appRefId: data.orderDetails.app_ref_id,
            // appTokenId: data.orderDetails.app_token_id,
            cashCollectionType: data.oD.c_c_t ? { // cash collection type
                id: data.oD.c_c_t.id,
                type: data.oD.c_c_t.type,
                label: data.oD.c_c_t.label
            } : null,
            collectionAmount: data.oD.c_a, // collection amount
            collectionCurrency: data.oD.c_c ? { // collection currency
                id: data.oD.c_c.id
            } : null,
            description: data.oD.d, //d escription
            id: data.oD.id,// id
            note: data.oD.n, // note
            packages: data.packages, // packages
            paymentType: data.oD.p_t ? { // payment type
                id: data.oD.p_t.id,
                type: data.oD.p_t.type,
                label: data.oD.p_t.label,
                createdAt: data.oD.p_t.created_at,
            } : null,
            piggyBankId: data.oD.p_b_i, // piggy bank id
            preferredReceiverDate: data.oD.p_r_d, // preferred receiver date
            preferredReceiverFromTime: data.oD.p_r_f_t, // preferred receiver from date
            preferredReceiverToTime: data.oD.p_r_t_t,// preferred receiver to date
            preferredSenderDate: data.oD.p_s_d,// preferred sender date
            preferredSenderFromTime: data.oD.p_s_f_t,// preferred sender from time
            preferredSenderToTime: data.oD.p_s_t_t,// preferred sender to time
            receiverLocation: data.oD.r_l ? { // receiver location
                id: data.oD.r_l.id,
                location: data.oD.r_l.location,
                fullLocation: data.oD.r_l.full_location,
                area: data.oD.r_l.area ? {
                    id: data.oD.r_l.area.id,
                    name: data.oD.r_l.area.name,
                    zone: data.oD.r_l.area.zone ? {
                        id: data.oD.r_l.area.zone.id,
                        label: data.oD.r_l.area.zone.label,
                    } : null,
                } : null,
            } : null,
            receiverable: data.oD.r ? { // receiverable
                id: data.oD.r.id,
                isRecipient: data.oD.r.is_recipient,
                name: data.oD.r.name,
                phoneNumber: data.oD.r.phone_number
            } : null,
            requirePicture: data.oD.r_p, // require picture
            requireSignature: data.oD.r_s, // require signature
            samePackage: data.oD.s_p, // same package
            senderLocation: data.oD.s_l ? { // sender location
                id: data.oD.s_l.id,
                location: data.oD.s_l.location,
                fullLocation: data.oD.s_l.full_location,
                area: data.oD.s_l.area ? {
                    id: data.oD.s_l.area.id,
                    name: data.oD.s_l.area.name,
                    zone: data.oD.s_l.area.zone ? {
                        id: data.oD.s_l.area.zone.id,
                        label: data.oD.s_l.area.zone.label,
                    } : null,
                } : null,
            } : null,
            senderable: data.oD.s ? { // senderable
                id: data.oD.s.id,
                isRecipient: data.oD.s.is_recipient,
                name: data.oD.s.name,
                phoneNumber: data.oD.s.phone_number
            } : null,
            type: data.oD.t ? { // type
                id: data.oD.t.id,
                label: data.oD.t.label,
                type: data.oD.t.type,
                createdAt: data.oD.t.created_at
            } : null,
        } : null,
        orderNumber: data.o_n,// order number
        packageStatus: data.pk_s, // package status
        packageStatusCode: data.pk_s_c, // package status code
        parentId: data.p_i, // parent id
        paymentStatus: data.p_s, // payment status
        paymentStatusCode: data.p_s_c, // payment status code
        price: data.p, // price
        rate: data.r, // rate
        remainingBalance: data.r_b, // remaining balance
        scheduleData: data.s_d, // schedule date
        scheduleFromTime: data.s_f_t, // schedule from time
        scheduleToTime: data.s_t_t, // schedule to time
        status: data.s, // status
        statusCode: data.s_c, // status code
        tasks: tasks,
        wayBill: data.w, // waybill
        worker: data.wk // worker
    }
}