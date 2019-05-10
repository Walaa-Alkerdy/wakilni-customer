import flatCombineReducers from 'flat-combine-reducers';
// import uiReducer from './common/ui';
import loginReducer from './auth/loginReducer';
import commonReducer from './common/commonReducer';
import dbReducer from './localStorage/dbReducer';
import mainPageReducer from './mainPage/mainPageReducer';
import ordersReducer from './orders/ordersReducer';
import driverReducer from './driver/driverReducer';
import messagesReducer from './messages/messagesReducer';
import staffReducer from './staff/staffReducer';
import TasksPage1Reducer from './tasks/TasksPage1Reducer';
import TasksPage2Reducer from './tasks/TasksPage2Reducer';
import LocationReducer from './location/location';
import SubmissionPageReducer from './submissions/submissions';
import customerReducer from './customer/customerReducer';

/**
 * App Reducers are passed as params for flatCombineReducers function
 * e.g. flatCombineReducers(reducerA, reducerB)
 * Parameters of flatCombineReducers are ordered by priority from lowest 
 * to highest. The highest priority is given to the reducer that is most 
 * likely to be called a lot throughout the lifetime of the app
 */
var appReducer = flatCombineReducers(dbReducer,
    loginReducer,
    commonReducer,
    mainPageReducer,
    ordersReducer,
    customerReducer,
    driverReducer,
    staffReducer,
    TasksPage1Reducer,
    TasksPage2Reducer,
    messagesReducer,
    LocationReducer,
    SubmissionPageReducer
);

/**
 * Export appReducer for other classes to be able to import using: 
 * import appReducer from './reducers/index';
 */
export default appReducer;