/**
 * Create a new collection object for the task
 * @param {object} data JSON response from server
 */
export function Collection(data) {
    if (!data) {
        return null
    }

    return {
        id: data.id,
        amount: data.amount,
        taskID: data.task_id,
        typeID: data.type ? data.type.id : data.type_id ? data.type_id : null,
        currencyId: data.currency ? data.currency.id : data.currency_id ? data.currency_id : null,
        // deletedAt: data.deleted_at,
        // createdAt: data.created_at,
        // updatedAt: data.updated_at
    }
}