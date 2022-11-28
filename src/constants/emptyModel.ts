export const emptyOriginalData = {
    tenantDetails: {},
    storeDetails: {},
    staffDetails: {},
    storeConfigurations: {},
    smsConfigurations: {},
    paymentConfigurations: {},
}

export const emptyTenantObj = {
    "name": '',
    "subDomain": '',
    "description": '',
    "gstn": '',
    "email": '',
    "phone": '',
    "phone1": '',
    "aboutUs": '',
    "address": '',
    "area": '',
    "city": '',
    "pincode": '',
    "state": '',
    "country": '',
    "validTill": '',
    "createdOn": new Date(),
    "modifiedOn": new Date(),
    "active": true,
    "logoPath": '',
    "businessTypeId": '',
    "terminate": 0,
    "terminatedOn": null,

}

export const emptyStoreObj = {
    "aboutUs": '',
    "active": true,
    "address": '',
    "area": '',
    "city": '',
    "country": '',
    "createdOn": new Date(),
    "description": '',
    "email": '',
    "googleMapUrl": '',
    "gstn": '',
    "latitude": '',
    "logoPath": '',
    "longitude": '',
    "modifiedOn": new Date(),
    "name": '',
    "optInForWapp": false,
    "phone": '',
    "phone1": '',
    "pincode": '',
    "sUrl": '',
    "state": '',
    "tenantId": 0,
    "terminate": 0,
    "terminatedOn": '',
    "validTill": ''

}

export const emptySToreCatalogObj = {
    "tenant": "",
    "tenantId": 0,
    "store": "",
    "storeId": 0,
    "active": true,
    "curatedGroups": [],
    "categories": [],
    "sliders": [],
    "animationKey": null
}

export const emptyLicenseObj = {
    "tenantId": '',
    "storeId": '',
    "key": '',
    "validTill": '',
    "allStores": 0,
    "active": 1
}

export const emptyRoleObj = {
    "name": "Superadmin",
    "description": "Superadmin",
    "index": 0,
    "value": 1,//role index wrt tenant
    "active": "1",
    "tenantId": 0
}

export const emptyStaffObj = {
    "firstName": '',
    "lastName": '',
    "username": '',
    "pwd": '',
    "email": '',
    "mobile": '',
    "phone": '',
    "gender": '',
    "address": '',
    "tenantId": '',
    "active": true,
    "birthday": '',
    "speciality": '',
    "passcode": '',
    "experience": '',
    "description": '',
    "profileImage": ''
}

export const emptyStaffRoleObj = {
    "storeId": 0,
    "tenantId": 0,
    "roleId": 0,
    "staffId": 0,
    "active": 1
}

