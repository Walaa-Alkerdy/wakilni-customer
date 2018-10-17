import * as TaskUtils from './task';

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

    data.tasks.forEach((task) => {
        tasks.push(TaskUtils.Task(task))
    })

    return {
        additionalCharges: data.additionalCharges,
        childrenCount: data.children_count,
        commentId: data.comment_id,
        comments: data.comments,
        completedOn: data.completed_on,
        createdDate: data.created_date ? {
            date: data.created_date.date,
            timeZoneType: data.created_date.timeZoneType,
            timeZone: data.created_date.timezone
        } : null,
        id: data.id,
        lastWorker: data.last_worker ? {
            id: data.last_worker.id,
            nationality: data.last_worker.lebanese,
            color: data.last_worker.color,
            hasGPS: data.last_worker.has_gps,
            hasInternet: data.last_worker.has_internet,
            name: data.last_worker.name,
            phoneNumber: data.last_worker.phone_number,
            email: data.last_worker.user ? data.last_worker.user.email : null
        } : null,
        nextTaskStatus: data.next_task_status,
        nextTaskStatusCode: data.next_task_status_code,
        orderDetails: data.orderDetails ? {
            appRefId: data.orderDetails.app_ref_id,
            appTokenId: data.orderDetails.app_token_id,
            cashCollectionType: data.orderDetails.cash_collection_type ? {
                id: data.orderDetails.cash_collection_type.id,
                type: data.orderDetails.cash_collection_type.type,
                label: data.orderDetails.cash_collection_type.label
            } : null,
            collectionAmount: data.orderDetails.collection_amount,
            collectionCurrency: data.orderDetails.collection_currency ? {
                id: data.orderDetails.collection_currency.id
            } : null,
            description: data.orderDetails.description,
            id: data.orderDetails.id,
            note: data.orderDetails.note,
            packages: data.orderDetails.packages,
            paymentType: data.orderDetails.payment_type ? {
                id: data.orderDetails.payment_type.id,
                type: data.orderDetails.payment_type.type,
                label: data.orderDetails.payment_type.label,
                createdAt: data.orderDetails.payment_type.created_at,
            } : null,
            piggyBankId: data.orderDetails.piggy_bank_id,
            preferredReceiverDate: data.orderDetails.preferred_receiver_date,
            preferredReceiverFromTime: data.orderDetails.preferred_receiver_from_time,
            preferredReceiverToTime: data.orderDetails.preferred_receiver_to_time,
            preferredSenderDate: data.orderDetails.preferred_sender_date,
            preferredSenderFromTime: data.orderDetails.preferred_sender_from_time,
            preferredSenderToTime: data.orderDetails.preferred_sender_to_time,
            receiverLocation: data.orderDetails.receiver_location ? {
                id: data.orderDetails.receiver_location.id,
                location: data.orderDetails.receiver_location.location,
                fullLocation: data.orderDetails.receiver_location.full_location,
                area: data.orderDetails.receiver_location.area ? {
                    id: data.orderDetails.receiver_location.area.id,
                    name: data.orderDetails.receiver_location.area.name,
                    zone: data.orderDetails.receiver_location.area.zone ? {
                        id: data.orderDetails.receiver_location.area.zone.id,
                        label: data.orderDetails.receiver_location.area.zone.label,
                    } : null,
                } : null,
            } : null,
            receiverable: data.orderDetails.receiverable ? {
                id: data.orderDetails.receiverable.id,
                isRecipient: data.orderDetails.receiverable.is_recipient,
                name: data.orderDetails.receiverable.name,
                phoneNumber: data.orderDetails.receiverable.phone_number
            } : null,
            requirePicture: data.orderDetails.require_picture,
            requireSignature: data.orderDetails.require_signature,
            samePackage: data.orderDetails.same_package,
            senderLocation: data.orderDetails.sender_location ? {
                id: data.orderDetails.sender_location.id,
                location: data.orderDetails.sender_location.location,
                fullLocation: data.orderDetails.sender_location.full_location,
                area: data.orderDetails.sender_location.area ? {
                    id: data.orderDetails.sender_location.area.id,
                    name: data.orderDetails.sender_location.area.name,
                    zone: data.orderDetails.sender_location.area.zone ? {
                        id: data.orderDetails.sender_location.area.zone.id,
                        label: data.orderDetails.sender_location.area.zone.label,
                    } : null,
                } : null,
            } : null,
            senderable: data.orderDetails.senderable ? {
                id: data.orderDetails.senderable.id,
                isRecipient: data.orderDetails.senderable.is_recipient,
                name: data.orderDetails.senderable.name,
                phoneNumber: data.orderDetails.senderable.phone_number
            } : null,
            type: data.orderDetails.type ? {
                id: data.orderDetails.type.id,
                label: data.orderDetails.type.label,
                type: data.orderDetails.type.type,
                createdAt: data.orderDetails.type.created_at
            } : null,
        } : null,
        orderNumber: data.order_number,
        packageStatus: data.package_status,
        packageStatusCode: data.package_status_code,
        parentId: data.parent_id,
        paymentStatus: data.payment_status,
        paymentStatusCode: data.paymentStatusCode,
        price: data.price,
        rate: data.rate,
        remainingBalance: data.remaining_balance,
        scheduleData: data.schedule_date,
        scheduleFromTime: data.schedule_from_time,
        scheduleToTime: data.schedule_to_time,
        status: data.status,
        statusCode: data.status_code,
        tasks: tasks,
        wayBill: data.waybill,
        worker: data.worker
    }
}