/**
 * Create a new currency object
 * @param {object} data JSON response from server
 */
export function Currency(data) {

    return {
        code: data.code,
        exchangeRate: data.exchange_rate ? data.exchange_rate : 0,
        id: data.id
    }
}

/**
 * Create a new currency object that is received inside the customer
 * @param {object} data JSON response from server
 */
export function CustomerCurrency(data) {

    return {
        id: data.id,
        currency: data.currency ? {
            id: data.currency.id,
            title: data.currency.title,
            symbolLeft: data.currency.symbol_left,
            symbolRight: data.currency.symbol_right,
            code: data.currency.code,
            createdAt: data.currency.created_at,
            updatedAt: data.currency.updated_at,
            deletedAt: data.currency.deleted_at,
            exchangeRate: data.currency.exchange_rate,
        } : null,
        exchangeRate: data.exchange_rate ? data.exchange_rate : 0
    }
}
