/**
 * Create a new vehicle object
 * @param {object} data Data returned from server
 */
export function Vehicle(data) {

    return {
        id: data.id,
        count: data.count ? data.count : null,
        remaining: data.remaining ? data.remaining : null,
        maintenance: data.maintenance ? data.maintenance : null,
        type: data.type ? {
            id: data.type.id,
            type: data.type.type,
            label: data.type.label,
            deletedAt: data.type.deleted_at,
            createdAt: data.type.created_at,
            updatedAt: data.type.updated_at
        } : null
    }
}