export const emptyConfigObj = {
    "store": "",
    "tenant": "",
    "storeId": 0,
    "tenantId": 0,
    "minOrderValue": 0.0,
    "startTime": "06:00",
    "closureTime": "22:00",
    "weeklyOff": "",
    "orderingOn": false,
    "deliveryOn": false,
    "preOrdering": false,
    "recieveOnlinePayment": false,
    "cod": false,
    "genderConfig": "both",
    "showServicesPdp": false,
    "readOnlyMenu": false,
    "socialLinks": [
        {
            "name": "instagram",
            "url": '',
            "index": 1,
            "iconPath": null,
            "active": false
        }, {
            "name": "facebook",
            "url": '',
            "index": 2,
            "iconPath": null,
            "active": false
        }, {
            "name": "whatsapp",
            "url": '',
            "index": 1,
            "iconPath": null,
            "active": false
        },
        {
            "name": "youtube",
            "url": '',
            "index": 2,
            "iconPath": null,
            "active": false
        },
        {
            "name": "google",
            "url": '',
            "index": 2,
            "iconPath": null,
            "active": false
        }
    ],
    "deliveryDisclaimer": "Your order will be delivered within 24 hours. Delivery details will be communicated shortly.",
    "pickupDisclaimer": "Your item is ready for pickup, kindly collect it from frontdesk.",
    "pickupOn": false,
    "txchConfig": [],
    "genericImages": {
        "footerBg": [],
        "loginScreenBg": [],
        "appBg": [],
        "hamburgerBg": []
    },
    "showProductCategoryGridView": false,
    "currencySymbol": '₹',
    "showStoreLocator": false,
    "storeConfig": {
        "gupshupConfig": {
            "active": false,
            "name": "devourinqa",
            "key": "hls4eyahadmusklz3oo4vgea8b5tmdsv",
            "number": "9766626934"
        },
        "basicConfig": {
            "products": true,
            "services": true,
            "pos": true,
            "appointment": true,
            "backoffice": true,
            "crm": true,
            "settings": true,
            "reports": true,
            "feedback": true,
            "inventory": false
        },
        "settingsConfig": {
            "taxes": false
        },
        "appointmentConfig": {
            "active": false,
            "smsForAppointments": false,
            "reminderBeforeDays": "1",
            "reminderBeforeHrs": "1",
            "showExpertAsSalon": false
        },
        "feedbackConfig": {
            "active": true,
            "entities": "experts,store",
            "feedbackUrl": null,
            "smsOn": true,
            "emailOn": false,
            "typeList": [
                {
                    "name": "Service Quality",
                    "index": 1,
                    "description": "gsfgs",
                    "entity": "expert",
                    "canComment": false,
                    "optional": true,
                    "mandatory": true,
                    "active": true,
                    "typeOptions": [
                        {
                            "name": "Poor",
                            "value": 1,
                            "index": 1,
                            "active": true
                        },
                        {
                            "name": "Below Average",
                            "value": 2,
                            "index": 2,
                            "active": true
                        },
                        {
                            "name": "Average",
                            "value": 3,
                            "index": 3,
                            "active": true
                        },
                        {
                            "name": "Good",
                            "value": 4,
                            "index": 4,
                            "active": true
                        },
                        {
                            "name": "Excellent",
                            "value": 5,
                            "index": 5,
                            "active": true
                        }
                    ]
                },
                {
                    "name": "Social Etiquette",
                    "index": 2,
                    "description": "gsfgs",
                    "entity": "expert",
                    "canComment": false,
                    "optional": true,
                    "mandatory": true,
                    "active": true,
                    "typeOptions": [
                        {
                            "name": "Poor",
                            "value": 1,
                            "index": 1,
                            "active": true
                        },
                        {
                            "name": "Below Average",
                            "value": 2,
                            "index": 2,
                            "active": true
                        },
                        {
                            "name": "Average",
                            "value": 3,
                            "index": 3,
                            "active": true
                        },
                        {
                            "name": "Good",
                            "value": 4,
                            "index": 4,
                            "active": true
                        },
                        {
                            "name": "Excellent",
                            "value": 5,
                            "index": 5,
                            "active": true
                        }
                    ]
                },
                {
                    "name": "Personal Hygiene",
                    "index": 3,
                    "description": "gsfgs",
                    "entity": "expert",
                    "canComment": false,
                    "optional": true,
                    "mandatory": true,
                    "active": true,
                    "typeOptions": [
                        {
                            "name": "Poor",
                            "value": 1,
                            "index": 1,
                            "active": true
                        },
                        {
                            "name": "Below Average",
                            "value": 2,
                            "index": 2,
                            "active": true
                        },
                        {
                            "name": "Average",
                            "value": 3,
                            "index": 3,
                            "active": true
                        },
                        {
                            "name": "Good",
                            "value": 4,
                            "index": 4,
                            "active": true
                        },
                        {
                            "name": "Excellent",
                            "value": 5,
                            "index": 5,
                            "active": true
                        }
                    ]
                },
                {
                    "name": "Remark",
                    "index": 4,
                    "description": "gsfgs",
                    "entity": "store",
                    "canComment": true,
                    "optional": false,
                    "mandatory": false,
                    "active": true,
                    "typeOptions": []
                }
            ]
        },
        "sparkConfig": {
            "fontStyle": "poppins-regular",
            "color": {
                "female": "#dcb533",
                "male": "#4088f4"
            },
            "userConfig": {
                "userRegPopupReq": false,
                "userRegMandatory": false,
                "showEmail": false,
                "showDob": false,
                "showAddress": false,
                "showAnniversaryDate": false,
                "showGender": false,
                "emailMandatory": false,
                "genderSelectionMandatory": false,
                "popupHeading": "We will use your information to send offers and promotions",
                "addressMandatory": false,
                "areaMandatory": false,
                "cityMandatory": false,
            },
            "quoteRequest": "false",
            "filterConfig": {
                "service": {
                    "active": false,
                    "priceRange": false,
                    "sortingConfig": {
                        "active": false,
                        "highPrice": false,
                        "lowPrice": false,
                        "discount": false,
                        "latest": false,
                        "oldest": false
                    }
                },
                "product": {
                    "active": false,
                    "priceRange": false,
                    "sortingConfig": {
                        "active": false,
                        "highPrice": false,
                        "lowPrice": false,
                        "discount": false,
                        "latest": false,
                        "oldest": false
                    }
                }
            }
        },
        "discountConfig": {
            "active": false,
            "maxFixDiscount": "",
            "maxPerDiscount": ""
        },
        "storeLocations": [],
        "accessControl": [
            {
                "active": false,
                "id": 1,
                "uiComponent": "appointment",
                "uiName": "Appointment",
                "bitValue": 1,
                "activeValue": false
            },
            {
                "active": false,
                "id": 2,
                "uiComponent": "backoffice",
                "uiName": "Backoffice",
                "bitValue": 1,
                "activeValue": false
            },
            {
                "active": false,
                "id": 3,
                "uiComponent": "crm",
                "uiName": "CRM",
                "bitValue": 1,
                "activeValue": false
            },
            {
                "active": false,
                "id": 4,
                "uiComponent": "settings",
                "uiName": "Settings",
                "bitValue": 11,
                "activeValue": false
            },
            {
                "active": false,
                "id": 5,
                "uiComponent": "pos",
                "uiName": "POS",
                "bitValue": 1,
                "activeValue": false
            },
            {
                "active": false,
                "id": 6,
                "uiComponent": "reports",
                "uiName": "Reports",
                "bitValue": 1,
                "activeValue": false
            },
            {
                "active": 1,
                "id": 7,
                "uiComponent": "staff_mgt",
                "uiName": "Staff Management",
                "bitValue": 1,
                "activeValue": false
            },
            {
                "active": 1,
                "id": 8,
                "uiComponent": "access_control",
                "uiName": "Access Control",
                "bitValue": 1,
                "activeValue": false
            }
        ]
    },
    "productListHeading": null,
    "serviceListHeading": null,
    "showProductPdp": false
}

