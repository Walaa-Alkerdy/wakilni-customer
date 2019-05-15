import LocalizedStrings from 'react-native-localization';

let locals = new LocalizedStrings({
    en: {
        braces: '({0})',
        LOGIN: 'LOGIN',
        REGISTER: 'REGISTER',
        PASSWORD_LOGIN: 'PASSWORD LOGIN',
        ALTERNATIVE_LOGIN: 'ALTERNATIVE LOGIN',
        LOGIN_FB: 'LOGIN WITH FACEBOOK',
        EMAIL_PLACEHOLDER: 'Email',
        PASSWORD_PLACEHOLDER: 'Password',
        ALERT_TITLE: 'Title',
        ALERT_CANCEL: 'CANCEL',
        ALERT_OK: 'OK',
        ALERT_SKIP: 'SKIP',
        ALERT_YES: 'YES',
        HISTORY: 'History',
        REQUEST_AN_ORDER: 'REQUEST AN ORDER',
        TIME_SHEET: 'Timesheet',
        BACK_TO_OFFICE: 'BACK TO OFFICE',
        CASH_ACCOUNT: 'Cash\nAccount',
        REQUEST_A_LEAVE: 'Request\na Leave',
        PROFILE: 'Profile',
        PACKAGES: 'Packages',
        NO_RESULTS: 'No Results',
        NO_ENTRIES_FOUND: 'No Entries Found',
        CHECK_IN_MAINPAGE: 'Check\nIn',
        CHECK_IN_TITLE: 'Check In',
        CHECK_IN_TEXT: 'Check in to the office by clicking on this button. if you are not in the office area, the operator will get your request into consideration if you have some tasks to do.',
        CHECK_IN_BUTTON_TEXT: 'CHECK IN',
        CHECK_OUT_MAINPAGE: 'Check\nOut',
        CHECK_OUT_TITLE: 'Check Out',
        CHECK_OUT_TEXT: 'Check out from the office by clicking on this button. if you are not in the office area, the operator will get your request into consideration if you have some tasks to do.',
        CHECK_OUT_BUTTON_TEXT: 'CHECK OUT',
        CHECK_OUT_CASH_ACCOUNT_TEXT: 'Do you want to submit your account?',
        SEARCH: 'Search',
        SEARCH_PLACEHOLDER: 'Search here',
        ASK_HELP_FROM_DRIVER: 'ASK HELP FROM:',
        PLEASE_ENABLE_LOCATION: 'Please enable location',
        CHOOSE_DATE: 'Choose date',
        TODAY: 'Today',
        DATE: 'Date',
        YESTERDAY: 'Yesterday',
        NOTIFICATION_REQUESTS_PENDING: 'PENDING',
        NOTIFICATION_REQUESTS_ACCEPTED: 'ACCEPTED',
        NOTIFICATION_REQUESTS_REJECTED: 'DISCARDED',
        ENGLISH: 'English',
        ARABIC: 'Arabic',
        GENDER_MALE: 'Male',
        GENDER_FEMALE: 'Female',

        //registration page
        REGISTRATION_PAGE_PIN_LOCATION: 'PIN LOCATION',
        REGISTRATION_PAGE_TYPE: 'Type',
        REGISTRATION_PAGE_SHOP_NAME: 'Shop Name',
        REGISTRATION_PAGE_SHOP_PHONE_NUMBER: 'Shop Phone Number',
        REGISTRATION_PAGE_FIRST_NAME: 'First Name',
        REGISTRATION_PAGE_LAST_NAME: 'Last Name',
        REGISTRATION_PAGE_PHONE_NUMBER: 'Phone Number',
        REGISTRATION_PAGE_GENDER: 'Gender',
        REGISTRATION_PAGE_DATE_OF_BIRTH: 'Date of Birth',
        REGISTRATION_PAGE_EMAIL: 'Email',
        REGISTRATION_PAGE_PASSWORD: 'Password',
        REGISTRATION_PAGE_CONFIRM_PASSWORD: 'Confirm Password',
        REGISTRATION_PAGE_GOLDEN_RULE: 'Golden Rule',
        REGISTRATION_PAGE_PAYMENT_METHOD: 'Delivery Payment Method',
        REGISTRATION_PAGE_MOF: 'MOF',
        REGISTRATION_PAGE_VAT: 'VAT',
        REGISTRATION_PAGE_ACCOUNTING_REFERENCE_NUMBER: 'Accounting Reference Number',
        REGISTRATION_PAGE_LOCATION_TYPE: 'Location Type',
        REGISTRATION_PAGE_AREA: 'Area',
        REGISTRATION_PAGE_BUILDING: 'Building',
        REGISTRATION_PAGE_FLOOR: 'Floor',
        REGISTRATION_PAGE_DIRECTIONS: 'Directions',
        REGISTRATION_PAGE_FINALIZE_BUTTON: 'FINALIZE',
        REGISTRATION_PAGE_BACK_BUTTON: 'BACK',
        REGISTRATION_PAGE_NEXT_BUTTON: 'NEXT',

        //task details page
        ORDER_INFO_TITLE: 'ORDER INFO',
        ORDER_INFO_CUSTOMER: 'Customer:',
        ORDER_INFO_GOLDEN_RULE: 'Golden rule:',
        ORDER_INFO_TYPE: 'Type:',
        DELIVER_INFO_TITLE: 'DELIVER',
        RECEIVE_INFO_TITLE: 'RECEIVE',
        // DELIVER_INFO_PACKAGE: 'RECEIVE',
        // DELIVER_INFO_AMOUNT: 'Amount:',
        RECEIVER_INFO_TITLE: 'RECEIVER INFO',
        RECEIVER_INFO_NAME: 'Receiver name:',
        RECEIVER_INFO_PHONE: 'Recipient phone:',
        RECEIVER_INFO_NOTES: 'Notes:',
        LOCATION_INFO_TITLE: 'LOCATION DETAILS',
        LOCATION_INFO_MAP: 'Map:',
        LOCATION_INFO_MORE_DETAILS: 'More Details:',
        LOCATION_INFO_MORE_DETAILS_DIRECTIONS: 'DID NOT GET THE DIRECTIONS?',
        COLLECTION_INFO_TITLE: 'COLLECTION DETAILS',
        COLLECTION_INFO_AMOUNT: 'Amount',
        COLLECTION_INFO_TYPE: 'Type',
        COLLECTION_INFO_NOTE: 'Note',
        COLLECTION_INFO_DATE: 'Date:',
        COLLECTION_INFO_CURRENCY: 'Currency',
        TASK_DETAILS_HELP: 'HELP',
        TASK_DETAILS_WHATS_APP_TEXT: 'Message on whatsapp',
        TASK_DETAILS_CONTACT_RECIPIENT: 'CONTACT RECIPIENT',
        TASK_DETAILS_START: 'START',
        TASK_DETAILS_FAIL: 'FAIL',
        TASK_DETAILS_COMPLETE: 'COMPLETE',
        TASK_DETAILS_REOPEN: 'REOPEN',

        //History Page
        HISTORY_PAGE_DATE_FROM: 'From',
        HISTORY_PAGE_DATE_TO: 'To',
        HISTORY_PAGE_STATUS_ALL: 'All',
        HISTORY_PAGE_STATUS_ALL_DONE: 'Done',
        HISTORY_PAGE_STATUS_ALL_FAILED: 'Failed',

        TASKS_VIEW_RECEIVER: 'Receiver',
        TASKS_VIEW_CLIENT: 'Client',
        TASKS_VIEW_INFO: 'Info',

        //Change Password Page
        CHANGE_PASSWORD_PAGE_BUTTON: 'SUBMIT',
        CHANGE_PASSWORD_PAGE_PASSWORD: 'New Password',
        CHANGE_PASSWORD_PAGE_CONFIRM_PASSWORD: 'Confirm Password',
        CHANGE_PASSWORD_PAGE_SUB_TITLE: 'Please enter your new password',

        //Request a leave page
        REQUEST_A_LEAVE_ALL_DAY: 'All day',
        REQUEST_A_LEAVE_FROM: 'From',
        REQUEST_A_LEAVE_TO: 'to',
        REQUEST_A_LEAVE_AT: 'at',
        REQUEST_A_LEAVE_MESSAGE: 'Message',
        REQUEST_A_LEAVE_TIME: 'time',
        REQUEST_A_LEAVE_REASON: 'BECAUSE',
        REQUEST_A_LEAVE_SHOW_MY_REQUEST: 'SHOW MY REQUESTS',
        REQUEST_A_LEAVE_SEND_REQUEST: 'SEND REQUEST',

        //Orders-Tasks Page
        ORDERS_VIEW: 'Orders View',
        TASKS_VIEW: 'Tasks View',
        ACTIVE_VIEW: 'Active Tasks',
        FAILED_VIEW: 'Failed Tasks',
        SUB_TAB_ALL: 'All',
        SUB_TAB_STARTED: 'Started',
        SUB_TAB_FAILED: 'Failed',
        SUB_TAB_PENDING: 'Pending',
        SUB_TAB_SENT: 'Sent',
        SUB_TAB_RECEIVED: 'Received',

        //Main Page
        MAIN_PAGE_REQUEST_AN_ORDER_POP_UP_MESSAGE: 'Are you sure you want to request an order?',
        MAIN_PAGE_BACK_TO_OFFICE_POP_UP_MESSAGE: 'Are you heading to the office?',

        // page titles
        MAIN_PAGE: 'Wakilni',
        NOTIFICATION: 'Notifications',
        CREATE_NEW_ORDER: 'Create New Order',
        NOTIFICATION_DETAILS: 'Notification Details',
        NOTIFICATION_DETAILS_REPLY_PAGE: 'Notification Reply',
        ORDERS: 'Orders',
        CREATE_ORDER: 'Create Order',
        RECIPIENTS: 'Recipients',
        TASK_DETAILS: 'Task Details',
        REQUEST_HELP_PAGE: 'Help',
        CONTACT_RECIPIENT_PAGE: 'Contact Recipient',
        HISTORY_PAGE: 'History',
        ORDERS_PAGE: 'Orders',
        MAP_PAGE: 'Map',
        FAIL_TASK_PAGE: 'Failed Task',
        TIME_SHEET_PAGE: 'Timesheet',
        COMPLETE_TASK_PAGE: 'Complete Task',
        REQUEST_LEAVE_LIST_PAGE: 'My Requests',
        PACKAGES_PAGE_TITLE: 'Packages',
        CASH_ACCOUNT_PAGE_TITLE: 'Accounts with me',

        //Profile page
        PROFILE_PAGE_TITLE: 'My Profile',
        PROFILE_PAGE_INFO_TITLE: 'Info',
        PROFILE_PAGE_PASSWORD_TITLE: 'Password',
        PROFILE_PAGE_FIRST_NAME: 'First Name',
        PROFILE_PAGE_LAST_NAME: 'Last Name',
        PROFILE_PAGE_PHONE: 'Phone',
        PROFILE_PAGE_EMAIL: 'Email',
        PROFILE_PAGE_DOB: 'Date of Birth',
        PROFILE_PAGE_SAVE: 'SAVE',
        PROFILE_PAGE_LOG_OUT: 'LOG OUT',
        PROFILE_PAGE_OLD_PASSWORD: 'Old Password',
        PROFILE_PAGE_NEW_PASSWORD: 'New Password',
        PROFILE_PAGE_CONFIRMATION_PASSWORD: 'Confirm Password',
        PROFILE_PAGE_ALTERNATIVE_PASSWORD: 'Alternative Password',
        PROFILE_PAGE_PLEASE_CONFIRM_PATTERN: 'Please Confirm your pattern',

        //Packages Page
        PACKAGES_PAGE_FILTER_ALL: 'All',
        PACKAGES_PAGE_FILTER_ME: 'Me',
        PACKAGES_PAGE_FILTER_ANOTHER_DRIVER: 'Another Driver',
        PACKAGES_PAGE_FILTER_CLIENT: 'Client',
        PACKAGES_PAGE_FILTER_OFFICE: 'Office',
        PACKAGES_PAGE_WITH_ME: 'WITH ME',

        //time sheet page
        TIME_SHEET_TILL: 'till',
        TIME_SHEET_PENDING: 'pending',

        //failed task page
        FAIL_TASK_PAGE_REASON: 'FAILED BECAUSE:',
        FAIL_TASK_PAGE_PLACEHOLDER: 'enter reason...',
        FAIL_TASK_PAGE_SUBMIT: 'SUBMIT',
        FAIL_TASK_PAGE_IS_DAMAGE: 'is damaged',

        //complete task page
        COMPLETE_TASK_PAGE_SUB_TITLE: 'I HAVE RECIEVED:',
        COMPLETE_TASK_PAGE_TOTAL_AMOUNT: 'Amount:',
        COMPLETE_TASK_PAGE_TYPE: 'Collection Type:',
        COMPLETE_TASK_PAGE_COLLECTION_TYPE: 'Collection Amount:',
        COMPLETE_TASK_PAGE_CASH: 'Cash',
        COMPLETE_TASK_PAGE_CHECK: 'Check',
        COMPLETE_TASK_PAGE_CARD: 'Card',
        COMPLETE_TASK_PAGE_COMPLETE_AMOUNT: 'Complete Amount',
        COMPLETE_TASK_PAGE_NOT_COMPLETE_AMOUNT: 'Not Complete',
        COMPLETE_TASK_PAGE_COMPLETE_WITH_EXTRA: 'Other',
        COMPLETE_TASK_PAGE_EXTRA: 'Extra',
        COMPLETE_TASK_PAGE_COMPLETE_WITH_EXTRA_DOLLAR: 'USD',
        COMPLETE_TASK_PAGE_COMPLETE_WITH_EXTRA_LL: 'LBP',
        COMPLETE_TASK_PAGE_COMPLETE_WITH_EXTRA_NOTE: 'note',
        COMPLETE_TASK_PAGE_FAIL_REASON: 'Failed Because:',
        COMPLETE_TASK_PAGE_SIGN_HERE: 'I CONFIRM THE ABOVE MENTIONED AND AMOUNT:',
        COMPLETE_TASK_PAGE_SIGN_HERE_RESET: 'RESET',
        COMPLETE_TASK_PAGE_SIGN_HERE_SAVE: 'CONFIRM',
        COMPLETE_TASK_PAGE_DONE: 'DONE',

        //Cash Account Page
        CASH_ACCOUNT_PAGE_FROM: 'from',
        CASH_ACCOUNT_PAGE_ORDER_NUMBER: 'Order №:',
        CASH_ACCOUNT_PAGE_TYPE: 'Type:',
        CASH_ACCOUNT_PAGE_CLIENT: 'Client:',
        CASH_ACCOUNT_PAGE_SEQUENCE: 'Sequence:',
        CASH_ACCOUNT_PAGE_TOTAL_CASH: 'TOTAL CASH:',
        CASH_ACCOUNT_PAGE_TOTAL_CHECK: 'TOTAL CHECK:',
        CASH_ACCOUNT_PAGE_QUESTION: 'What is in your pocket?',
        CASH_ACCOUNT_PAGE_CASH: 'CASH',
        CASH_ACCOUNT_PAGE_CHECK: 'CHECK',
        CASH_ACCOUNT_PAGE_USD_AMOUNT: 'USD Amount',
        CASH_ACCOUNT_PAGE_LBP_AMOUNT: 'LBP Amount',
        CASH_ACCOUNT_PAGE_NOTES: 'Notes',
        CASH_ACCOUNT_PAGE_SUBMIT: 'SUBMIT',

        //Notifications Page Sections
        NOTIFICATION_PAGE_SECTIONS_FROM: 'From:',
        NOTIFICATION_PAGE_SECTIONS_TO: 'To:',
        NOTIFICATION_PAGE_SECTIONS_LOCATION: 'Location:',
        NOTIFICATION_PAGE_SECTIONS_MESSAGE: 'Message:',
        NOTIFICATION_PAGE_SECTIONS_PERSON: 'Person:',

        //Driver Page Sections
        DRIVER_PAGE_SECTIONS_ASK_BUTTON: 'ASK',

        //Contact Recipient Page
        CONTACT_RECIPIENT_PAGE_MAIN_TEXT: 'WHATSAPP A MESSAGE FROM THE BELOW:',

        //Notification page
        NOTIFICATION_PAGE_ALERTS_TAB_TITLE: 'Alerts',
        NOTIFICATION_PAGE_REQUESTS_TAB_TITLE: 'Requests',

        //Notification details page
        NOTIFICATION_DETAILS_PAGE_HEADER_TITLE: 'MESSAGE',
        NOTIFICATION_DETAILS_PAGE_HEADER1: 'YOU were trying to contact ',
        NOTIFICATION_DETAILS_PAGE_HEADER2: ' is contacting you about:',
        NOTIFICATION_DETAILS_PAGE_HEADER3: ' was contacting you about:',
        NOTIFICATION_DETAILS_PAGE_HEADER1_SUB: 'about: ',
        NOTIFICATION_DETAILS_PAGE_CANNOT_HELP_BUTTON: 'DISCARD',
        NOTIFICATION_DETAILS_PAGE_SUBMIT_BUTTON: 'REPLY',
        NOTIFICATION_DETAILS_PAGE_WAS_NOT_USEFUL_BUTTON: 'NOT USEFUL',
        NOTIFICATION_DETAILS_PAGE_WAS_USEFUL_BUTTON: 'USEFUL',

        //Notification details reply page
        NOTIFICATION_DETAILS_REPLY_PAGE_HEADER_TITLE: 'REPLY',
        NOTIFICATION_DETAILS_REPLY_PAGE_TEXT: 'Text:',
        NOTIFICATION_DETAILS_REPLY_PAGE_TEXT_PLACEHOLDER: 'enter text...',
        NOTIFICATION_DETAILS_REPLY_PAGE_PHOTO: 'Photo:',
        NOTIFICATION_DETAILS_REPLY_PAGE_PHOTO_ADD_PHOTO: 'ADD PHOTO',
        NOTIFICATION_DETAILS_REPLY_PAGE_PHOTO_CHANGE_PHOTO: 'CHANGE PHOTO',
        NOTIFICATION_DETAILS_REPLY_PAGE_VOICE: 'Voice:',
        NOTIFICATION_DETAILS_REPLY_PAGE_VOICE_START_RECORDING: 'Start recording',
        NOTIFICATION_DETAILS_REPLY_PAGE_VOICE_RECORDING: 'Recording...',
        NOTIFICATION_DETAILS_REPLY_PAGE_SUBMIT_BUTTON: 'Send',

        //Create Order
        CREATE_ORDER_STEP1: 'STEP I',
        CREATE_ORDER_STEP2: 'STEP II',
        CREATE_ORDER_STEP3: 'STEP III',
        CREATE_ORDER_STEP4: 'STEP IV',
        CREATE_ORDER_STEP1_SUBTITLE: 'ORDER INFO',
        CREATE_ORDER_PAYMENT_TYPE: 'Order Type',
        CREATE_ORDER_PAYMENT_TYPE_1: 'One Way',
        CREATE_ORDER_PAYMENT_TYPE_2: 'Bulk',
        CREATE_ORDER_PAYMENT_TYPE_3: 'Return',
        CREATE_ORDER_DELIVERY_PAYMENT_TYPE: 'Delivery Payment Type',
        CREATE_ORDER_DELIVERY_PAYMENT_TYPE_1: 'On\nAccount',
        CREATE_ORDER_DELIVERY_PAYMENT_TYPE_2: 'Cash On\nDelivery',
        CREATE_ORDER_DELIVERY_PAYMENT_TYPE_3: 'Cash On\nPickup',
        CREATE_ORDER_DELIVERY_PAYMENT_TYPE_4: 'Credit\nCard',
        CREATE_ORDER_PICKUP_LOCATION: 'Pickup Location',
        CREATE_ORDER_CHOOSE_LOCATION: 'Choose Location',
        CREATE_ORDER_PREFERRED_DATE: 'Preferred Date',
        CREATE_ORDER_PREFERRED_TIME: 'Preferred Time',
        CREATE_ORDER_FROM_TIME: 'From Time',
        CREATE_ORDER_TO_TIME: 'To Time',
        CREATE_ORDER_PIN_LOCATION_DISABLED: 'No Pinned Location',
        CREATE_ORDER_PIN_LOCATION_ENABLED: 'Clear Current Pin',
        CREATE_ORDER_CHOOSE_LOCATION_TYPE: 'Choose Type',

        //step 2
        CREATE_ORDER_STEP2_SUBTITLE: 'RECEIVER INFO',
        CREATE_ORDER_RECEIVER_LOCATION: 'Receiver Location',
        CREATE_ORDER_DESCRIPTION: 'Description',
        CREATE_ORDER_CHOOSE_DESCRIPTION: 'Choose Description',
        CREATE_ORDER_CURRENCY: 'Currency',
        CREATE_ORDER_WAY_BILL: 'WayBill',
        CREATE_ORDER_COLLECTION_AMOUNT: 'Collection Amount',
        CREATE_ORDER_COLLECTION_TYPE: 'Collection Type',
        CREATE_ORDER_COLLECTION_TYPE1: 'Collect On\nDelivery',
        CREATE_ORDER_COLLECTION_TYPE2: 'Collect On\nPickup',
        CREATE_ORDER_COLLECTION_TYPE3: 'Paid',
        CREATE_ORDER_QUANTITY: 'Quantity',
        CREATE_ORDER_PACKAGE_TYPE: 'Package Type',
        CREATE_ORDER_ADD_NEW_DELIVER_PACKAGE: '+ ADD NEW DELIVER PACKAGE',
        CREATE_ORDER_ADD_NEW_RETURN_PACKAGE: '+ ADD NEW RETURN PACKAGE',
        CREATE_ORDER_ADD_NEW_RECEIVER: '+ ADD NEW RECEIVER',

        // step 3
        CREATE_ORDER_STEP3_SUBTITLE: 'EXTRA SETTINGS',
        CREATE_ORDER_SIGNATURE_REQUIRED: 'Signature Required',
        CREATE_ORDER_PICTURE_REQUIRED: 'Picture Required',

        // step 4
        CREATE_ORDER_STEP4_SUBTITLE: 'REVIEW ORDER',
        CREATE_ORDER_ORDER_INFO: 'ORDER INFO:',
        CREATE_ORDER_RECEIVER_INFO: 'RECEIVER INFO:',

        // create order common
        CREATE_ORDER_DIFFERENT_PACKAGES_TEXT: 'Do you want to add different package types',
        CREATE_ORDER_DIFFERENT_PACKAGES_LABEL: '',
        CREATE_ORDER_CHOOSE_AREA: 'Choose Area',
        CREATE_ORDER_BUILDING: 'Building',
        CREATE_ORDER_FLOOR: 'Floor',
        CREATE_ORDER_DIRECTIONS: 'Directions',
        CREATE_ORDER_CANCEL_BUTTON: 'CANCEL',
        CREATE_ORDER_CREATE_BUTTON: 'CREATE',
        CREATE_ORDER_BACK_BUTTON: 'BACK',
        CREATE_ORDER_NEXT_BUTTON: 'NEXT',
        CREATE_ORDER_SAVE_BUTTON: 'SAVE',

        CREATE_RECEIVER_FIRST_NAME: 'First Name',
        CREATE_RECEIVER_LAST_NAME: 'Last Name',
        CREATE_RECEIVER_PHONE_NUMBER: 'Phone Number (+961--)',
        CREATE_RECEIVER_SECONDARY_PHONE_NUMBER: 'Secondary Phone Number (+961--)',
        CREATE_RECEIVER_EMAIL: 'Email',
        CREATE_RECEIVER_GENDER: 'Gender',
        CREATE_RECEIVER_DOB: 'Date Of Birth',
        CREATE_RECEIVER_NOTE: 'Note',
        CREATE_RECEIVER_ALLOW_DRIVER_CONTACT: 'Allow Driver Contact',
        CREATE_RECEIVER_ALLOW_DRIVER_CONTACT2: 'Allow driver to contact receiver',
        CREATE_RECEIVER_ALLOW_SENDING_DIRECT_MESSAGE: 'Send direct message to receiver',

        // recipients page
        RECIPIENT_NAME: 'Name',
        RECIPIENT_PHONENUMBER: 'PhoneNumber',
        RECIPIENT_ADDRESS: 'Address',
        RECIPIENT_ALLOW_DRIVER_CONTACT: 'Allow Driver Contact',
        RECIPIENT_NOTE: 'Note',

        message_sent_successfully: 'Message sent successfully',
        message_signature_captured_successfully: 'Your signature has been captured',

        //Errors Section
        error_all_options_are_empty: 'atleast one of the options must be chosen',
        error_email_empty: 'is required',
        error_usd_empty: 'is required',
        error_LL_empty: 'is required',
        error_note_empty: 'is required',
        error_signature_empty: 'is required',
        error_fail_reason_empty: 'is required',
        error_notification_message_empty: 'is required',
        error_notification_image_empty: 'is required',
        error_notification_voice_empty: 'is required',
        error_email_not_valid: 'is not valid',
        error_old_password_empty: 'is required',
        error_new_password_empty: 'is required',
        error_password_empty: 'is required',
        error_password_dont_match: 'don\'t match',
        error_pattern_dont_match: 'patterns don\'t match',
        error_first_name_empty: 'is required',
        error_last_name_empty: 'is required',
        error_phone_empty: 'is required',
        error_phone_not_valid: 'is not valid',
        error_dob_empty: 'is required',
        error_password_not_valid: 'at least 6 characters',
        error_role_can_not_login: 'sorry this account type cannot access the app at the moment',
        error_whatsapp_not_found: 'WhatsApp is not found on the current device',

        // Status
        TASK_STATUS_SECURED: 'SECURED',
        TASK_STATUS_PENDING: 'PENDING',
        TASK_STATUS_ASSIGNED: 'ASSIGNED',
        TASK_STATUS_ON_THE_WAY: 'ON THE WAY',
        TASK_STATUS_COMPLETE: 'COMPLETED',
        TASK_STATUS_FAILED: 'FAILED',
        TASK_STATUS_CANCELED: 'CANCELED',
        TASK_STATUS_RE_SCHEDULED: 'RESCHEDULED',
        TASK_TYPE_PICKUP: 'Pickup',
        TASK_TYPE_DELIVER: 'Deliver',
        TASK_TYPE_RETURN: 'Return',
        ORDER_STATUS_PENDING: 'Pending',
        ORDER_STATUS_SECURED: 'Secured',
        ORDER_STATUS_CONFIRMED: 'Confirmed',
        ORDER_STATUS_DECLINED: 'Declined',
        ORDER_STATUS_CANCELED: 'Canceled',
        ORDER_STATUS_PROCESSING: 'Processing',
        ORDER_STATUS_SUCCESS: 'Success',
        ORDER_STATUS_FAILED: 'Failed',
        ORDER_STATUS_CLOSED_FAILED: 'Closed',
        PACKAGE_STATUS_WITH_CUSTOMER: 'With Customer',
        PACKAGE_STATUS_WITH_DRIVER: 'With Driver',
        PACKAGE_STATUS_IN_THE_OFFICE: 'In the office',
        PACKAGE_STATUS_WITH_RECIPIENT: 'With Recipient',
        PACKAGE_STATUS_DAMAGED: 'Damaged',

        STATUS_UNKNOWN: 'Unknown',

        all_day: 'All Day',
        from: 'From',
        to: 'till',
        because: 'because',
        on: 'on',

        //common
        PLACEHOLDER_ENTER_NOTE: 'enter note...',
        PLACEHOLDER_ENTER_AMOUNT: 'enter amount...',
        PLACEHOLDER_ENTER_REASON: 'enter reason...',
    },
    ar: {
        braces: '({0})',
        LOGIN: 'تسجيل الدخول',
        REGISTER: 'تسجيل',
        PASSWORD_LOGIN: 'تسجيل كلمة المرور',
        ALTERNATIVE_LOGIN: 'تسجيل كلمة المرور البديلة',
        LOGIN_FB: 'LOGIN WITH FACEBOOK',
        EMAIL_PLACEHOLDER: 'البريد الإلكتروني',
        PASSWORD_PLACEHOLDER: 'كلمه السر',
        ALERT_TITLE: 'عنوان',
        ALERT_CANCEL: 'كلا',
        ALERT_YES: 'اجل',
        ALERT_SKIP: 'تخطى',
        ALERT_OK: 'حسنا',
        HISTORY: 'تاريخ الطلب',
        REQUEST_AN_ORDER: 'تسجيل طلب',
        TIME_SHEET: 'الجدول الزمني',
        BACK_TO_OFFICE: 'العودة إلى المكتب',
        CASH_ACCOUNT: 'حساب نقدي',
        REQUEST_A_LEAVE: 'طلب إجازة',
        PROFILE: 'الملف الشخصي',
        PACKAGES: 'الطرد',
        NO_RESULTS: 'لا يوجد نتائج للعرض',
        NO_ENTRIES_FOUND: 'لا توجد مقالات',
        CHECK_IN_MAINPAGE: 'تسجيل\nالدخول',
        CHECK_IN_TITLE: 'الدخول',
        CHECK_IN_TEXT: 'تسجيل الدخول إلى المكتب عبر الضغط على رمز الدخول. في حال عدم التواجد في منطقة المكتب، سوف تأخذ الادارة طلبك بعين الإعتبار إذا كان لديك بعض المهام لتقوم بها.',
        CHECK_IN_BUTTON_TEXT: 'الدخول',
        CHECK_OUT_MAINPAGE: 'تسجيل\nخروج',
        CHECK_OUT_TITLE: 'تسجيل الخروج',
        CHECK_OUT_TEXT: 'تسجيل الخروج من المكتب عبر الضغط على رمز الخروج. في حال عدم التواجد في منطقة المكتب، سوف تأخذ الادارة طلبك بعين الإعتبار إذا كان لديك بعض المهام لتقوم بها.',
        CHECK_OUT_BUTTON_TEXT: 'تسجيل خروج',
        CHECK_OUT_CASH_ACCOUNT_TEXT: 'هل تريد بعت حساباتك؟',
        SEARCH: 'بحث',
        SEARCH_PLACEHOLDER: 'ابحث هنا',
        ASK_HELP_FROM_DRIVER: 'أطلب المساعدة من',
        PLEASE_ENABLE_LOCATION: 'الرجاء تحديد الموقع',
        CHOOSE_DATE: 'حديد التاريخ',
        TODAY: 'اليوم',
        DATE: 'تاريخ',
        YESTERDAY: 'أمس',
        NOTIFICATION_REQUESTS_PENDING: 'قيد الإنجاز',
        NOTIFICATION_REQUESTS_ACCEPTED: 'قبول الطلب',
        NOTIFICATION_REQUESTS_REJECTED: 'رفض الطلب',
        ENGLISH: 'الإنجليزية',
        ARABIC: 'العربية',

        //registration page
        REGISTRATION_PAGE_PIN_LOCATION: 'PIN LOCATION',
        REGISTRATION_PAGE_TYPE: 'Type',
        REGISTRATION_PAGE_SHOP_NAME: 'Shop Name',
        REGISTRATION_PAGE_SHOP_PHONE_NUMBER: 'Shop Phone Number',
        REGISTRATION_PAGE_FIRST_NAME: 'First Name',
        REGISTRATION_PAGE_LAST_NAME: 'Last Name',
        REGISTRATION_PAGE_PHONE_NUMBER: 'Phone Number',
        REGISTRATION_PAGE_GENDER: 'Gender',
        REGISTRATION_PAGE_DATE_OF_BIRTH: 'Date of Birth',
        REGISTRATION_PAGE_EMAIL: 'Email',
        REGISTRATION_PAGE_PASSWORD: 'Password',
        REGISTRATION_PAGE_CONFIRM_PASSWORD: 'Confirm Password',
        REGISTRATION_PAGE_GOLDEN_RULE: 'Golden Rule',
        REGISTRATION_PAGE_PAYMENT_METHOD: 'DeliveryPayment Method',
        REGISTRATION_PAGE_MOF: 'MOF',
        REGISTRATION_PAGE_VAT: 'VAT',
        REGISTRATION_PAGE_LOCATION_TYPE: 'Locatyion Type',
        REGISTRATION_PAGE_AREA: 'Area',
        REGISTRATION_PAGE_BUILDING: 'Building',
        REGISTRATION_PAGE_FLOOR: 'Floor',
        REGISTRATION_PAGE_DIRECTIONS: 'Directions',
        REGISTRATION_PAGE_REGISTER_BUTTON: 'REGISTER',

        //task details page
        ORDER_INFO_TITLE: 'تفصيل الطلب',
        ORDER_INFO_CUSTOMER: 'الزبون',
        ORDER_INFO_GOLDEN_RULE: 'القاعدة الذهبية',
        ORDER_INFO_TYPE: 'نوع الطلب',
        DELIVER_INFO_TITLE: 'التوصيل',
        RECEIVE_INFO_TITLE: 'الإستلام',
        // DELIVER_INFO_PACKAGE: 'المستلم',
        // DELIVER_INFO_AMOUNT: 'Amount:',
        RECEIVER_INFO_TITLE: 'معلومات عن المستلم',
        RECEIVER_INFO_NAME: 'اسم المستلم',
        RECEIVER_INFO_PHONE: 'رقم هاتف المستلم',
        RECEIVER_INFO_NOTES: 'ملاحظات',
        LOCATION_INFO_TITLE: 'العنوان',
        LOCATION_INFO_MAP: 'الخريطة',
        LOCATION_INFO_MORE_DETAILS: 'تفاصيل أخرى',
        LOCATION_INFO_MORE_DETAILS_DIRECTIONS: 'هل تواجه صعوبة في الوصول إلى العنوان؟',
        COLLECTION_INFO_TITLE: 'تفاصيل المجموعة',
        COLLECTION_INFO_AMOUNT: 'كمية',
        COLLECTION_INFO_TYPE: 'النوع',
        COLLECTION_INFO_NOTE: 'ملاحظة',
        COLLECTION_INFO_DATE: 'تاريخ',
        COLLECTION_INFO_CURRENCY: 'العملة',
        TASK_DETAILS_HELP: 'طلب المساعدة',
        TASK_DETAILS_WHATS_APP_TEXT: 'رسالة على ال WhatsApp',
        TASK_DETAILS_CONTACT_RECIPIENT: 'الإتصال بالمستلم',
        TASK_DETAILS_START: 'بدء الرحلة',
        TASK_DETAILS_FAIL: 'فشل المهمة',
        TASK_DETAILS_COMPLETE: 'إتمام المهمة',
        TASK_DETAILS_REOPEN: 'إعادة فتح',

        //History Page
        HISTORY_PAGE_DATE_FROM: 'من',
        HISTORY_PAGE_DATE_TO: 'لغاية',
        HISTORY_PAGE_STATUS_ALL: 'عرض كل الطلبات',
        HISTORY_PAGE_STATUS_ALL_DONE: 'الطلبات المنجزة',
        HISTORY_PAGE_STATUS_ALL_FAILED: 'الطلبات التي تعذر إنجازها',

        //Change Password Page
        CHANGE_PASSWORD_PAGE_BUTTON: 'إرسال',
        CHANGE_PASSWORD_PAGE_PASSWORD: 'كلمة المرور',
        CHANGE_PASSWORD_PAGE_CONFIRM_PASSWORD: 'تأكيد كلمة المرور',
        CHANGE_PASSWORD_PAGE_SUB_TITLE: 'يرجى إدخال كلمة المرور الجديدة',

        TASKS_VIEW_RECEIVER: 'المستلم',
        TASKS_VIEW_CLIENT: 'الزبون',
        TASKS_VIEW_INFO: 'المعلومات',

        //Request a leave page
        REQUEST_A_LEAVE_ALL_DAY: 'يوم كامل',
        REQUEST_A_LEAVE_FROM: 'من',
        REQUEST_A_LEAVE_TO: 'لغاية',
        REQUEST_A_LEAVE_AT: 'في',
        REQUEST_A_LEAVE_MESSAGE: 'رسالة',
        REQUEST_A_LEAVE_TIME: 'التوقيت',
        REQUEST_A_LEAVE_REASON: 'السبب',
        REQUEST_A_LEAVE_SHOW_MY_REQUEST: 'إظهار الطلب',
        REQUEST_A_LEAVE_SEND_REQUEST: 'إرسال الطلب',

        //Orders-Tasks Page
        ORDERS_VIEW: 'عرض الطلب',
        TASKS_VIEW: 'عرض المهام',
        ACTIVE_VIEW: 'المهام الفعالة',
        FAILED_VIEW: 'المهام الفشلة',
        SUB_TAB_ALL: 'عرض كل شيء',
        SUB_TAB_STARTED: 'بدء الرحلة',
        SUB_TAB_FAILED: 'فشل المهمة',
        SUB_TAB_PENDING: 'قيد الإنجاز',
        SUB_TAB_SENT: 'تم الإرسال',
        SUB_TAB_RECEIVED: 'تم الإستلام',

        //Main Page
        MAIN_PAGE_REQUEST_AN_ORDER_POP_UP_MESSAGE: 'هل انت متاكد أنك تريد طلب مهمة؟',
        MAIN_PAGE_BACK_TO_OFFICE_POP_UP_MESSAGE: 'هل أنت في طريقك إلى المكتب؟',

        // page titles
        MAIN_PAGE: 'Wakilni',
        NOTIFICATION: 'إشعارات',
        NOTIFICATION_DETAILS: 'تفاصيل الإشعار',
        NOTIFICATION_DETAILS_REPLY_PAGE: 'الرد على الإشعار',
        ORDERS: 'طلبات',
        CREATE_ORDER: 'Create Order',
        RECIPIENTS: 'Recipients',
        TASK_DETAILS: 'تفصيل الطلب',
        REQUEST_HELP_PAGE: 'طلب المساعدة',
        CONTACT_RECIPIENT_PAGE: 'معلومات عن المستلم',
        HISTORY_PAGE: 'تاريخ الطلب',
        MAP_PAGE: 'الخريطة',
        FAIL_TASK_PAGE: 'طلب غير منجز',
        TIME_SHEET_PAGE: 'الجدول الزمني',
        COMPLETE_TASK_PAGE: 'طلب منجز',
        REQUEST_LEAVE_LIST_PAGE: 'طلباتي',
        PACKAGES_PAGE_TITLE: 'الطرود',
        CASH_ACCOUNT_PAGE_TITLE: 'حساباتي',

        //Profile page
        PROFILE_PAGE_TITLE: 'ملفي الشخصي',
        PROFILE_PAGE_INFO_TITLE: 'المعلومات',
        PROFILE_PAGE_PASSWORD_TITLE: 'كلمة المرور',
        PROFILE_PAGE_FIRST_NAME: 'الإسم',
        PROFILE_PAGE_LAST_NAME: 'الكنية',
        PROFILE_PAGE_PHONE: 'رقم التلفون',
        PROFILE_PAGE_EMAIL: 'البريد الإلكتروني',
        PROFILE_PAGE_DOB: 'تاريخ الولادة',
        PROFILE_PAGE_SAVE: 'تحفيظ',
        PROFILE_PAGE_LOG_OUT: 'تسجيل الخروج',
        PROFILE_PAGE_OLD_PASSWORD: 'كلمة المرور القديمة',
        PROFILE_PAGE_NEW_PASSWORD: 'كلمة المرور الجديدة',
        PROFILE_PAGE_CONFIRMATION_PASSWORD: 'تثبيت كلمة المرور',
        PROFILE_PAGE_ALTERNATIVE_PASSWORD: 'تسجيل كلمة المرور البديلة',
        PROFILE_PAGE_PLEASE_CONFIRM_PATTERN: 'اكد كلمة المرور البديلة',

        //Packages Page
        PACKAGES_PAGE_FILTER_ALL: 'الكل',
        PACKAGES_PAGE_FILTER_ME: 'أنا',
        PACKAGES_PAGE_FILTER_ANOTHER_DRIVER: 'سائق آخر',
        PACKAGES_PAGE_FILTER_CLIENT: 'زبون',
        PACKAGES_PAGE_FILTER_OFFICE: 'مكتب',
        PACKAGES_PAGE_WITH_ME: 'معي',

        //time sheet page
        TIME_SHEET_TILL: 'لغاية',
        TIME_SHEET_PENDING: 'قيد الإنجاز',

        //failed task page
        FAIL_TASK_PAGE_REASON: 'سبب عدم الإنجاز',
        FAIL_TASK_PAGE_PLACEHOLDER: 'إدخال النص',
        FAIL_TASK_PAGE_SUBMIT: 'تقديم الطلب',
        FAIL_TASK_PAGE_IS_DAMAGE: 'متلف',

        //complete task page
        COMPLETE_TASK_PAGE_SUB_TITLE: 'لقد استلمت',
        COMPLETE_TASK_PAGE_TOTAL_AMOUNT: 'المبلغ',
        COMPLETE_TASK_PAGE_TYPE: 'نوع التجميع',
        COMPLETE_TASK_PAGE_COLLECTION_TYPE: 'نوع التحصيل',
        COMPLETE_TASK_PAGE_CASH: 'مبلغ نقدي',
        COMPLETE_TASK_PAGE_CHECK: 'شيك مصرفي',
        COMPLETE_TASK_PAGE_CARD: 'بطاقة مصرفية',
        COMPLETE_TASK_PAGE_COMPLETE_AMOUNT: 'حساب مسدد',
        COMPLETE_TASK_PAGE_NOT_COMPLETE_AMOUNT: 'حساب غير مسدد',
        COMPLETE_TASK_PAGE_COMPLETE_WITH_EXTRA: 'أخرى',
        COMPLETE_TASK_PAGE_EXTRA: 'إضافي',
        COMPLETE_TASK_PAGE_COMPLETE_WITH_EXTRA_DOLLAR: '$',
        COMPLETE_TASK_PAGE_COMPLETE_WITH_EXTRA_LL: 'LL',
        COMPLETE_TASK_PAGE_COMPLETE_WITH_EXTRA_NOTE: 'ملاحظة',
        COMPLETE_TASK_PAGE_FAIL_REASON: 'سبب عدم الإنجاز',
        COMPLETE_TASK_PAGE_SIGN_HERE: 'تأكيد المبلغ المذكور أعلاه',
        COMPLETE_TASK_PAGE_SIGN_HERE_RESET: 'إعادة',
        COMPLETE_TASK_PAGE_SIGN_HERE_SAVE: 'تأكيد',
        COMPLETE_TASK_PAGE_DONE: 'إتمام',

        //Cash Account Page
        CASH_ACCOUNT_PAGE_FROM: 'من',
        CASH_ACCOUNT_PAGE_ORDER_NUMBER: 'رقم الطلب',
        CASH_ACCOUNT_PAGE_TYPE: 'نوع الطلب',
        CASH_ACCOUNT_PAGE_CLIENT: 'الزبون',
        CASH_ACCOUNT_PAGE_SEQUENCE: 'تسلسل',
        CASH_ACCOUNT_PAGE_TOTAL_CASH: 'قيمة المبلغ النقدي',
        CASH_ACCOUNT_PAGE_TOTAL_CHECK: 'قيمة الشيك المصفي',
        CASH_ACCOUNT_PAGE_QUESTION: 'قيمة المبلغ المتواجد لديك؟',
        CASH_ACCOUNT_PAGE_CASH: 'المبلغ النقدي',
        CASH_ACCOUNT_PAGE_CHECK: 'الشيك المصرفي',
        CASH_ACCOUNT_PAGE_USD_AMOUNT: '$',
        CASH_ACCOUNT_PAGE_LBP_AMOUNT: 'LL',
        CASH_ACCOUNT_PAGE_NOTES: 'ملاحظات',
        CASH_ACCOUNT_PAGE_SUBMIT: 'تقديم الطلب',

        //Notifications Page Sections
        NOTIFICATION_PAGE_SECTIONS_FROM: 'من',
        NOTIFICATION_PAGE_SECTIONS_TO: 'إلى',
        NOTIFICATION_PAGE_SECTIONS_LOCATION: 'العنوان',
        NOTIFICATION_PAGE_SECTIONS_MESSAGE: 'الرسالة',
        NOTIFICATION_PAGE_SECTIONS_PERSON: 'الشخص',

        //Driver Page Sections
        DRIVER_PAGE_SECTIONS_ASK_BUTTON: 'استفسر',

        //Contact Recipient Page
        CONTACT_RECIPIENT_PAGE_MAIN_TEXT: 'استخدم واتس اب لإرسال رسالة',

        //Notification page
        NOTIFICATION_PAGE_ALERTS_TAB_TITLE: 'تنبيهات',
        NOTIFICATION_PAGE_REQUESTS_TAB_TITLE: 'طلبات',

        //Notification details page
        NOTIFICATION_DETAILS_PAGE_HEADER_TITLE: 'الرسالة',
        NOTIFICATION_DETAILS_PAGE_HEADER1: 'انت كنت تحاول الإتصال ب',
        NOTIFICATION_DETAILS_PAGE_HEADER2: ' يتصل بك لسبب',
        NOTIFICATION_DETAILS_PAGE_HEADER3: 'كان على اتصال بك لسبب',
        NOTIFICATION_DETAILS_PAGE_HEADER1_SUB: ' عن',
        NOTIFICATION_DETAILS_PAGE_CANNOT_HELP_BUTTON: 'تجاهل الرسالة ',
        NOTIFICATION_DETAILS_PAGE_SUBMIT_BUTTON: 'الرد على الرسالة ',
        NOTIFICATION_DETAILS_PAGE_WAS_NOT_USEFUL_BUTTON: 'غير مفيد',
        NOTIFICATION_DETAILS_PAGE_WAS_USEFUL_BUTTON: 'مفيد',

        //Notification details reply page
        NOTIFICATION_DETAILS_REPLY_PAGE_HEADER_TITLE: 'الرد',
        NOTIFICATION_DETAILS_REPLY_PAGE_TEXT: 'النص',
        NOTIFICATION_DETAILS_REPLY_PAGE_TEXT_PLACEHOLDER: 'إدخال النص',
        NOTIFICATION_DETAILS_REPLY_PAGE_PHOTO: 'الصورة الفوتوغرافية',
        NOTIFICATION_DETAILS_REPLY_PAGE_PHOTO_ADD_PHOTO: 'إضافة الصورة الفوتوغرافية',
        NOTIFICATION_DETAILS_REPLY_PAGE_PHOTO_CHANGE_PHOTO: 'تغيير الصورة الفوتوغرافية',
        NOTIFICATION_DETAILS_REPLY_PAGE_VOICE: 'التسجيل الصوتي',
        NOTIFICATION_DETAILS_REPLY_PAGE_VOICE_START_RECORDING: 'بدء التسجيل الصوتي',
        NOTIFICATION_DETAILS_REPLY_PAGE_VOICE_RECORDING: 'قيد التسجيل',
        NOTIFICATION_DETAILS_REPLY_PAGE_SUBMIT_BUTTON: 'إرسال',

        message_sent_successfully: 'تم إرسال الرسالة بنجاح',
        message_signature_captured_successfully: 'تم التقاط توقيعك',

        //Errors Section
        error_all_options_are_empty: 'يرجى إختيار على الأقل واحد من الخيارات التالية',
        error_email_empty: 'مطلوب',
        error_usd_empty: 'مطلوب',
        error_LL_empty: 'مطلوب',
        error_note_empty: 'مطلوب',
        error_signature_empty: 'مطلوب',
        error_fail_reason_empty: 'مطلوب',
        error_notification_message_empty: 'مطلوب',
        error_notification_image_empty: 'مطلوب',
        error_notification_voice_empty: 'مطلوب',
        error_email_not_valid: 'غير صالح',
        error_old_password_empty: 'مطلوب',
        error_new_password_empty: 'مطلوب',
        error_password_empty: 'مطلوب',
        error_password_dont_match: 'غير مطابق',
        error_pattern_dont_match: 'غير مطابق',
        error_first_name_empty: 'مطلوب',
        error_last_name_empty: 'مطلوب',
        error_phone_empty: 'مطلوب',
        error_phone_not_valid: 'مطلوب',
        error_dob_empty: 'مطلوب',
        error_password_not_valid: 'كلمة المرور من ستة رموز على الأقل',
        error_role_can_not_login: 'عذرًا ، لا يمكن لهذا النوع من الحساب الوصول إلى التطبيق في الوقت الحالي',
        error_whatsapp_not_found: 'ام يتم العثور على الواتس اب على الجهاز',

        // Status
        TASK_STATUS_SECURED: 'مؤمن',
        TASK_STATUS_PENDING: 'قيد الإنجاز',
        TASK_STATUS_ASSIGNED: 'تم تعيينه',
        TASK_STATUS_ON_THE_WAY: 'قيد التسليم - على الطريق',
        TASK_STATUS_COMPLETE: 'أنجز',
        TASK_STATUS_FAILED: 'لم ينجز',
        TASK_STATUS_CANCELED: 'إلغاء',
        TASK_STATUS_RE_SCHEDULED: 'إعادة تعيين',
        TASK_TYPE_PICKUP: 'إحضار الطلب',
        TASK_TYPE_DELIVER: 'توصيل',
        TASK_TYPE_RETURN: 'مرتجع',
        ORDER_STATUS_PENDING: 'قيد الإنجاز',
        ORDER_STATUS_SECURED: 'مؤمن',
        ORDER_STATUS_CONFIRMED: 'تأكييد الطلب',
        ORDER_STATUS_DECLINED: 'رفض الطلب',
        ORDER_STATUS_CANCELED: 'إلغاء',
        ORDER_STATUS_PROCESSING: 'الطلب قيد الإنجاز',
        ORDER_STATUS_SUCCESS: 'إتمام المهمة',
        ORDER_STATUS_FAILED: 'فشل المهمة',
        ORDER_STATUS_CLOSED_FAILED: 'تسكير الطلب',
        PACKAGE_STATUS_WITH_CUSTOMER: 'مع الزبون',
        PACKAGE_STATUS_WITH_DRIVER: 'مع السائق',
        PACKAGE_STATUS_IN_THE_OFFICE: 'في المكتب',
        PACKAGE_STATUS_WITH_RECIPIENT: 'مع المستلم',
        PACKAGE_STATUS_DAMAGED: 'متلف',

        STATUS_UNKNOWN: 'مجهول السبب - السبب غير معروف',

        all_day: 'يوم كامل',
        from: 'من',
        to: 'لغاية',
        because: 'السبب',
        on: 'في',

        //common
        PLACEHOLDER_ENTER_NOTE: 'أدخل ملاحظة',
        PLACEHOLDER_ENTER_AMOUNT: 'أدخل المبلغ',
        PLACEHOLDER_ENTER_REASON: 'أدخل السبب',
    }
});


export default locals;