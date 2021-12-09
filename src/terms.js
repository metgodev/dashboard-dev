import { useSelector } from "react-redux"

// local terms until remote config available
const active_lexicon = {
    language: {
        en: 'Language',
        he: 'שפה',
        ar: 'يا الهي',
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
        ar: 'سطح المكتب',
    },
    weekly: {
        en: 'Weekly',
        he: 'שבועי',
        ar: 'سطح المكتب',
    },
    monthly: {
        en: 'Monthly',
        he: 'חודשי',
        ar: 'سطح المكتب',
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
}

let { lang } = JSON.parse(localStorage.getItem('@@remember-mainRememberReducer'))

export default function term(name, default_val, lng = lang || 'he') {
    return (name in active_lexicon ? active_lexicon[name][lng]
        : (default_val === undefined ? name
            : default_val
        )
    )
}
