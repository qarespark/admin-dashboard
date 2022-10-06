const msgDetails = {
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

const gupshupConfig = [
    {
        active: true,
        tenantId: 000, // for respark default entry
        name: 'devourinqa',
        key: 'hls4eyahadmusklz3oo4vgea8b5tmdsv',
        number: 9766626934,
        registered: true, //is tenant register to gupshup messaging platform
        walletBlns: 100, //current wallet balns
        tenantName: 'Respark', //current wallet balns
        logo: 'https://i0.wp.com/respark.in/wp-content/uploads/2021/12/respark-logo-02.jpg?w=535&ssl=1', //current wallet balns
        chargePerMessage: 0.80, //charges per message in rs
        createdOn: new Date() //charges per message in rs
    }, {
        active: true,
        tenantId: 1,
        name: 'devourinqa',
        key: 'hls4eyahadmusklz3oo4vgea8b5tmdsv',
        number: 9766626934,
        registered: false, //is tenant register to gupshup messaging platform
        walletBlns: 100, //current wallet balns
        tenantName: 'Hana Jewellery', //current wallet balns
        logo: 'https://pcs-s3.s3.ap-south-1.amazonaws.com/25/sliders/2022-04-25T16%3A20%3A32.640171_slider.png', //current wallet balns
        chargePerMessage: 0.80, //charges per message in rs
        createdOn: new Date() //charges per message in rs
    }, {
        active: true,
        tenantId: 2,
        name: 'devourinqa',
        key: 'hls4eyahadmusklz3oo4vgea8b5tmdsv',
        number: 9766626934,
        registered: false, //is tenant register to gupshup messaging platform
        walletBlns: 100, //current wallet balns
        tenantName: 'Shakcya Salon', //current wallet balns
        logo: 'https://pcs-s3.s3.ap-south-1.amazonaws.com/4/sliders/2022-07-17T00%3A37%3A31.245836_slider.png', //current wallet balns
        chargePerMessage: 0.80, //charges per message in rs
        createdOn: new Date() //charges per message in rs
    }, {
        active: true,
        tenantId: 3,
        name: 'devourinqa',
        key: 'hls4eyahadmusklz3oo4vgea8b5tmdsv',
        number: 9766626934,
        registered: false, //is tenant register to gupshup messaging platform
        walletBlns: 100, //current wallet balns
        tenantName: 'Little More Salon', //current wallet balns
        logo: 'https://pcs-s3.s3.ap-south-1.amazonaws.com/38/sliders/2022-06-27T12%3A15%3A43.120339_slider.png', //current wallet balns
        chargePerMessage: 0.80, //charges per message in rs
        createdOn: new Date() //charges per message in rs
    }, {
        active: true,
        tenantId: 4,
        name: 'devourinqa',
        key: 'hls4eyahadmusklz3oo4vgea8b5tmdsv',
        number: 9766626934,
        registered: false, //is tenant register to gupshup messaging platform
        walletBlns: 100, //current wallet balns
        tenantName: 'Jalak Jewellery', //current wallet balns
        logo: 'https://pcs-s3.s3.ap-south-1.amazonaws.com/36/sliders/2022-06-16T12%3A39%3A18.090405_slider.png', //current wallet balns
        chargePerMessage: 0.80, //charges per message in rs
        createdOn: new Date() //charges per message in rs
    }, {
        active: true,
        tenantId: 5,
        name: 'devourinqa',
        key: 'hls4eyahadmusklz3oo4vgea8b5tmdsv',
        number: 9766626934,
        registered: false, //is tenant register to gupshup messaging platform
        walletBlns: 100, //current wallet balns
        tenantName: 'New Style Salon', //current wallet balns
        logo: 'https://pcs-s3.s3.ap-south-1.amazonaws.com/2/sliders/2022-06-07T16%3A01%3A45.990214_slider.png', //current wallet balns
        chargePerMessage: 0.80, //charges per message in rs
        createdOn: new Date() //charges per message in rs
    }, {
        active: true,
        tenantId: 6,
        name: 'devourinqa',
        key: 'hls4eyahadmusklz3oo4vgea8b5tmdsv',
        number: 9766626934,
        registered: false, //is tenant register to gupshup messaging platform
        walletBlns: 100, //current wallet balns
        tenantName: 'Jannez Beauty Salon', //current wallet balns
        logo: 'https://pcs-s3.s3.ap-south-1.amazonaws.com/20/sliders/2022-03-31T18%3A00%3A38.515438_slider.png', //current wallet balns
        chargePerMessage: 0.80, //charges per message in rs
        createdOn: new Date() //charges per message in rs
    }, {
        active: true,
        tenantId: 2,
        name: 'devourinqa',
        key: 'hls4eyahadmusklz3oo4vgea8b5tmdsv',
        number: 9766626934,
        registered: false, //is tenant register to gupshup messaging platform
        walletBlns: 100, //current wallet balns
        tenantName: 'Shakcya Salon', //current wallet balns
        logo: 'https://pcs-s3.s3.ap-south-1.amazonaws.com/4/sliders/2022-07-17T00%3A37%3A31.245836_slider.png', //current wallet balns
        chargePerMessage: 0.80, //charges per message in rs
        createdOn: new Date() //charges per message in rs
    }, {
        active: true,
        tenantId: 3,
        name: 'devourinqa',
        key: 'hls4eyahadmusklz3oo4vgea8b5tmdsv',
        number: 9766626934,
        registered: false, //is tenant register to gupshup messaging platform
        walletBlns: 100, //current wallet balns
        tenantName: 'Little More Salon', //current wallet balns
        logo: 'https://pcs-s3.s3.ap-south-1.amazonaws.com/38/sliders/2022-06-27T12%3A15%3A43.120339_slider.png', //current wallet balns
        chargePerMessage: 0.80, //charges per message in rs
        createdOn: new Date() //charges per message in rs
    }, {
        active: true,
        tenantId: 4,
        name: 'devourinqa',
        key: 'hls4eyahadmusklz3oo4vgea8b5tmdsv',
        number: 9766626934,
        registered: false, //is tenant register to gupshup messaging platform
        walletBlns: 100, //current wallet balns
        tenantName: 'Jalak Jewellery', //current wallet balns
        logo: 'https://pcs-s3.s3.ap-south-1.amazonaws.com/36/sliders/2022-06-16T12%3A39%3A18.090405_slider.png', //current wallet balns
        chargePerMessage: 0.80, //charges per message in rs
        createdOn: new Date() //charges per message in rs
    }, {
        active: true,
        tenantId: 5,
        name: 'devourinqa',
        key: 'hls4eyahadmusklz3oo4vgea8b5tmdsv',
        number: 9766626934,
        registered: false, //is tenant register to gupshup messaging platform
        walletBlns: 100, //current wallet balns
        tenantName: 'New Style Salon', //current wallet balns
        logo: 'https://pcs-s3.s3.ap-south-1.amazonaws.com/2/sliders/2022-06-07T16%3A01%3A45.990214_slider.png', //current wallet balns
        chargePerMessage: 0.80, //charges per message in rs
        createdOn: new Date() //charges per message in rs
    }, {
        active: true,
        tenantId: 6,
        name: 'devourinqa',
        key: 'hls4eyahadmusklz3oo4vgea8b5tmdsv',
        number: 9766626934,
        registered: false, //is tenant register to gupshup messaging platform
        walletBlns: 100, //current wallet balns
        tenantName: 'Jannez Beauty Salon', //current wallet balns
        logo: 'https://pcs-s3.s3.ap-south-1.amazonaws.com/20/sliders/2022-03-31T18%3A00%3A38.515438_slider.png', //current wallet balns
        chargePerMessage: 0.80, //charges per message in rs
        createdOn: new Date() //charges per message in rs
    }]

const gupshupRechargHistory = [
    {
        tenantId: 1,
        ammount: 100,//newly added amount in rs
        prevBlns: 10,//balns at the time of recharge
        staffId: 1,
        createdOn: new Date(),
        paidVia: 'gpay'//
    }
]
