export const msgDetails = {
    templateId: 1, //(string)
    media: 0, //size in kb (float)
    userId: 1, //(string)
    tenantId: 1, //(int)
    storeId: 1, //(int)
    createOn: new Date(), //(date obj)
    msgId: 123, //(string)
    charges: 1, //in rs (float)
    source: 1231231231, //source number - store number (string/bigint)
    selfWallet: false //false - msg send from respark wallet blns, true - msg send from personal wallet blns
}

export const gupshupClients = [
    {
        active: true,
        appName: 'devourinqa',
        appKey: 'hls4eyahadmusklz3oo4vgea8b5tmdsv',
        appNumber: 9766626934,
        registered: true, //is tenant register to gupshup messaging platform
        walletBlns: 100, //current wallet balns
        tenantId: '000', // for respark default entry
        tenantName: 'Respark', //current wallet balns
        storeId: '000',
        storeName: 'Respark', //current wallet balns
        transactionalMsg: { active: false, selfWallet: false },
        promotionalMsg: { active: false, selfWallet: false },
        logo: 'https://pcs-s3.s3.ap-south-1.amazonaws.com/4/sliders/2022-07-20T23%3A10%3A41.639490_slider.png', //current wallet balns
        chargePerMessage: 0.80, //charges per message in rs
        createdOn: new Date() //charges per message in rs
    }, {
        active: true,
        appName: 'devourinqa',
        appKey: 'hls4eyahadmusklz3oo4vgea8b5tmdsv',
        appNumber: 9766626934,
        registered: false, //is tenant register to gupshup messaging platform
        walletBlns: 100, //current wallet balns
        tenantId: 1,
        tenantName: 'Hana Jewellery', //current wallet balns
        storeId: 1,
        storeName: 'Pune', //current wallet balns
        transactionalMsg: { active: false, selfWallet: false },
        promotionalMsg: { active: false, selfWallet: false },
        logo: 'https://pcs-s3.s3.ap-south-1.amazonaws.com/4/sliders/2022-07-20T23%3A37%3A37.682259_slider.png', //current wallet balns
        chargePerMessage: 0.80, //charges per message in rs
        createdOn: new Date() //charges per message in rs
    }, {
        active: true,
        appName: 'devourinqa',
        appKey: 'hls4eyahadmusklz3oo4vgea8b5tmdsv',
        appNumber: 9766626934,
        registered: false, //is tenant register to gupshup messaging platform
        walletBlns: 100, //current wallet balns
        tenantId: 2,
        tenantName: 'Shakcya Salon', //current wallet balns
        storeId: 1,
        storeName: 'Kalyaninagar', //current wallet balns
        transactionalMsg: { active: false, selfWallet: false },
        promotionalMsg: { active: false, selfWallet: false },
        logo: 'https://pcs-s3.s3.ap-south-1.amazonaws.com/4/sliders/2022-07-20T23%3A46%3A26.201269_slider.png', //current wallet balns
        chargePerMessage: 0.80, //charges per message in rs
        createdOn: new Date() //charges per message in rs
    }, {
        active: true,
        appName: 'devourinqa',
        appKey: 'hls4eyahadmusklz3oo4vgea8b5tmdsv',
        appNumber: 9766626934,
        registered: false, //is tenant register to gupshup messaging platform
        walletBlns: 100, //current wallet balns
        tenantId: 3,
        tenantName: 'Little More Salon', //current wallet balns
        storeId: 1,
        storeName: 'Pune', //current wallet balns
        transactionalMsg: { active: false, selfWallet: false },
        promotionalMsg: { active: false, selfWallet: false },
        logo: 'https://pcs-s3.s3.ap-south-1.amazonaws.com/4/sliders/2022-07-20T23%3A44%3A25.425345_slider.png', //current wallet balns
        chargePerMessage: 0.80, //charges per message in rs
        createdOn: new Date() //charges per message in rs
    }, {
        active: true,
        appName: 'devourinqa',
        appKey: 'hls4eyahadmusklz3oo4vgea8b5tmdsv',
        appNumber: 9766626934,
        registered: false, //is tenant register to gupshup messaging platform
        walletBlns: 100, //current wallet balns
        tenantId: 4,
        tenantName: 'Jalak Jewellery', //current wallet balns
        storeId: 1,
        storeName: 'Balewadi', //current wallet balns
        transactionalMsg: { active: false, selfWallet: false },
        promotionalMsg: { active: false, selfWallet: false },
        logo: 'https://pcs-s3.s3.ap-south-1.amazonaws.com/4/sliders/2022-07-20T23%3A39%3A23.313028_slider.png', //current wallet balns
        chargePerMessage: 0.80, //charges per message in rs
        createdOn: new Date() //charges per message in rs
    }, {
        active: true,
        appName: 'devourinqa',
        appKey: 'hls4eyahadmusklz3oo4vgea8b5tmdsv',
        appNumber: 9766626934,
        registered: false, //is tenant register to gupshup messaging platform
        walletBlns: 100, //current wallet balns
        tenantId: 5,
        tenantName: 'New Style Salon', //current wallet balns
        storeId: 1,
        storeName: 'Pune', //current wallet balns
        transactionalMsg: { active: false, selfWallet: false },
        promotionalMsg: { active: false, selfWallet: false },
        logo: 'https://pcs-s3.s3.ap-south-1.amazonaws.com/4/sliders/2022-07-20T23%3A45%3A26.983705_slider.png', //current wallet balns
        chargePerMessage: 0.80, //charges per message in rs
        createdOn: new Date() //charges per message in rs
    }, {
        active: true,
        appName: 'devourinqa',
        appKey: 'hls4eyahadmusklz3oo4vgea8b5tmdsv',
        appNumber: 9766626934,
        registered: false, //is tenant register to gupshup messaging platform
        walletBlns: 100, //current wallet balns
        tenantId: 6,
        tenantName: 'Jannez Beauty Salon', //current wallet balns
        storeId: 1,
        storeName: 'Kalyaninagar', //current wallet balns
        transactionalMsg: { active: false, selfWallet: false },
        promotionalMsg: { active: false, selfWallet: false },
        logo: 'https://pcs-s3.s3.ap-south-1.amazonaws.com/4/sliders/2022-07-20T23%3A42%3A31.770687_slider.png', //current wallet balns
        chargePerMessage: 0.80, //charges per message in rs
        createdOn: new Date() //charges per message in rs
    }, {
        active: true,
        appName: 'devourinqa',
        appKey: 'hls4eyahadmusklz3oo4vgea8b5tmdsv',
        appNumber: 9766626934,
        registered: false, //is tenant register to gupshup messaging platform
        walletBlns: 100, //current wallet balns
        tenantId: 7,
        tenantName: 'Shakcya Salon', //current wallet balns
        storeId: 1,
        storeName: 'Wagholi', //current wallet balns
        transactionalMsg: { active: false, selfWallet: false },
        promotionalMsg: { active: false, selfWallet: false },
        logo: 'https://pcs-s3.s3.ap-south-1.amazonaws.com/4/sliders/2022-07-20T23%3A46%3A26.201269_slider.png', //current wallet balns
        chargePerMessage: 0.80, //charges per message in rs
        createdOn: new Date() //charges per message in rs
    }, {
        active: true,
        appName: 'devourinqa',
        appKey: 'hls4eyahadmusklz3oo4vgea8b5tmdsv',
        appNumber: 9766626934,
        registered: false, //is tenant register to gupshup messaging platform
        walletBlns: 100, //current wallet balns
        tenantId: 8,
        tenantName: 'Little More Salon', //current wallet balns
        storeId: 1,
        storeName: 'Pune', //current wallet balns
        transactionalMsg: { active: false, selfWallet: false },
        promotionalMsg: { active: false, selfWallet: false },
        logo: 'https://pcs-s3.s3.ap-south-1.amazonaws.com/4/sliders/2022-07-20T23%3A44%3A25.425345_slider.png', //current wallet balns
        chargePerMessage: 0.80, //charges per message in rs
        createdOn: new Date() //charges per message in rs
    }, {
        active: true,
        appName: 'devourinqa',
        appKey: 'hls4eyahadmusklz3oo4vgea8b5tmdsv',
        appNumber: 9766626934,
        registered: false, //is tenant register to gupshup messaging platform
        walletBlns: 100, //current wallet balns
        tenantId: 9,
        tenantName: 'Jalak Jewellery', //current wallet balns
        storeId: 1,
        storeName: 'Pune', //current wallet balns
        transactionalMsg: { active: false, selfWallet: false },
        promotionalMsg: { active: false, selfWallet: false },
        logo: 'https://pcs-s3.s3.ap-south-1.amazonaws.com/4/sliders/2022-07-20T23%3A39%3A23.313028_slider.png', //current wallet balns
        chargePerMessage: 0.80, //charges per message in rs
        createdOn: new Date() //charges per message in rs
    }, {
        active: true,
        appName: 'devourinqa',
        appKey: 'hls4eyahadmusklz3oo4vgea8b5tmdsv',
        appNumber: 9766626934,
        registered: false, //is tenant register to gupshup messaging platform
        walletBlns: 100, //current wallet balns
        tenantId: 10,
        tenantName: 'New Style Salon', //current wallet balns
        storeId: 1,
        storeName: 'Hadapsar', //current wallet balns
        transactionalMsg: { active: false, selfWallet: false },
        promotionalMsg: { active: false, selfWallet: false },
        logo: 'https://pcs-s3.s3.ap-south-1.amazonaws.com/4/sliders/2022-07-20T23%3A45%3A26.983705_slider.png', //current wallet balns
        chargePerMessage: 0.80, //charges per message in rs
        createdOn: new Date() //charges per message in rs
    }, {
        active: true,
        appName: 'devourinqa',
        appKey: 'hls4eyahadmusklz3oo4vgea8b5tmdsv',
        appNumber: 9766626934,
        registered: false, //is tenant register to gupshup messaging platform
        walletBlns: 100, //current wallet balns
        tenantId: 11,
        tenantName: 'Jannez Beauty Salon', //current wallet balns
        storeId: 1,
        storeName: 'Mumbai', //current wallet balns
        transactionalMsg: { active: false, selfWallet: false },
        promotionalMsg: { active: false, selfWallet: false },
        logo: 'https://pcs-s3.s3.ap-south-1.amazonaws.com/4/sliders/2022-07-20T23%3A42%3A31.770687_slider.png', //current wallet balns
        chargePerMessage: 0.80, //charges per message in rs
        createdOn: new Date() //charges per message in rs
    }]

