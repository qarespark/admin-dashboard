import CARD_ICON from 'assets/icons/paymentType/card.png';
import CASH_ICON from 'assets/icons/paymentType/cash.png';
import GPAY_ICON from 'assets/icons/paymentType/gpay.png';
import PHONEPAY_ICON from 'assets/icons/paymentType/phonepay.png';

export const UPDATE_LOADER_STATUS = 'UPDATE_LOADER_STATUS';

export const UPDATE_GENDER_STATUS = 'UPDATE_GENDER_STATUS';

export const UPDATE_GENERIC_IMAGES = 'UPDATE_GENERIC_IMAGES';

export const UPDATE_WHATSAPP_TEMPLATES = 'UPDATE_WHATSAPP_TEMPLATES';

export const UPDATE_CURRENT_PAGE = 'UPDATE_CURRENT_PAGE';
export const UPDATE_BUSINESS_TYPES = 'UPDATE_BUSINESS_TYPES';

export const UPDATE_PDP_ITEM = 'UPDATE_PDP_ITEM';
export const UPDATE_PDP_ITEM_STATUS = 'UPDATE_PDP_ITEM_STATUS';

export const UPDATE_SEARCH_STATUS = 'UPDATE_SEARCH_STATUS';

export const UPDATE_ERROR_STATUS = 'UPDATE_ERROR_STATUS';

export const GENERIC_IMAGE_APP_KEY = 'appBg';
export const GENERIC_IMAGE_FOOTER_KEY = 'footerBg';
export const GENERIC_IMAGE_LOGIN_SCREEN_KEY = 'loginScreenBg';
export const GENERIC_IMAGE_HAMBURGER_KEY = 'hamburgerBg';
export const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
export const SYNC_COOKIE_USER_DATA = 'SYNC_COOKIE_USER_DATA';
export const BACKGROUND_COLORS = ['#F7DBF07D', '#2196f3307D', '#FFDCDC7D', '#F7E8F67D', '#FAFCC27D', '#F7FBFC7D', '#E8DCD57D', '#F8E1F47D', '#D5D6EA7D', '#D7ECD97D', '#EAE4D27D']

export const PAYMENT_TYPES = [
    {
        name: 'Cash',
        img: CASH_ICON,
        active: true,
        payment: 0
    }, {
        name: 'Card',
        img: CARD_ICON,
        active: true,
        payment: 0
    }, {
        name: 'Phone Pay',
        img: PHONEPAY_ICON,
        active: true,
        payment: 0
    }, {
        name: 'GPay',
        img: GPAY_ICON,
        active: true,
        payment: 0
    }
]

