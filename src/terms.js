import { useSelector } from "react-redux"

// local terms until remote config available
const active_lexicon = {
    language: {
        en: 'Language',
        he: 'שפה',
        ar: 'يا الهي',
    },
    dashboard: {
        en: 'Dashboard',
        he: 'לוח הבקרה',
        ar: 'لوحة التحكم',
    },
    metro_travel: {
        en: 'Metro Travel',
        he: 'מטרו נגב',
        ar: 'مترو ترافيل',
    },
    new_messages: {
        en: 'New Messages',
        he: 'הודעות חדשות',
        ar: 'مشاركات جديدة',
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
    edit: {
        en: 'Edit',
        he: 'ערוך',
        ar: 'تعديل',
    },
    copy: {
        en: 'Copy',
        he: 'העתק',
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
    views: {
        en: 'Views',
        he: 'צפיות',
        ar: 'الآراء',
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
    something_went_wrong: {
        en: 'Something is wrong with your login or password :(',
        he: 'שם משתמש או סיסמא לא נכונים :(',
        ar: 'اسم المستخدم او الرقم السري غير صحيح :(',
    },
    email_address: {
        en: 'Email address',
        he: 'כתובת אימייל',
        ar: 'عنوان البريد الإلكتروني',
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
    points: {
        en: 'Points of interest',
        he: 'נקודות עניין',
        ar: 'النقاط المثيرة للاهتمام',
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
        en: 'Metro Voucher',
        he: 'תו הנגב',
        ar: 'قسيمة مترو',
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
}


let { lang } = JSON.parse(localStorage.getItem('@@remember-mainRememberReducer'))

export default function term(name, default_val, lng = lang || 'he') {
    return (name in active_lexicon ? active_lexicon[name][lng]
        : (default_val === undefined ? name
            : default_val
        )
    )
}