export const gupshupRechargHistory = [
    {
        tenantId: '000',
        storeId: '000',
        amount: 1000,//newly added amount in rs
        prevBlns: 10,//balns at the time of recharge
        staffId: 1,
        createdOn: new Date(),
        paidVia: 'gpay',//
        resparkCredit: 12,//amount credited to respark account as per 0.66 rs per msg charges
    }, {
        tenantId: '000',
        storeId: '000',
        amount: 1000,//newly added amount in rs
        prevBlns: 10,//balns at the time of recharge
        staffId: 1,
        createdOn: new Date(),
        paidVia: 'gpay',//
        resparkCredit: 12,//amount credited to respark account as per 0.66 rs per msg charges
    }, {
        tenantId: '000',
        storeId: '000',
        amount: 1000,//newly added amount in rs
        prevBlns: 10,//balns at the time of recharge
        staffId: 1,
        createdOn: new Date(),
        paidVia: 'gpay',//
        resparkCredit: 12,//amount credited to respark account as per 0.66 rs per msg charges
    }, {
        tenantId: '000',
        storeId: '000',
        amount: 1000,//newly added amount in rs
        prevBlns: 10,//balns at the time of recharge
        staffId: 1,
        createdOn: new Date(),
        paidVia: 'gpay',//
        resparkCredit: 12,//amount credited to respark account as per 0.66 rs per msg charges
    }, {
        tenantId: '000',
        storeId: '000',
        amount: 1000,//newly added amount in rs
        prevBlns: 10,//balns at the time of recharge
        staffId: 1,
        createdOn: new Date(),
        paidVia: 'gpay',//
        resparkCredit: 12,//amount credited to respark account as per 0.66 rs per msg charges
    }, {
        tenantId: '000',
        storeId: '000',
        amount: 1000,//newly added amount in rs
        prevBlns: 10,//balns at the time of recharge
        staffId: 1,
        createdOn: new Date(),
        paidVia: 'gpay',//
        resparkCredit: 12,//amount credited to respark account as per 0.66 rs per msg charges
    }, {
        tenantId: 1,
        storeId: 1,
        amount: 100,//newly added amount in rs
        prevBlns: 10,//balns at the time of recharge
        staffId: 1,
        createdOn: new Date(),
        paidVia: 'gpay',//
        resparkCredit: 12,//amount credited to respark account as per 0.66 rs per msg charges
    }, {
        tenantId: 2,
        storeId: 1,
        amount: 200,//newly added amount in rs
        prevBlns: 10,//balns at the time of recharge
        staffId: 1,
        createdOn: new Date(),
        paidVia: 'gpay',//
        resparkCredit: 12,//amount credited to respark account as per 0.66 rs per msg charges
    }, {
        tenantId: 1,
        storeId: 2,
        amount: 300,//newly added amount in rs
        prevBlns: 10,//balns at the time of recharge
        staffId: 1,
        createdOn: new Date(),
        paidVia: 'gpay',//
        resparkCredit: 12,//amount credited to respark account as per 0.66 rs per msg charges
    }
]

export const tenantsList = [
    {
        name: 'Respark',
        id: '000',
    }, {
        name: 'Shakya',
        id: 1,
    }, {
        name: 'Jannez',
        id: 2,
    }
]

export const storesList = [
    {
        name: 'Store 1',
        id: 1,
        tenantId: 1
    }, {
        name: 'Store 2',
        id: 2,
        tenantId: 1
    }, {
        name: 'Store 3',
        id: 3,
        tenantId: 2
    }
]