export const emptySMSconfigObj = {
    "url": "https://www.smsgatewayhub.com/api/mt/SendSMS?",
    "user": "innobliss",
    "pwd": "877017",
    "apiKey": "444112a8-f58f-478c-8d80-9459470bcae1",
    "senderId": "DEVOUR",
    "params": "channel={channel}&DCS=0&flashsms=0&number={number}&text={message}&route=1",
    "promotionalParam": null,
    "userPromotional": null,
    "pwdPromotional": null,
    "tenantId": 0
}

export const emptyPaymentConfigObj = {
    "name": "Razorpay",
    "url": "https://checkout.razorpay.com/v1/checkout.js",
    "key": "rzp_test_X1SB9etHtwdNjb",
    "secrete": "fA2tGrhSflOQP8gV4hE4F6CK",
    "redirectUrl": "https://go-salon.godirekt.in:8084/pcs-txn/v1/orders/rzr/redirectrazorpay",
    "redirect2Website": "http://go-salon.godirekt.in/house-of-bumble-2/kalyaninagar/orderconfirmation",
    "statusUrl": "https://api.razorpay.com/v1/orders",
    "selfAccount": null,
    "merchantAccount": null,
    "merchantRoute": false,
    "tenantId": 0,
    "storeId": 0,
    "index": 1,
    "active": true
}

export const emptyGenericImages = {
    "appBg": {
        title: 'App Background',
        key: 'appBg'
    },
    // "footerBg": {
    //     title: 'Footer Background',
    //     key: 'footerBg'
    // },
    // "loginScreenBg": {
    //     title: 'Login Screen Background',
    //     key: 'loginScreenBg'
    // },
    // "hamburgerBg": {
    //     title: 'Hamburger Background',
    //     key: 'hamburgerBg'
    // }
}

export const emptyManifestConfig = {
    "theme_color": "#f635eb",
    "background_color": "#f69435",
    "display": "standalone",
    "scope": "/",
    "start_url": "/",
    "name": "Respark",
    "short_name": "Respark",
    "description": "Respark",
    "icons": {
        "180": "https://pcs-s3.s3.ap-south-1.amazonaws.com/2/logo/2022-09-16T03%3A08%3A37.337673_slider.png",
        "192": "https://pcs-s3.s3.ap-south-1.amazonaws.com/2/logo/2022-09-16T03%3A10%3A15.173636_slider.png",
        "384": "https://pcs-s3.s3.ap-south-1.amazonaws.com/2/logo/2022-09-16T03%3A10%3A58.996994_slider.png",
        "512": "https://pcs-s3.s3.ap-south-1.amazonaws.com/2/logo/2022-09-16T03%3A11%3A31.918804_slider.png",
        "1024": "https://pcs-s3.s3.ap-south-1.amazonaws.com/2/logo/2022-09-16T03%3A12%3A02.249969_slider.png"
    }
}