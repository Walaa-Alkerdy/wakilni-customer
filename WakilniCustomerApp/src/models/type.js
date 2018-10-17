
/**
 * Create new type object
 * @param {int} typeId Type Id
 * @param {string} type Type Code
 * @param {string} label Type Label
 */
export function Type(typeId, type, label) {
    return {
        typeId: typeId,
        type: type,
        label: label
    }
}