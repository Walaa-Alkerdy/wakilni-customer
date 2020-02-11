
/**
 * Create a new constants List main object
 * @param {object} data JSON response from server
 */
export function ConstantsListMain(data) {
    
    let driversTypes = data.driverTypes.map((item) => {
        return ConstantsListSub(item);
    })
    let languageTypes = data.languageTypes.map((item) => {
        return ConstantsListSub(item);
    })
    let vehicleTypes = data.vehicleTypes.map((item) => {
        return ConstantsListSub(item);
    })
    let orderTypes = data.orderTypes.map((item) => {
        return ConstantsListSub(item);
    })
    let taskTypes = data.taskTypes.map((item) => {
        return ConstantsListSub(item);
    })
    // let additionalChargesTypes = data.additionalChargesTypes.map((item) => {
    //     return ConstantsListSub(item);
    // })
    let customerTypes = data.customerTypes.map((item) => {
        return ConstantsListSub(item);
    })
    let paymentMethodTypes = data.paymentMethodTypes.map((item) => {
        return ConstantsListSub(item);
    })
    let subscriptionTypes = data.subscriptionTypes.map((item) => {
        return ConstantsListSub(item);
    })
    let messageTypes = data.messageTypes.map((item) => {
        return ConstantsListSub(item);
    })
    let locationTypes = data.locationTypes.map((item) => {
        return ConstantsListSub(item);
    })
    let moneyTypes = data.moneyTypes.map((item) => {
        return ConstantsListSub(item);
    })
    let stockTypes = data.stockTypes.map((item) => {
        return ConstantsListSub(item);
    })
    let locationLogTypes = data.locationLogTypes.map((item) => {
        return ConstantsListSub(item);
    })
    let packageTypes = data.packageTypes.map((item) => {
        return ConstantsListSub(item);
    })
    let collectionTypes = data.collectionTypes.map((item) => {
        return ConstantsListSub(item);
    })
    let currencies = data.currencies.map((item) => {
        return ConstantsListSub(item);
    })
    return {
        driversTypes: driversTypes,
        languageTypes: languageTypes,
        vehicleTypes: vehicleTypes,
        orderTypes: orderTypes,
        taskTypes: taskTypes,
        additionalChargesTypes: [],// additionalChargesTypes,
        customerTypes: customerTypes,
        paymentMethodTypes: paymentMethodTypes,
        subscriptionTypes: subscriptionTypes,
        messageTypes: messageTypes,
        locationTypes: locationTypes,
        moneyTypes: moneyTypes,
        stockTypes: stockTypes,
        locationLogTypes: locationLogTypes,
        packageTypes: packageTypes,
        collectionTypes: collectionTypes,
        currencies: currencies,
         
    }
}

/**
 * Create a new constants List sub object
 * @param {object} data JSON response from server
 */
export function ConstantsListSub(data) {
    if (!data) {
        return null
    }

    return {
        id: data.id,
        type: data.type,
        label: data.label,
        deletedAt: data.deleted_at,
        createdAt: data.created_at,
        updatedAt: data.updated_at
    }
}