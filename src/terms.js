import { camelToSnakeCase } from "./utils/camelToSnakeCase";

// local terms until remote config available
const active_lexicon = {
    language: {
        en: 'Language',
        he: 'שפה',
        ar: 'يا الهي',
    },
    no_value: {
        en: 'No Value',
        he: 'אין ערך',
        ar: 'لا قيمة',
    },
    no: {
        en: 'No',
        he: 'לא',
        ar: 'رقم',
    },
    yes: {
        en: 'Yes',
        he: 'כן',
        ar: 'نعم',
    },
    total: {
        en: 'Total',
        he: 'סה"כ',
        ar: 'المجموع',
    },
    main_tag: {
        en: 'The blue bordered tag is the main tag',
        he: 'התג עם המסגרת הכחולה הוא התג הראשי',
        ar: 'العلامة ذات الحدود الزرقاء هي العلامة الرئيسية ، اختر بحكمة :)',
    },
    dashboard: {
        en: 'Dashboard',
        he: 'לוח הבקרה',
        ar: 'لوحة التحكم',
    },
    met_go: {
        en: 'MetGo',
        he: 'MetGo',
        ar: 'MetGo',
    },
    please_enter_a_price: {
        en: 'Please enter a price',
        he: 'אנא הכנס מחיר',
        ar: 'الرجاء إدخال السعر',
    },
    new_messages: {
        en: 'New Messages',
        he: 'הודעות חדשות',
        ar: 'مشاركات جديدة',
    },
    next: {
        en: 'Next',
        he: 'הבא',
        ar: 'التالي',
    },
    back: {
        en: 'Back',
        he: 'אחורה',
        ar: 'الى الخلف',
    },
    send_new_message: {
        en: 'Send New Message',
        he: 'שלח הודעה חדשה',
        ar: 'أرسل رسالة جديدة',
    },
    messages: {
        en: 'Messages',
        he: 'הודעות',
        ar: 'رسائل',
    },
    tasks: {
        en: 'Tasks',
        he: 'משימות',
        ar: 'مهام',
    },
    profile: {
        en: 'Profile',
        he: 'פרופיל',
        ar: 'الملف الشخصي',
    },
    log_in: {
        en: 'Log in',
        he: 'התחבר',
        ar: 'تسجيل دخول',
    },
    sign_out: {
        en: 'Sign Out',
        he: 'התנתק',
        ar: 'تسجيل خروج',
    },
    sign_up: {
        en: 'Sign up',
        he: 'הרשם',
        ar: 'اشتراك',
    },
    copy: {
        en: 'Copy',
        he: 'העתק',
        ar: 'ينسخ',
    },
    is_anonymous: {
        en: 'Anonymous',
        he: 'אנונימי',
        ar: 'مجهول',
    },
    duplicate: {
        en: 'Duplicate',
        he: 'שכפל',
        ar: 'ينسخ',
    },
    delete: {
        en: 'Delete',
        he: 'מחק',
        ar: 'حذف',
    },
    print: {
        en: 'Print',
        he: 'הדפס',
        ar: 'مطبعة',
    },
    daily_line_chart: {
        en: 'Daily Line Chart',
        he: 'תרשים יומי',
        ar: 'الرسم البياني الخطي اليومي',
    },
    tablet: {
        en: 'Tablet',
        he: 'טאבלט',
        ar: 'لوح',
    },
    mobile: {
        en: 'Mobile',
        he: 'מובייל',
        ar: 'التليفون المحمول',
    },
    desktop: {
        en: 'Desktop',
        he: 'שולחן עבודה',
        ar: 'سطح المكتب',
    },
    daily: {
        en: 'Daily',
        he: 'יומי',
        ar: 'اليومي',
    },
    weekly: {
        en: 'Weekly',
        he: 'שבועי',
        ar: 'أسبوعي',
    },
    monthly: {
        en: 'Monthly',
        he: 'חודשי',
        ar: 'شهريا',
    },
    rate: {
        en: 'Rate',
        he: 'דירוג',
        ar: 'معدل',
    },
    registrations: {
        en: 'Registrations',
        he: 'הרשמות',
        ar: 'التسجيلات',
    },
    bounce_rate: {
        en: 'Bounce Rate',
        he: 'שיעור נטישה',
        ar: 'معدل التخلي',
    },
    views: {
        en: 'Views',
        he: 'צפיות',
        ar: 'الآراء',
    },
    visits_today: {
        en: 'Visits Today',
        he: 'ביקורים היום',
        ar: 'زيارات اليوم',
    },
    today: {
        en: 'Today',
        he: 'היום',
        ar: 'اليوم',
    },
    roles: {
        en: 'Roles',
        he: 'תפקידים',
        ar: 'الأدوار',
    },
    back_home: {
        en: 'Back To Home',
        he: 'חזרה לדף הבית',
        ar: 'العودة إلى الصفحة الرئيسية',
    },
    welcome: {
        en: 'Welcome',
        he: 'ברוכים הבאים',
        ar: 'اهلا وسهلا',
    },
    create_your_account: {
        en: 'Create your account',
        he: 'צור חשבון',
        ar: 'أنشئ حسابك',
    },
    app_performance: {
        en: 'App Performance',
        he: 'ביצועי אפליקציה',
        ar: 'أداء التطبيق',
    },
    revenue_breakdown: {
        en: 'Revenue Breakdown',
        he: 'פירוט הכנסות',
        ar: 'انهيار إيرادات',
    },
    something_went_wrong: {
        en: 'Something went wrong',
        he: 'משהו השתבש',
        ar: 'اسم المستخدم او الرقم السري غير صحيح',
    },
    plase_make_sure_that_your_details_are_correct: {
        en: 'Please make sure that your details are correct',
        he: 'אנא ודא שפרטיך נכונים',
        ar: 'يرجى التأكد من صحة التفاصيل',
    },
    incorrect_verification_code: {
        en: 'Incorrect verification code',
        he: 'קוד אימות שגוי',
        ar: 'رمز التحقق غير صحيح',
    },
    please_choose_an_authority: {
        en: 'Please choose an authority',
        he: 'אנא בחר רשות',
        ar: 'الرجاء اختيار سلطة',
    },
    name_cannot_exceed: {
        en: 'Name cannot exceed',
        he: 'שם לא יכול להכיל יותר מ',
        ar: 'لا يمكن أن يتجاوز الاسم',
    },
    email_address: {
        en: 'Email address',
        he: 'כתובת אימייל',
        ar: 'عنوان البريد الإلكتروني',
    },
    please_enter_a_business_name: {
        en: 'Please enter a business name',
        he: 'הכנס שם עסק',
        ar: 'الرجاء إدخال اسم العمل',
    },
    password: {
        en: 'Password',
        he: 'סיסמא',
        ar: 'كلمه السر',
    },
    forgot_password: {
        en: 'Forgot Password',
        he: 'שכחתי סיסמא',
        ar: 'هل نسيت كلمة السر',
    },
    back_to_home: {
        en: 'Home Page',
        he: 'בחזרה לדף הבית',
        ar: 'العودة إلى الصفحة الرئيسية',
    },
    calendar: {
        en: 'Calendar',
        he: 'יומן',
        ar: 'يوميات',
    },
    businesses: {
        en: 'Businesses',
        he: 'בתי עסק',
        ar: 'الأعمال',
    },
    events: {
        en: 'Events',
        he: 'אירועים',
        ar: 'الأحداث',
    },
    event: {
        en: 'Event',
        he: 'אירוע',
        ar: 'حدث',
    },
    points: {
        en: 'Points',
        he: 'נקודות',
        ar: 'نقاط',
    },
    locations: {
        en: 'Locations',
        he: 'מסלולים',
        ar: 'طرق',
    },
    routes: {
        en: 'Routes',
        he: 'מסלולים',
        ar: 'طرق',
    },
    voucher: {
        en: 'GiveTav',
        he: 'GiveTav',
        ar: 'GiveTav',
    },
    users: {
        en: 'Users',
        he: 'משתמשים',
        ar: 'المستخدمون',
    },
    map: {
        en: 'Map',
        he: 'מפה',
        ar: 'خريطة',
    },
    help: {
        en: 'Help',
        he: 'עזרים',
        ar: 'يساعد',
    },
    support: {
        en: 'Support',
        he: 'תמיכה',
        ar: 'دعم',
    },
    faq: {
        en: 'FAQ',
        he: 'שאלות נפוצות',
        ar: 'التعليمات',
    },
    server_overview: {
        en: 'Server Overview',
        he: 'סקירת שרת',
        ar: 'نظرة عامة على الخادم',
    },
    last_then_year: {
        en: 'Than last year',
        he: 'פחות משנה',
        ar: 'من العام الماض',
    },
    lodging: {
        en: 'lodging',
        he: 'לינה',
        ar: 'الإقامة',
    },
    attraction: {
        en: 'Attraction',
        he: 'אטרקציה',
        ar: 'جاذبية',
    },
    culture: {
        en: 'Culture',
        he: 'תרבות',
        ar: 'حضاره',
    },
    local: {
        en: 'Local',
        he: 'מקומי',
        ar: 'تيار',
    },
    travel: {
        en: 'Travel',
        he: 'לטייל',
        ar: 'أن يسافر',
    },
    food: {
        en: 'Food',
        he: 'אוכל',
        ar: 'اكل',
    },
    _lodging: {
        en: 'lodging',
        he: 'לינה',
        ar: 'الإقامة',
    },
    _attraction: {
        en: 'Attraction',
        he: 'אטרקציה',
        ar: 'جاذبية',
    },
    _culture: {
        en: 'Culture',
        he: 'תרבות',
        ar: 'حضاره',
    },
    _local: {
        en: 'Local',
        he: 'מקומי',
        ar: 'تيار',
    },
    _travel: {
        en: 'Travel',
        he: 'לטייל',
        ar: 'أن يسافر',
    },
    _food: {
        en: 'Food',
        he: 'אוכל',
        ar: 'اكل',
    },
    download: {
        en: 'Download',
        he: 'הורדה',
        ar: 'تحميل',
    },
    status: {
        en: 'status',
        he: 'סטטוס',
        ar: 'تحميل',
    },
    product_components: {
        en: 'Product components',
        he: 'מרכיבי המוצר',
        ar: 'مكونات المنتج',
    },
    product_materials: {
        en: 'The materials from which the product is made, a brief description',
        he: 'החומרים מהם עשוי המוצר, תיאור קצר',
        ar: 'المواد التي صنع منها المنتج ، وصفا موجزا',
    },
    style: {
        en: 'Style - milky/meaty/neutral',
        he: 'סגנון - חלבי/בשרי/פרווה',
        ar: 'النمط - حليبي / لحمي / فروي',
    },
    size_and_dimension: {
        en: 'Sizes',
        he: 'מידות וגדלים',
        ar: 'الأحجام',
    },
    product_includes: {
        en: 'Product includes',
        he: 'מה כולל המוצר',
        ar: 'يشمل المنتج',
    },
    more_you_specify_more_sales_you_get: {
        en: 'The more you detail, the more sales you will make of the product',
        he: 'ככל שתפרטו יותר, תגדילו את המכירות של המוצר',
        ar: 'كلما زادت التفاصيل ، زادت مبيعاتك من المنتج',
    },
    add_specific_details_to_product: {
        en: 'Add specific details about your product',
        he: 'הוספת מאפיינים ספציפיים למוצר',
        ar: 'أضف تفاصيل محددة حول منتجك',
    },
    action_buttons: {
        en: 'Action Buttons',
        he: 'כפתורי פעולה',
        ar: 'أزرار العمل',
    },
    location_info: {
        en: 'Location Info',
        he: 'מידע על המיקום',
        ar: 'معلومات الموقع',
    },
    reservation_center_phone: {
        en: 'Reservation Center Phone',
        he: 'מספר הטלפון של מרכז ההזמנות',
        ar: 'رقم الهاتف لمركز الحجز',
    },
    created_at: {
        en: 'Created At',
        he: 'נוצר בתאריך',
        ar: 'تم إنشاؤه في',
    },
    updated_at: {
        en: 'Updated At',
        he: 'עודכן בתאריך',
        ar: 'تم تحديثه في',
    },
    authority_email: {
        en: 'Authority Email',
        he: 'דוא"ל מנהל',
        ar: 'البريد الإلكتروني للمسؤول',
    },
    authority_name: {
        en: 'Authority Name',
        he: 'שם רשות',
        ar: 'اسم المسؤول',
    },
    name: {
        en: 'Name',
        he: 'שם',
        ar: 'اسم',
    },
    last_name: {
        en: 'Last name',
        he: 'שם משפחה',
        ar: 'الكنية',
    },
    impact: {
        en: 'impact',
        he: 'אימפקט',
        ar: 'تأثير',
    },
    category: {
        en: 'category',
        he: 'קטגוריה',
        ar: 'الفئة',
    },
    tag: {
        en: 'tag',
        he: 'תגית',
        ar: 'بطاقة شعار',
    },
    authority: {
        en: 'authority',
        he: 'רשות',
        ar: 'السلطة',
    },
    address: {
        en: 'address',
        he: 'כתובת',
        ar: 'تبوك',
    },
    private: {
        en: 'private',
        he: 'פרטי',
        ar: 'نشر',
    },
    public: {
        en: 'public',
        he: 'ציבורי',
        ar: 'عام',
    },
    approve_content: {
        en: 'I approve email texts and whatsapp messages from MetroNegev',
        he: 'אני מאשר/ת קבלת דיוור, סמס והודעות וואטסאפ מחברת מטרונגב',
        ar: 'أوافق على تلقي الرسائل البريدية والرسائل النصية القصيرة ورسائل WhatsApp من Matrongb',
    },
    pending_approval: {
        en: 'pending approval',
        he: 'ממתין לאישור',
        ar: 'ما زال يحتاج بتصدير',
    },
    export: {
        en: 'export to .xslx',
        he: 'יצוא לקובץ .xslx',
        ar: 'تصدير إلى .xslx',
    },
    confirm: {
        en: 'Confirm',
        he: 'אישור',
        ar: 'تأكيد',
    },
    cancel: {
        en: 'Cancel',
        he: 'ביטול',
        ar: 'الغاء',
    },
    import: {
        en: 'import from .xslx',
        he: 'יבוא מקובץ .xslx',
        ar: 'استيراد من .xslx',
    },
    search: {
        en: "Search",
        he: "חיפוש",
        ar: "بحث",
    },
    closed: {
        en: "Closed",
        he: "סגור",
        ar: "مغلق",
    },
    time: {
        en: "Time",
        he: "זמן",
        ar: "زمن",
    },
    closing_time: {
        en: "Closing Time",
        he: "שעת סגירה",
        ar: "وقت مفتوح",
    },
    opening_time: {
        en: "Opening Time",
        he: "שעת פתיחה",
        ar: "وقت الإغلاق"
    },
    add: {
        en: "Add",
        he: "הוספה",
        ar: "يضيف",
    },
    please_add_a_short_description: {
        en: "Please add a short description",
        he: "אנא הוסף תיאור קצר",
        ar: "الرجاء إضافة وصف موجز",
    },
    do_you_want_to_save_your_changes: {
        en: "Do you want to save you changes",
        he: "האם ברצונך לשמור את השינויים",
        ar: "هل تريد حفظ التغييرات",
    },
    please_choose_up_to: {
        en: "Please choose up to",
        he: "אנא בחר עד",
        ar: "الرجاء اختيار ما يصل",
    },
    edit: {
        en: "Save Changes",
        he: "שמירת שינויים",
        ar: "حفظ التغييرات",
    },
    last_changes: {
        en: "Last Changes",
        he: "שינויים אחרונים",
        ar: "أخر التغييرات",
    },
    businesse_name: {
        en: "businesse Name",
        he: "שם העסק",
        ar: "الاسم التجاري",
    },
    for_whom: {
        en: "For whom",
        he: "למי מתאים",
        ar: "لمن",
    },
    tags: {
        en: "Tags",
        he: "תגיות",
        ar: "العلامات",
    },
    description: {
        en: "Description",
        he: "תיאור",
        ar: "وصف",
    },
    please_fill_description: {
        en: "Please fill the description field",
        he: "אנא מלא את השדה 'תיאור'",
        ar: "يرجى ملء حقل الوصف",
    },
    shipping: {
        en: "Shipping",
        he: "משלוח",
        ar: "شحن",
    },
    in_stock: {
        en: "In stock",
        he: "קיים במלאי",
        ar: "في الأوراق المالية",
    },
    shipment_type: {
        en: "Shipment type",
        he: "שיטת משלוח",
        ar: "نوع الشحن",
    },
    dropoff: {
        en: "Pick up point",
        he: "נקודת איסוף",
        ar: "نقطة الالتقاط",
    },
    payed_shipping: {
        en: "Pay for delivery",
        he: "משלוח בתשלום",
        ar: "الدفع للتسليم",
    },
    pickup: {
        en: "Pick up from business",
        he: "איסוף מבית העסק",
        ar: "تلتقط من الأعمال",
    },
    free_shipping: {
        en: "Delivery to customer door",
        he: "משלוח לבית הלקוח",
        ar: "التوصيل إلى باب العميل",
    },
    different_product_options: {
        en: "Different product options",
        he: "יש במלאי מבחר עיצובים / צבעים שונים",
        ar: "هناك مجموعة مختارة من التصاميم / الألوان المختلفة في المخزون",
    },
    usage_restrictions: {
        en: "limitations",
        he: "מגבלות למימוש",
        ar: "قيود على ممارسة الرياضة",
    },
    useage_restrictions: {
        en: "limitations",
        he: "מגבלות למימוש",
        ar: "قيود على ممارسة الرياضة",
    },
    days_and_hours: {
        en: "Days and hours",
        he: "ימים ושעות",
        ar: "أيام وساعات",
    },
    opening_hours: {
        en: "Opening hours",
        he: "שעות פתיחה",
        ar: "ساعات العمل",
    },
    contact: {
        en: "Contact",
        he: "איש קשר",
        ar: "اتصل",
    },
    contact_number: {
        en: "Contact number",
        he: "טלפון איש קשר",
        ar: "هاتف الاتصال",
    },
    business_number: {
        en: "Business number",
        he: "טלפון עסק",
        ar: "هاتف العمل",
    },
    site_link: {
        en: "Site link",
        he: "לינק לאתר",
        ar: "ارتباط بالموقع",
    },
    details: {
        en: "Details",
        he: "פרטים",
        ar: "تفاصيل",
    },
    statistics: {
        en: "Statistics",
        he: "סטטיסטיקות",
        ar: "إحصائيات",
    },
    products: {
        en: "Products",
        he: "מוצרים",
        ar: "المنتجات",
    },
    reviews: {
        en: "Reviews",
        he: "ביקורות",
        ar: "التقييمات",
    },

    invitation_manager: {
        en: "Invitation Manager",
        he: "ניהול הזמנות",
        ar: "مدير الدعوات",
    },
    gallery: {
        en: "Gallery",
        he: "גלריה",
        ar: "رواق",
    },
    promotion: {
        en: "Promotion",
        he: "קידום",
        ar: "ترويج",
    },
    calls: {
        en: "Calls",
        he: "שיחות",
        ar: "محادثات",
    },
    monday_closing: {
        en: 'Monday Closing',
        he: 'שני סגירה',
        ar: 'الاثنين إغلاق',
    },
    monday_opening: {
        en: 'Monday Opening',
        he: 'שני פתיחה',
        ar: 'الاثنين افتتاح',
    },
    tuesday_closing: {
        en: 'Tuesday Closing',
        he: 'שלישי סגירה',
        ar: 'يوم الثلاثاء إغلاق',
    },
    tuesday_opening: {
        en: 'Tuesday Opening',
        he: 'שלישי פתיחה',
        ar: 'يوم الثلاثاء افتتاح',
    },
    wednesday_closing: {
        en: 'Wednesday Closing',
        he: 'רביעי סגירה',
        ar: 'الأربعاء إغلاق',
    },
    wednesday_opening: {
        en: 'Wednesday Opening',
        he: 'רביעי פתיחה',
        ar: 'الأربعاء افتتاح',
    },
    thursday_closing: {
        en: 'Thursday Closing',
        he: 'חמישי סגירה',
        ar: 'يوم الخميس إغلاق',
    },
    thursday_opening: {
        en: 'Thursday Opening',
        he: 'חמישי פתיחה',
        ar: 'يوم الخميس افتتاح',
    },
    friday_closing: {
        en: 'Friday Closing',
        he: 'שישי סגירה',
        ar: 'جمعة إغلاق',
    },
    friday_opening: {
        en: 'Friday Opening',
        he: 'שישי פתיחה',
        ar: 'جمعة افتتاح',
    },
    saturday_closing: {
        en: 'Saturday Closing',
        he: 'שבת סגירה',
        ar: 'السبت إغلاق',
    },
    saturday_opening: {
        en: 'Saturday Opening',
        he: 'שבת פתיחה',
        ar: 'السبت افتتاح',
    },
    sunday_closing: {
        en: 'Sunday Closing',
        he: 'ראשון סגירה',
        ar: 'الأحد إغلاق',
    },
    sunday_opening: {
        en: 'Sunday Opening',
        he: 'ראשון פתיחה',
        ar: 'الأحد افتتاح',
    },
    download_statistics: {
        en: 'Download Statistics',
        he: 'הורדת סטטיסטיקה',
        ar: 'تنزيل الإحصائيات',
    },
    add_product: {
        en: 'Add Product',
        he: 'הוסף מוצר',
        ar: 'إضافة منتج',
    },
    upload_media: {
        en: 'Upload Media',
        he: 'העלאת מדיה',
        ar: 'تحميل الوسائط',
    },
    upload_video: {
        en: 'Upload Video',
        he: 'העלאת סרטון',
        ar: 'رفع فيديو',
    },
    upload_logo: {
        en: 'Upload Logo',
        he: 'העלאת לוגו',
        ar: 'تحميل الشعار',
    },
    upload_photo: {
        en: 'Upload Photo',
        he: 'העלאת תמונה',
        ar: 'حمل الصورة',
    },
    upload_files: {
        en: 'Upload Files',
        he: 'העלאת קבצים',
        ar: 'رفع ملف',
    },
    integration: {
        en: 'Integration',
        he: 'אינטגריציה',
        ar: 'دمج',
    },
    sdk: {
        en: 'SDK',
        he: 'SDK',
        ar: 'SDK',
    },
    '2_days_and_above': {
        en: 'Two days and above',
        he: 'יומיים ומעלה',
        ar: 'يومين وما فوق',
    },
    suitable_for: {
        en: 'suitable for',
        he: 'מתאים ל',
        ar: 'مناسب ل',
    },
    last_week: {
        en: 'last week',
        he: 'שבוע שעבר',
        ar: 'الاسبوع الماضي',
    },
    last_month: {
        en: 'last month',
        he: 'חודש שעבר',
        ar: 'الشهر الماضي',
    },
    facebook_link: {
        en: 'Facebook Link',
        he: 'לינק לפייסבוק',
        ar: 'رابط الفيسبوك',
    },
    instagram_link: {
        en: 'Instagram Link',
        he: 'לינק לאינסטגרם',
        ar: 'رابط الانستغرام',
    },
    youtube_link: {
        en: 'YouTube Link',
        he: 'לינק ליוטיוב',
        ar: 'رابط يوتيوب',
    },
    twitter_link: {
        en: 'Twitter Link',
        he: 'לינק לטוויטר',
        ar: 'رابط تويتر',
    },
    linkedIn_link: {
        en: 'LinkedIn Link',
        he: 'לינק ללינקדאין',
        ar: 'رابط ينكدين',
    },
    open_24_hours: {
        en: 'Open 24 Hours',
        he: 'פתוח 24 שעות',
        ar: 'مفتوحة 24 ساعة',
    },
    open24_hours: {
        en: 'Open 24 Hours',
        he: 'פתוח 24 שעות',
        ar: 'مفتوحة 24 ساعة',
    },
    instagram_page_url: {
        en: 'Instagram Page URL',
        he: 'עמוד אינסטגרם',
        ar: 'رابط الصفحة الإنستغرام',
    },
    facebook_page_url: {
        en: 'Facebook Page URL',
        he: 'עמוד פייסבוק',
        ar: 'رابط الصفحة الفيسبوك',
    },
    websites_url: {
        en: 'Websites URL',
        he: 'כתובות אתרים',
        ar: 'روابط المواقع',
    },
    contact_person_phone_number: {
        en: 'Contact Person Phone Number',
        he: 'מספר טלפון איש קשר',
        ar: 'رقم الهاتف للشخص المراد الاتصال به',
    },
    in_place: {
        en: 'In Place',
        he: 'במקום',
        ar: 'في المكان',
    },
    contact_person_name: {
        en: 'Contact Person Name',
        he: 'שם איש קשר',
        ar: 'اسم الشخص المراد الاتصال به',
    },
    open_on_weekend: {
        en: 'Open on weekend',
        he: 'פתוח בסוף שבוע',
        ar: 'مفتوح في عطلة نهاية الأسبوع',
    },
    is_kosher: {
        en: 'Is Kosher',
        he: 'כשר',
        ar: 'كوشير',
    },
    submit: {
        en: 'Submit',
        he: 'שלח',
        ar: 'إرسال',
    },
    search_for_a_place: {
        en: 'Search for a place',
        he: 'חפש מיקום',
        ar: 'ابحث عن مكان',
    },
    event_details: {
        en: 'Event details',
        he: 'פרטי האירוע',
        ar: 'تفاصيل الحدث',
    },
    event_name: {
        en: 'Event name',
        he: 'שם האירוע',
        ar: 'اسم الحدث',
    },
    date_start: {
        en: 'Start date',
        he: 'תאריך התחלה',
        ar: 'تاريخ البدء',
    },
    date_end: {
        en: 'End date',
        he: 'תאריך סיום',
        ar: 'تاريخ الانتهاء',
    },
    how_much: {
        en: 'Ammount',
        he: 'מחיר',
        ar: 'كم الثمن',
    },
    currency: {
        en: 'Currency',
        he: 'מטבע',
        ar: 'عملة',
    },
    please_choose_a_shading_option: {
        en: 'Please choose a shading option',
        he: 'אנא בחר אפשרות הצללה',
        ar: 'الرجاء تحديد خيار التظليل',
    },
    please_choose_an_arrival_recommendation: {
        en: 'Please choose an arrival recommendation',
        he: 'אנא בחר המלצת הגעה',
        ar: 'الرجاء اختيار توصية وصول',
    },
    reservation_center_email: {
        en: 'Reservation center email',
        he: 'כתובת דואר אלקטרוני להזמנות',
        ar: 'البريد الإلكتروني لمركز الحجز',
    },
    online_meeting_u_r_l: {
        en: 'Online meeting URL',
        he: 'לינק לפגישה אונליין',
        ar: 'عنوان URL للاجتماع عبر الإنترنت',
    },
    producer: {
        en: 'Producer',
        he: 'מפיק',
        ar: 'منتج',
    },
    add_connection: {
        en: 'Add connection',
        he: 'הוסף קישור',
        ar: 'أضف الاتصال',
    },
    producer_phone: {
        en: 'Producer phone',
        he: 'מספר מפיק',
        ar: 'هاتف المنتج',
    },
    producer_mail: {
        en: 'Producer mail',
        he: 'מייל מפיק',
        ar: 'بريد المنتج',
    },
    reservations_phone: {
        en: 'Reservations phone',
        he: 'טלפון להזמנות',
        ar: 'هاتف الحجز',
    },
    reservations_mail: {
        en: 'Reservations mail',
        he: 'מייל להזמנות',
        ar: 'بريد الحجز',
    },
    category_id: {
        en: 'Category ID',
        he: 'מזהה קטגוריה',
        ar: 'معرف الفئة',
    },
    activities_in_place: {
        en: 'Activities in place',
        he: 'פעילויות במקום',
        ar: 'لأنشطة في المكان',
    },
    exclusive_for: {
        en: 'Exclusive for',
        he: 'מתאים עבור',
        ar: 'حصريا ل',
    },
    preffered_season: {
        en: 'Sreffered Season',
        he: 'עונה מועדפת',
        ar: 'الموسم المفضل',
    },
    shady: {
        en: 'Is there shade',
        he: 'האם יש צל',
        ar: 'هل يوجد ظل؟',
    },
    arrival_recommendations: {
        en: 'Arrival recommendations',
        he: 'המלצות הגעה',
        ar: 'توصيات الوصول',
    },
    number: {
        en: 'Number',
        he: 'מספר',
        ar: 'رقم التليفون',
    },
    please_enter_a_valid_number: {
        en: 'Please enter a valid number',
        he: 'אנא הכנס מספר חוקי',
        ar: 'من فضلك أدخل رقما صالحا',
    },
    webpage_url: {
        en: 'Webpage URL',
        he: 'כתובת אתר',
        ar: 'عنوان url لصفحة الويب',
    },
    contact_email: {
        en: 'Contact Email',
        he: 'מייל איש קשר',
        ar: 'بريد الاتصال',
    },
    infancy: {
        en: 'Infancy',
        he: 'גיל הרך',
        ar: 'الطفولة',
    },
    kids_and_youth: {
        en: 'Kids and youth',
        he: 'ילדים ונוער',
        ar: 'الأطفال والشباب',
    },
    all_family: {
        en: 'For all the family',
        he: 'לכל המשפחה',
        ar: 'لجميع أفراد الأسرة',
    },
    half_day: {
        en: 'Half a day',
        he: 'חצי יום',
        ar: 'نصف يوم',
    },
    groups: {
        en: 'Groups',
        he: 'קבוצות',
        ar: 'مجموعات',
    },
    is_hidden: {
        en: 'Is hidden',
        he: 'מוחבא',
        ar: 'مخفيا',
    },
    cover_image_file_id: {
        en: 'Cover image ID',
        he: 'מזהה תמונת נושא',
        ar: 'معرف صورة الغلاف',
    },
    object_ids: {
        en: 'Object IDs',
        he: 'מזהי אובייקטים',
        ar: 'معرفات الكائن',
    },
    is_recommended: {
        en: 'Is recommended',
        he: 'מומלץ',
        ar: 'موصى به',
    },
    please_choose_a_time_frame: {
        en: 'Please choose a time frame',
        he: 'אנא בחר מסגרת זמן',
        ar: 'الرجاء اختيار إطار زمني',
    },
    choose_a_theme_image: {
        en: 'Choose a theme image',
        he: 'בחר תמונת נושא',
        ar: 'اختر صورة موضوع',
    },
    golden_age: {
        en: 'Golden age',
        he: 'גיל הזהב',
        ar: 'العصر الذهبي',
    },
    time_duration_days: {
        en: 'Time duration days',
        he: 'משך זמן בימים',
        ar: 'المدة الزمنية أيام',
    },
    time_duration_hours: {
        en: 'Time duration hours',
        he: 'משך זמן בשעות',
        ar: 'المدة الزمنية بالساعات',
    },
    time_duration_minutes: {
        en: 'Time duration minutes',
        he: 'משך זמן בדקות',
        ar: 'مدة الوقت بالدقائق',
    },
    point_of_intrest: {
        en: 'Point of intrest',
        he: 'נקודת עניין',
        ar: 'نقطة الأهتمام',
    },
    points_of_intrest: {
        en: 'Points of intrest',
        he: 'נקודות עניין',
        ar: 'نقاط الاهتمام',
    },
    featured: {
        en: 'Featured',
        he: 'מומלצים',
        ar: 'متميز',
    },
    all_seasons: {
        en: 'All seasons',
        he: 'כל העונות',
        ar: 'كل المواسم',
    },
    fall: {
        en: 'Fall',
        he: 'סתיו',
        ar: 'يسقط',
    },
    walk: {
        en: 'Walk',
        he: 'רגלי',
        ar: 'مشي',
    },
    off_road: {
        en: '4x4',
        he: '4x4',
        ar: '4x4',
    },
    car: {
        en: 'Car',
        he: 'רכב',
        ar: 'سيارة',
    },
    bicycle: {
        en: 'Bicycle',
        he: 'אופניים',
        ar: 'دراجة تدريبية',
    },
    verification_page: {
        en: 'Verification Page',
        he: 'דף אימות',
        ar: 'صفحة التحقق',
    },
    an_email_has_been_sent_to: {
        en: 'An email has been sent to',
        he: 'המייל נשלח ל',
        ar: 'تم إرسال رسالة إلكترونية إلى',
    },
    please_enter_your_verification_code: {
        en: 'Please enter your verification code',
        he: 'הכנס בבקשה את קוד האימות',
        ar: 'الرجاء إدخال رمز التحقق الخاص بك',
    },
    verify_code: {
        en: 'Verify code',
        he: 'קוד אימות',
        ar: 'كود التحقق',
    },
    send: {
        en: 'Send',
        he: 'שלח',
        ar: 'إرسال',
    },
    resend_verification_code: {
        en: 'Resend verification code',
        he: 'שלח קוד אימות מחדש',
        ar: 'إعادة إرسال رمز التحقق',
    },
    verified: {
        en: 'verified',
        he: 'מאומת',
        ar: 'تم التحقق',
    },
    phone_number: {
        en: 'phone number',
        he: 'מספר טלפון',
        ar: 'رقم التليفون',
    },
    Will_not_be_displayed: {
        en: '(Will not be displayed in the app)',
        he: '(לא יוצג באפליקציה)',
        ar: '(لن يتم عرضها في التطبيق)',
    },
    other: {
        en: 'Other',
        he: 'אחר',
        ar: 'آخر',
    },
    start_date: {
        en: 'start date',
        he: 'תאריך התחלה',
        ar: 'تاريخ البدء',
    },
    price: {
        en: 'price',
        he: 'מחיר',
        ar: 'السعر',
    },
    metro_super_admin: {
        en: 'Admin',
        he: 'מנהל',
        ar: 'مسؤل',
    },
    metro_business_owner: {
        en: 'Business owner',
        he: 'בעל עסק',
        ar: 'صاحب العمل',
    },
    metro_area_owner: {
        en: 'Area owner',
        he: 'בעל איזור',
        ar: 'مالك المنطقة',
    },
    metro_authority_owner: {
        en: 'Authority owner',
        he: 'בעל רשות',
        ar: 'صاحب السلطة',
    },
    no_events_on_this_date: {
        en: 'No events on selected date',
        he: 'אין אירועים בתאריך זה',
        ar: 'لا توجد أحداث في التاريخ المحدد',
    },
    open_hour: {
        en: 'Start time',
        he: 'שעה התחלה',
        ar: 'ساعة مفتوحة',
    },
    end_date: {
        en: 'end_date',
        he: 'תאריך סיום',
        ar: 'تاريخ الانتهاء',
    },
    poi_name: {
        en: 'point name',
        he: 'שם נקודה',
        ar: 'اسم النقطة',
    },
    track_name: {
        en: 'track name',
        he: 'שם מסלול',
        ar: 'اسم المسار',
    },
    admin: {
        en: 'admin',
        he: 'מנהל',
        ar: 'مدير',
    },
    admin_page: {
        en: 'Admin Page',
        he: 'דף מנהל',
        ar: 'صفحة المدير',
    },
    add_tags: {
        en: 'Add tags',
        he: 'הוסף תגיות',
        ar: 'إضافة علامات',
    },
    add_tag: {
        en: 'Add tag',
        he: 'הוסף תגית',
        ar: 'إضافة علامة',
    },
    add_new_area: {
        en: 'Add new area',
        he: 'הוסף אזור חדש',
        ar: 'إضافة منطقة جديدة',
    },
    add_new_authority: {
        en: 'Add new authority',
        he: 'הוסף רשות חדשה',
        ar: 'إضافة جهة جديدة',
    },
    area: {
        en: 'Area',
        he: 'אזור',
        ar: 'منطقة',
    },
    error_creating: {
        en: 'Error creating',
        he: 'שגיאה ביצירת',
        ar: 'خطأ في الإنشاء',
    },
    created_successfully: {
        en: 'created successfully',
        he: 'נוצר בהצלחה',
        ar: 'تم الإنشاء بنجاح',
    },
    manage_users: {
        en: 'Manage users',
        he: 'נהל משתמשים',
        ar: 'إدارة المستخدمين',
    },
    manage_properties: {
        en: 'Manage properties',
        he: 'נהל מאפיינים',
        ar: 'إدارة الخصائص',
    },
    tag_name: {
        en: 'tag name',
        he: 'שם תגית',
        ar: 'اسم العلامة',
    },
    latitute: {
        en: 'latitute',
        he: 'קו רוחב',
        ar: 'خط العرض',
    },
    longitude: {
        en: 'longitude',
        he: 'קו אורך',
        ar: 'خط الطول',
    },
    zoom: {
        en: 'zoom',
        he: 'זום',
        ar: 'التكبير',
    },
    reset_location: {
        en: 'Reset location',
        he: 'אפס מיקום',
        ar: 'إعادة تعيين الموقع',
    },
    location: {
        en: 'Location',
        he: 'מיקום',
        ar: 'الموقع',
    },
    location_name: {
        en: 'location name',
        he: 'שם יעד',
        ar: 'اسم الموقع',
    },
    is_accessable: {
        en: 'Is accessable',
        he: 'נגיש',
        ar: 'متاح',
    },
    manage_tags: {
        en: 'Manage tags',
        he: 'נהל תגיות',
        ar: 'إدارة العلامات',
    },
    manage_area: {
        en: 'Manage area',
        he: 'נהל אזור',
        ar: 'إدارة المنطقة',
    },
    manage_authorities: {
        en: 'Manage authorities',
        he: 'נהל רשויות',
        ar: 'إدارة الجهات',
    },
    crop_image: {
        en: "Crop Image",
        he: "חתוך תמונה",
        ar: "قص الصوره"
    },
    title: {
        en: 'title',
        he: 'כותרת',
        ar: 'العنوان',
    },
    images: {
        en: 'Images',
        he: 'תמונות',
        ar: 'الصور',
    },
    files: {
        en: 'Files',
        he: 'קבצים',
        ar: 'الملفات',
    },
    videos: {
        en: 'Videos',
        he: 'סרטונים',
        ar: 'أشرطة فيديو',
    },
    email: {
        en: 'email',
        he: 'אימייל',
        ar: 'البريد الإلكتروني',
    },
    authorities: {
        en: 'authorities',
        he: 'רשויות',
        ar: 'الجهات',
    },
    area_related_tags: {
        en: 'area related tags',
        he: 'תגיות מקושרות לאזור',
        ar: 'العلامات المرتبطة بالمنطقة',
    },
    actions: {
        en: 'actions',
        he: 'פעולות',
        ar: 'الإجراءات',
    },
    related_categories: {
        en: 'related categories',
        he: 'קטגוריות קשורות',
        ar: 'الفئات المرتبطة',
    },
    local_campaigns: {
        en: 'local campaigns',
        he: 'קמפיינים מקומיים',
        ar: 'الحملات المحلية',
    },
    audio: {
        en: 'Audio',
        he: 'שמע',
        ar: 'صوتي'
    },
    video: {
        en: 'Video',
        he: 'סרטון',
        ar: 'فيديو'
    },
    logo: {
        en: "Logo",
        he: "לוגו",
        ar: 'شعار'
    },
    image: {
        en: "Image",
        he: 'תמונה',
        ar: 'صورة'
    },
    files: {
        en: "Files",
        he: 'קבצים',
        ar: 'الملفات'
    },
    summer: {
        en: 'Summer',
        he: 'קיץ',
        ar: 'صيفي'
    },
    winter: {
        en: 'Winter',
        he: 'חורף',
        ar: 'شتاء'
    },
    spring: {
        en: 'Spring',
        he: 'אביב',
        ar: 'ربيعي'
    },
    full: {
        en: 'Full',
        he: 'מלא',
        ar: 'كامل'
    },
    partial: {
        en: 'Partial',
        he: 'חלקי',
        ar: 'جزئي'
    },
    none: {
        en: 'None',
        he: 'ללא',
        ar: 'لا شيء'
    },
    set_location: {
        en: 'Set location',
        he: 'קבע מיקום',
        ar: 'تعيين الموقع'
    },
    delete_confirmation: {
        en: 'Are you sure you want to delete this?',
        he: 'האם אתה בטוח שברצונך למחוק?',
        ar: 'هل أنت متأكد من حذف هذا؟'
    },
    location_set: {
        en: 'Location set',
        he: 'מיקום נקבע',
        ar: 'تم تعيين الموقع'
    },
    general: {
        en: 'General',
        he: 'כללי',
        ar: 'عام'
    },
    map_location: {
        en: 'Map location',
        he: 'מיקום במפה',
        ar: 'موقع الخريطة'
    },
    more_info: {
        en: 'More info',
        he: 'מידע נוסף',
        ar: 'مزيد من المعلومات'
    },
    this_filed_is_required: {
        en: 'This field is required',
        he: 'שדה זה הוא שדה חובה',
        ar: 'هذا الحقل مطلوب'
    },
    date_error: {
        en: 'Date is not valid',
        he: 'תאריך לא תקין',
        ar: 'تاريخ غير صالح'
    },
    date_format: {
        en: 'Date format mm/dd/yyyy',
        he: 'תבנית תאריך mm/dd/yyyy',
        ar: 'تنسيق التاريخ mm/dd/yyyy'
    },
    link_tags: {
        en: 'Link tags',
        he: 'קישור תגיות',
        ar: 'رابط الوسوم'
    },
    kids: {
        en: 'Kids',
        he: 'ילדים',
        ar: 'أطفال'
    },
    youth: {
        en: 'Youth',
        he: 'נוער',
        ar: 'شباب'
    },
    young_adults: {
        en: 'Young adults',
        he: 'צעירים',
        ar: 'شباب'
    },
    adults: {
        en: 'Adults',
        he: 'מבוגרים',
        ar: 'بالغين'
    },
    families: {
        en: 'Families',
        he: 'משפחות',
        ar: 'أسر'
    },
    women_only: {
        en: 'Women only',
        he: 'נשים בלבד',
        ar: 'النساء فقط'
    },
    men_only: {
        en: 'men only',
        he: 'גברים בלבד',
        ar: 'الرجال فقط'
    },
    free: {
        en: 'Free',
        he: 'חינם',
        ar: 'مجاني'
    },
    free_with_reservation: {
        en: 'Free with reservation',
        he: 'חינם עם הזמנה',
        ar: 'مجاني مع الحجز'
    },
    payment: {
        en: 'Payment',
        he: 'בתשלום',
        ar: 'الدفع'
    },
    payment_with_reservation: {
        en: 'Payment with reservation',
        he: 'בתשלום עם הזמנה',
        ar: 'الدفع مع الحجز'
    },
    on_place: {
        en: 'On place',
        he: 'במקום',
        ar: 'في المكان'
    },
    short_description: {
        en: 'Short description',
        he: 'תיאור מדוייק בכמה מילים',
        ar: 'وصف قصير'
    },
    reservations: {
        en: 'Reservations',
        he: 'הזמנות',
        ar: 'الحجوزات'
    },
    pinned: {
        en: 'Pinned',
        he: 'נעוץ',
        ar: 'مثبت'
    },
    tracks: {
        en: 'Tracks',
        he: 'מסלולים',
        ar: 'المسارات'
    },
    added_this_month: {
        en: 'Added this month',
        he: 'נוספו החודש',
        ar: 'أضيف هذا الشهر'
    },
    tracks: {
        en: 'Tracks',
        he: 'מסלולים',
        ar: 'المسارات'
    },
    added_this_week: {
        en: 'Added this week',
        he: 'נוספו השבוע',
        ar: 'أضيف هذا الأسبوع'
    },
    added_today: {
        en: 'Added Today',
        he: 'נוספו היום',
        ar: 'أضيف اليوم'
    },
    added_last_month: {
        en: 'Added last month',
        he: 'נוספו חודש שעבר',
        ar: 'أضيف الشهر الماضي'
    },
    added_yesterday: {
        en: 'Added yesterday',
        he: 'נוספו אתמול',
        ar: 'أضيف أمس'
    },
    added_last_week: {
        en: 'Added last week',
        he: 'נוספו שבוע שעבר',
        ar: 'أضيفت الأسبوع الماضي'
    },
    phone_number_whatsapp: {
        en: 'Phone number / Whatsapp ( appears on app )',
        he: 'מספר נייד ( מופיע באפליקציה בוואטסאפ ) ',
        ar: 'رقم الهاتف / Whatsapp (يظهر في التطبيق)'
    },
    picnic_tables: {
        en: 'Picnic tables',
        he: 'שולחנות פיקניק',
        ar: 'طاولات النزهة'
    },
    benches: {
        en: 'Benches',
        he: 'ספסלים',
        ar: 'مقاعد'
    },
    tins: {
        en: 'Tins',
        he: 'פחים',
        ar: 'علب'
    },
    bbq_positions: {
        en: 'BBQ positions',
        he: 'עמדות מנגל',
        ar: 'مواقف للشواء'
    },
    toilet: {
        en: 'Toilet',
        he: 'שירותים',
        ar: 'الحمام'
    },
    drinking_fountain: {
        en: 'Drinking fountain',
        he: 'ברזייה',
        ar: 'نافورة مياه الشرب'
    },
    play_facilities: {
        en: 'Play facilities',
        he: 'מתקני משחק לילדים',
        ar: 'مرافق اللعب'
    },
    exercise_machines: {
        en: 'Exercise machines',
        he: 'מתקני כושר',
        ar: 'الة تمرين'
    },
    dog_garden: {
        en: 'Dog garden',
        he: 'גינה לכלבים',
        ar: 'حديقة الكلب'
    },
    explanatory_board: {
        en: 'Explanatory board',
        he: 'שלטי הסבר',
        ar: 'لوحة توضيحية'
    },
    buffet: {
        en: 'Buffet',
        he: 'מזנון',
        ar: 'بوفيه'
    },
    cloakroom: {
        en: 'Cloakroom',
        he: 'מלתחות',
        ar: 'حجرة إيداع'
    },
    beach_shower: {
        en: 'Beach shower',
        he: 'מקלחות חוף',
        ar: 'دش الشاطئ'
    },
    free_parking: {
        en: 'Free parking',
        he: 'חניה חינם',
        ar: 'موقف توزيع مجاني'
    },
    neat_parking: {
        en: 'Neat parking',
        he: 'חניה מסודרת',
        ar: 'مرتبة وقوف السيارات'
    },
    at_the_place: {
        en: 'At the place',
        he: 'מה במקום',
        ar: 'في المكان'
    },
    tip: {
        en: 'Tip',
        he: 'הידעת?',
        ar: 'نصيحة'
    },
    online: {
        en: 'Online',
        he: 'מקוון',
        ar: 'الإنترنت'
    },
    relevant_to: {
        en: 'Relevant to',
        he: 'למי מתאים',
        ar: 'متعلق ب'
    },
    youtube_page_url: {
        en: 'Youtube page url',
        he: 'עמוד יוטיוב',
        ar: 'رابط الصفحة الخاصة بي'
    },
    online_meeting_link: {
        en: 'Online meeting link',
        he: 'קישור לפגישה מקוונת',
        ar: 'رابط المحادثة الإنترنتية'
    },
    related_business: {
        en: 'Related business',
        he: 'עסקים קשורים',
        ar: 'الأعمال المرتبطة'
    },
    registration_link: {
        en: 'Registration link',
        he: 'קישור להרשמה',
        ar: 'رابط التسجيل'
    },
    link: {
        en: 'Link',
        he: 'קישור',
        ar: 'رابط'
    },
    // ----helpers----
    location_name_helper: {
        en: 'The name of the location',
        he: 'שם המיקום',
        ar: 'اسم الموقع'
    },
    name_helper: {
        en: 'The name of the place',
        he: 'שם המקום',
        ar: 'اسم المكان'
    },
    websites_url_helper: {
        en: 'The website of the place',
        he: 'כתובת האתר של המקום',
        ar: 'موقع المكان'
    },
    description_helper: {
        en: 'The description of the place',
        he: 'תיאור המקום',
        ar: 'وصف المكان'
    },
    authority_id_helper: {
        en: 'The authority of the place',
        he: 'הרשות של המקום',
        ar: 'سلطة المكان'
    },
    phone_number_helper: {
        en: 'The phone number of the place',
        he: 'מספר הטלפון של המקום',
        ar: 'رقم الهاتف للمكان'
    },
    contact_person_name_helper: {
        en: 'The name of the contact person',
        he: 'שם האיש הקשר',
        ar: 'اسم الشخص المراسل'
    },
    contact_person_phone_number_helper: {
        en: 'The phone number of the contact person',
        he: 'מספר הטלפון של האיש הקשר',
        ar: 'رقم الهاتف للشخص المراسل'
    },
    email_address_helper: {
        en: 'The email address of the contact person',
        he: 'כתובת האימייל של האיש הקשר',
        ar: 'عنوان البريد الإلكتروني للشخص المراسل'
    },
    facebook_page_url_helper: {
        en: 'The facebook page of the place',
        he: 'עמוד הפייסבוק של המקום',
        ar: 'صفحة الفيسبوك للمكان'
    },
    instagram_page_url_helper: {
        en: 'The instagram page of the place',
        he: 'עמוד האינסטגרם של המקום',
        ar: 'صفحة الإنستجرام للمكان'
    },
    youtube_page_url_helper: {
        en: 'The youtube page of the place',
        he: 'עמוד היוטיוב של המקום',
        ar: 'صفحة اليوتيوب للمكان'
    },
    short_description_helper: {
        en: 'The short description of the place',
        he: 'תיאור קצר של המקום',
        ar: 'وصف قصير للمكان'
    },
    reservations_helper: {
        en: 'The reservations of the place',
        he: 'הזמנות המקום',
        ar: 'الحجوزات للمكان'
    },
    tags_ids_helper: {
        en: 'The tags of the place',
        he: 'תגיות המקום',
        ar: 'العلامات للمكان'
    },
    tags_helper: {
        en: 'The tags of the place',
        he: 'תגיות המקום',
        ar: 'العلامات للمكان'
    },
    relevant_to_helper: {
        en: 'The relevant to of the place',
        he: 'למי המקום הזה הוא שימושי',
        ar: 'المكان الذي ينطبق عليه الإعلان'
    },
    online_meeting_u_r_l_helper: {
        en: 'The online meeting link of the place',
        he: 'קישור לפגישה מקוונת של המקום',
        ar: 'رابط المحادثة الإنترنتية للمكان'
    },
    related_business_id_helper: {
        en: 'The related business of the place',
        he: 'העסקים הקשורים למקום',
        ar: 'الأعمال المرتبطة للمكان'
    },
    price_helper: {
        en: 'The price of the event',
        he: 'מחיר האירוע',
        ar: 'السعر للحدث'
    },
    currency_helper: {
        en: 'The currency of the area',
        he: 'המטבע של האיזור',
        ar: 'العملة للمنطقة'
    },
    producer_name_helper: {
        en: 'The producer name of the event',
        he: 'שם היוצר',
        ar: 'اسم المنتج'
    },
    producer_phone_helper: {
        en: 'The producer phone of the event',
        he: 'מספר הטלפון של היוצר',
        ar: 'رقم الهاتف للمنتج'
    },
    producer_email_helper: {
        en: 'The producer email of the event',
        he: 'כתובת האימייל של היוצר',
        ar: 'البريد الإلكتروني للمنتج'
    },
    reservation_center_phone_helper: {
        en: 'The reservation center phone of the event',
        he: 'מספר הטלפון של המרכז ההזמנות',
        ar: 'رقم الهاتف للمركز الحجز'
    },
    website_url_helper: {
        en: 'The website url of the event',
        he: 'כתובת האתר של האירוע',
        ar: 'رابط الموقع'
    },
    registration_url_helper: {
        en: 'The registration url of the event',
        he: 'כתובת הטופס הרשמה של האירוע',
        ar: 'رابط التسجيل'
    },
    poi_name_helper: {
        en: 'The name of the point of interest',
        he: 'שם הנקודת העניין',
        ar: 'اسم النقطة المهمة'
    },
    activities_in_place_helper: {
        en: 'The activities in the place',
        he: 'הפעילויות במקום',
        ar: 'الأنشطة في المكان'
    },
    exclusive_for_helper: {
        en: 'What this place is exclusive for',
        he: 'המקום יחודי עבור?',
        ar: 'ما هو المكان الخاص به'
    },
    preffered_season_helper: {
        en: 'Preffered season',
        he: 'עונה מועדפת',
        ar: 'الموسم المفضل'
    },
    shady_helper: {
        en: 'Is the place shady?',
        he: 'האם המקום מוצל?',
        ar: 'هل هو المكان الخاص به بشكل خاص؟'
    },
    arrival_recommendations_helper: {
        en: 'How it is recommended to arrive',
        he: 'איך מומלץ להגיע',
        ar: 'كيف ينصح بالوصول'
    },
    tip_helper: {
        en: 'Tip',
        he: 'טיפ',
        ar: 'نصيحة'
    },
    contact_email_helper: {
        en: 'The contact email of the event',
        he: 'כתובת האימייל של האירוע',
        ar: 'البريد الإلكتروني للحدث'
    },
    reservation_center_email_helper: {
        en: 'The reservation center email of the event',
        he: 'כתובת האימייל של המרכז ההזמנות',
        ar: 'البريد الإلكتروني للمركز الحجز'
    },
    in_place_helper: {
        en: 'In place',
        he: 'במקום',
        ar: 'في المكان'
    },
    category_id_helper: {
        en: 'The category related to the tag',
        he: 'הקטגוריה הקשורה לתג',
        ar: 'الفئة المرتبطة بالعلامة'
    },
    title_helper: {
        en: 'The title of the tag',
        he: 'כותרת התג',
        ar: 'عنوان العلامة'
    },
    area_id_helper: {
        en: 'The area this authority is related to',
        he: 'האיזור של הרשות',
        ar: 'المنطقة التي ترتبط بها الجهة'
    },
    email_helper: {
        en: 'The email of the authority',
        he: 'כתובת האימייל של הרשות',
        ar: 'البريد الإلكتروني للجهة'
    },
    address_helper: {
        en: 'The address of the authority',
        he: 'כתובת הרשות',
        ar: 'عنوان الجهة'
    },
    characters: {
        en: 'characters',
        he: 'תווים',
        ar: 'الشخصيات'
    },
    words: {
        en: 'Words',
        he: 'מילים',
        ar: 'كلمات'
    },
    hidden: {
        en: 'Hidden',
        he: 'חבוי',
        ar: 'مختفي'
    },
    over_query_limit: {
        en: 'You have reached the query limit, please wait a couple of seconds',
        he: 'הגעתה למספר פניות מקסימלי, אנא חכה מספר שניות',
        ar: 'لقد وصلت إلى حد الاستعلام ، يرجى الانتظار بضع ثوان'
    },
    hidden_fields: {
        en: 'Those fields are hidden from the user',
        he: 'שדות חבויים מהמשתמש',
        ar: 'هذه الحقول مخفية عن المستخدم'
    },
    please_enter_an_address: {
        en: 'Please enter an address',
        he: 'אנא הזן כתובת',
        ar: 'يرجى إدخال عنوان'
    },
    hour: {
        en: 'Hour',
        he: 'שעה',
        ar: 'ساعة'
    },
    email_is_invalid_or_taken: {
        en: 'Email is invalid or taken',
        he: 'כתובת אימייל לא חוקית או תפוסה',
        ar: 'البريد الإلكتروني غير صالح أو مأخوذ'
    },
    hour: {
        en: 'Hour',
        he: 'שעה',
        ar: 'ساعة'
    },
    every_user_must_be_a_member: {
        en: 'Every user must be a member',
        he: 'כל משתמש חייב להיות "משתמש"',
        ar: 'ساعة'
    },
    please_choose_one_extra_role_per_user: {
        en: 'Please choose one extra role per user',
        he: 'אנא בחר תפקיד אחד נוסף למשתמש',
        ar: 'الرجاء اختيار دور إضافي واحد لكل مستخدم'
    },
    hour: {
        en: 'Hour',
        he: 'שעה',
        ar: 'ساعة'
    },
    cant_change_status_please_add_tags: {
        en: 'Cannot change status, please add at least one tag',
        he: 'לא יכול לשנות סטטוס, אנא הוסף לפחות תגית אחת',
        ar: 'لا يمكن تغيير الحالة ، يرجى إضافة علامة واحدة على الأقل'
    },
    maximum_file_upload_size_is: {
        en: 'Maximum file size is',
        he: 'גודל קובץ מקסימלי הוא',
        ar: 'الحجم الأقصى للملف هو'
    },
    please_enter_a_product_name: {
        en: 'Please enter a product name',
        he: 'אנא הכנס שם מוצר',
        ar: 'الرجاء إدخال اسم المنتج'
    },
    password_reset_sent: {
        en: 'A link to reset your password has been sent to your email',
        he: 'לינק לשינוי סיסמא נשלח אליך בדואר האלקטרוני',
        ar: 'تم إرسال رابط لإعادة تعيين كلمة المرور الخاصة بك إلى بريدك الإلكتروني'
    },
    '1_to_3_hours': {
        en: 'One to three hours',
        he: 'שעה עד שלוש שעות',
        ar: 'من ساعة إلى ثلاث ساعات'
    },
    tag_id: {
        en: 'Tag ID',
        he: 'מזהה תגית',
        ar: 'معرف العلامة'
    },
    edit_tags: {
        en: 'Edit tags',
        he: 'ערוך תגיות',
        ar: 'تعديل العلامات'
    },
    more_than_two_days: {
        en: 'More than two days',
        he: 'יומיים ומעלה',
        ar: 'أكثر من يومين'
    },
    full_day: {
        en: 'Full day',
        he: 'יום שלם',
        ar: 'يوم كامل'
    },
    half_a_day: {
        en: 'Half a day',
        he: 'חצי יום',
        ar: 'نصف يوم'
    },
    between_an_hour_and_three_hours: {
        en: 'An hour to three hours',
        he: 'בין שעה לשלוש שעות',
        ar: 'من ساعة إلى ثلاث ساعات'
    },
    choose_an_image: {
        en: 'Choose an image',
        he: 'בחר תמונה',
        ar: 'اختر صورة'
    },
    please_enter_a_name: {
        en: 'Please enter a name',
        he: 'אנא הכנס שם',
        ar: 'الرجاء إدخال اسم'
    },
    please_enter_a_registration_link: {
        en: 'Please enter a registration link',
        he: 'נא להזין קישור הרשמה',
        ar: 'الرجاء إدخال ارتباط التسجيل'
    },
    please_add_a_description: {
        en: 'Please add a description',
        he: 'נא להוסיף תיאור',
        ar: 'الرجاء إضافة وصف'
    },
    please_choose_a_resevation_option: {
        en: 'Please choose a reservation option',
        he: 'אנא בחר אפשרות הזמנה',
        ar: 'الرجاء اختيار خيار الحجز'
    },
    please_enter_an_event_name: {
        en: 'Please enter an event name',
        he: 'נא להזין שם אירוע',
        ar: 'الرجاء إدخال اسم الحدث'
    },
    please_choose_at_least_one_tag: {
        en: 'Plase choose at least one tag',
        he: 'בחר תג אחד לפחות',
        ar: 'الرجاء اختيار علامة واحدة على الأقل'
    },
    please_choose_an_area: {
        en: 'Please choose an area',
        he: 'אנא בחר אזור',
        ar: 'الرجاء اختيار منطقة'
    },
    please_enter_an_authority_name: {
        en: 'Plase enter an authority name',
        he: 'הזן שם רשות',
        ar: 'الرجاء إدخال اسم السلطة'
    },
    please_enter_a_valid_email_address: {
        en: 'Please enter a valid email address',
        he: 'אנא הכנס כתובת דואר אלקטרוני תקינה',
        ar: 'يرجى إدخال عنوان بريد إلكتروني صالح'
    },
    please_enter_the_contact_persons_name: {
        en: 'Please enter the contact persons name',
        he: 'אנא הכנס את שם איש הקשר',
        ar: 'الرجاء إدخال اسم جهة الاتصال'
    },
    please_enter_a_valid_phone_number: {
        en: 'Please enter a valid phone number',
        he: 'אנא הכנס מספר חוקי',
        ar: 'من فضلك أدخل رقما صالحا'
    },
    please_select_a_reservation_option: {
        en: 'Please select a reservation option',
        he: 'אנא בחר אפשרות הזמנה',
        ar: 'الرجاء تحديد خيار الحجز'
    },
    short_description_cannot_exceed: {
        en: 'Short description cannot exceed',
        he: 'תיאור קצר לא יכול להכיל יותר מ',
        ar: 'لا يمكن أن يتجاوز الوصف المختصر'
    },
    you_cant_be_kosher_and_open_on_weekends: {
        en: 'You can\'t be kosher and open on weekends',
        he: 'עסק לא יכול להיות כשר ופתוח בסופי שבוע',
        ar: 'لا يمكنك أن تكون موافقًا للشريعة اليهودية ومفتوحًا في عطلات نهاية الأسبوع'
    },
    password_must_be_at_least_6_characters_long_helper: {
        en: 'The password must be at least 6 characters long',
        he: 'הסיסמה חייבת להיות באורך של 6 תווים לפחות',
        ar: 'يجب أن تكون كلمة المرور 6 أحرف على الأقل'
    },
    registration_link_helper: {
        en: 'The registration link of the event',
        he: 'כתובת הטופס הרשמה של האירוע',
        ar: 'رابط التسجيل'
    },
    tag_id_helper: {
        en: 'The tag related to the event',
        he: 'התג הקשור לאירוע',
        ar: 'العلامة المرتبطة بالحدث'
    },
    // ----helpers----
    please_fill_this_field: {
        en: 'Please fill this field',
        he: 'אנא מלא שדה זה',
        ar: 'يرجى ملء هذا الحقل'
    },
    this_field_is_limited: {
        en: 'This field is limited to',
        he: 'שדה זה מוגבל ל',
        ar: 'هذا الحقل محدود ل'
    },
    please_fill_all_required_fields: {
        en: 'Please fill all required fields',
        he: 'אנא מלא את כל השדות הנדרשים',
        ar: 'يرجى ملء جميع الحقول المطلوبة'
    },
    welcome_guest: {
        en: 'Welcome guest',
        he: 'ברוך הבא אורח',
        ar: 'مرحبا بك الضيوف'
    },
    // ----errors from firebase----
    auth_invalid_email: {
        en: 'The email address is badly formatted.',
        he: 'כתובת האימייל שגויה',
        ar: 'البريد الإلكتروني غير صحيح'
    },
    auth_email_already_in_use: {
        en: 'The email address is already in use by another account.',
        he: 'כתובת האימייל כבר בשימוש',
        ar: 'البريد الإلكتروني مستخدم بالفعل'
    },
    auth_operation_not_allowed: {
        en: 'Password sign-in is disabled for this project.',
        he: 'הכנסת סיסמא אינה אפשרית בפרויקט זה',
        ar: 'تسجيل الدخول باستخدام كلمة المرور غير مسموح به'
    },
    auth_wrong_password: {
        en: 'The password is invalid or the user does not have a password.',
        he: 'סיסמא שגויה',
        ar: 'كلمة المرور غير صحيحة أو لا توجد كلمة مرور'
    },
    // ----errors from firebase----
    yes: {
        en: 'Yes',
        he: 'כן',
        ar: 'نعم'
    },
    please_make_sure_that_your_details_are_correct: {
        en: 'Please make sure your details are correct',
        he: 'אנא וודא שפרטיך נכונים',
        ar: 'نعم'
    },
    metro_member: {
        en: 'Member',
        he: 'משתמש',
        ar: 'مستخدم'
    },
    please_choose_shipment_type: {
        en: 'Please choose a shipment type',
        he: 'אנא בחר צורת משלוח',
        ar: 'الرجاء اختيار نوع الشحنة'
    },
    or_search_on_map: {
        en: 'Or search on the map',
        he: 'או חפש על המפה',
        ar: 'أو ابحث على الخريطة'
    },
    location_description: {
        en: 'Location Description',
        he: 'תיאור מיקום',
        ar: 'وصف الموقع'
    },
    cant_be_free_and_have_a_price: {
        en: 'Cant be free and have a price',
        he: "לא יכול להיות בחינם ויש לו מחיר",
        ar: 'لا يمكن أن تكون حرة ولها ثمن'
    },
    sunday: {
        en: 'Sunday',
        he: 'יום ראשון',
        ar: 'يوم الاحد'
    },
    monday: {
        en: 'Monday',
        he: 'יום שני',
        ar: 'يوم الاثنين'
    },
    tuesday: {
        en: 'Tuesday',
        he: 'יום שלישי',
        ar: 'يوم الثلاثاء'
    },
    wednesday: {
        en: 'Wednesday',
        he: 'יום רבעי',
        ar: 'يوم الاربعاء'
    },
    thursday: {
        en: 'Thursday',
        he: 'יום חמישי',
        ar: 'يوم الخميس'
    },
    friday: {
        en: 'Friday',
        he: 'יום שישי',
        ar: 'يوم الجمعة'
    },
    saturday: {
        en: 'Saturday',
        he: 'יום שבת',
        ar: 'يوم السبت'
    },
    track_details: {
        en: 'Track Details',
        he: 'פרטי המסלול',
        ar: 'تفاصيل المسار'
    },
    business_details: {
        en: 'Business details',
        he: 'פרטי העסק',
        ar: 'تفاصيل العمل'
    },
    contact_information: {
        en: 'Contact information',
        he: 'פרטי איש הקשר',
        ar: 'معلومات التواصل'
    }
};

let { lang } = JSON.parse(localStorage.getItem('@@remember-mainRememberReducer'))

export default function term(name, default_val, lng = lang || 'he') {
    if (name === undefined) return ""
    let _name = camelToSnakeCase(name);
    return (_name in active_lexicon ? active_lexicon[_name][lng]
        : (default_val === undefined ? _name
            : default_val
        )
    )
}
