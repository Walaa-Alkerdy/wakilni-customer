/**
 * Routes related to user
 */
export const Me = {
    isTokenValid: 'auth',
    Login: 'mobile/login',
    // Login: 'login',
    logout: 'logout',
    userInfo: 'me',
    passwordToken: 'password/email',
    resetPassword: 'password/reset'
}

/**
 * Routes related to driver
 */
export const Driver = {
    trackLocation: 'routes',
    driverInfo: 'drivers/{0}', // {0} = Driver Id (int)
    create: 'drivers',
    show: 'drivers',
    onTheWay: 'drivers/{0}', // {0} = Driver Id (int)
    edit: 'drivers/{0}', // {0} = Driver Id (int)
    delete: 'drivers/{0}', // {0} = Driver Id (int)
    listDriversOfZone: 'zones/{0}/drivers', // {0} = Zone Id (int)
    tasks: 'drivers/{0}/tasks?search=overall_sequence:not null', // {0} = Driver Id (int)
    tasksCompleted: 'drivers/{0}/tasks?search=overall_sequence:null', // {0} = Driver Id (int)
    // tasksSubmission: 'drivers/{0}/tasks?search=submitted:{1}', // {0} = Driver Id, {1} = Submission Status
    tasksSubmission: 'drivers/{0}/tasks?search=overall_sequence:null;submitted:0&searchJoin=and',//for cash collection page
    packages: 'drivers/{0}/tasks?search=overall_sequence:not null;type_id:15;secured:0&searchJoin=and' // {0} = Driver Id
}

/**
 * Routes related to vehicles
 */
export const Vehicles = {
    vehicleTypes: 'vehicles'
}

/**
 * Routes related to staff
 */
export const Staff = {
    checkOut: 'check_out',
    checkIn: 'check_in',
    timeSheet: 'users/{0}/time_sheets' // {0} = user Id
}


/**
 * Routes related to location
 */
export const Location = {
    create: 'locations',
    list: 'zones',
    // listDrivers: 'zones/{0}/drivers', // {0} = Zone Id (int)
    listDrivers: 'drivers?search={0}', // {0} = location Id (int)
    // getLocations: 'locations?customer_id={0}', // {0} = customer Id (int)
    getLocations: 'locations/names?customer_id={0}' // {0} = customer Id (int)
}


/**
 * Routes related to customer
 */
export const Customers = {
    create: 'customers',
    createNewReceiver: 'customers/{0}/recipients', // {0} = Customer Id
    getCustomerRecipients: 'customers/{0}/recipients', // {0} = Customer Id
    update: 'customers/{0}', // {0} = Customer Id
    flag: 'customers/{0}', // {0} = Customer Id
    listAll: 'customers',
    listOne: 'customers/{0}', // {0} = Customer Id
    delete: 'customers/{0}' // {0} = Customer Id
}

/**
 * Routes related to recipients
 */
export const Recipient = {
    listAll: 'recipients',
    create: 'customers/{0}/recipients', // {0} = Customer Id    
    listOne: 'customers/{0}/recipients/{1}', // {0} = Customer Id, {1} = Recipient Id
    edit: 'customers/{0}/recipients/{1}' // {0} = Customer Id, {1} = Recipient Id
}

/**
 * Routes related to Messages
 */
export const Messages = {
    getMessages: 'messages',
    getAlerts: 'notifications',
    getMessageDetails: 'messages/{0}', // {0} = Message Id
    getContactRecipients: 'messages?search=type_id:62',
    getMyRequests: 'messages?search=type_id:26',
    getMyMessages: 'messages?search=type_id:45,53'
}

/**
 * Routes related to tasks
 */
export const Tasks = {
    start: 'orders/{0}/tasks/{1}', // {0} = Order Id, {1} = Task Id
    complete: 'orders/{0}/tasks/{1}', // {0} = Order Id, {1} = Task Id
    reopen: 'orders/{0}/tasks/{1}', // {0} = Order Id, {1} = Task Id
    failed: 'orders/{0}/tasks/{1}', // {0} = Order Id, {1} = Task Id
}

/**
 * Routes related to submissions
 */
export const Submissions = {
    submitCashAccount: 'drivers/{0}/submissions', // {0} = Driver Id (int)
}

/**
 * Routes related to upload file
 */
export const Upload = {
    uploadFile: 'upload/file'
}

/**
 * Get Currencies
 */
export const Currency = {
    getCurrencies: 'currencies'
}

/**
 * Get ConstantsList
 */
export const Constants = {
    getConstantsList: 'lists',
    getAreas: 'areas'
}

/**
 * Orders
 */
export const Orders = {
    createOrder: 'orders',
    fetchActiveOrders: 'orders?search=completed_on:null&searchJoin=and&page=1',
    fetchOrderHistory: 'orders?page=3&search=completed_on:not null&searchJoin=and',
    getOrders: 'orders?search=orderDetails.customer_id:{0}&with_pagination=true', // {0} user id
}