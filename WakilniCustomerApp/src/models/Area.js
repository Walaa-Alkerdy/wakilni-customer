/**
 * Create a new area object for the task
 * @param {object} data JSON response from server
 */
export function Area(data) {
    if (!data) {
        return null
    }

    return {
        id: data.id,
        name: data.name,
        zone: data.zone ? {
            area: data.zone.area,
            createdAt: data.zone.created_at,
            deletedAt: data.zone.deleted_at,
            description: data.zone.description,
            id: data.zone.id,
            label: data.zone.label,
            storeId: data.zone.store_id,
            updatedAt: data.zone.updated_at
        } : null
    }
}