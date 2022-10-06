import { APISERVICE } from "services/restApiClient";

// get all businesstypes from mysql_ (s_business_type, s_keywords)
export const getAllBusinessTypes = () => {
    return new Promise((res, rej) => {
        APISERVICE.GET(`${process.env.REACT_APP_BASE_PCS_URL}/businesstype/keywords`).then((response) => {
            if (response) res(response.data);
            else res([])
        }).catch(function (error) {
            rej(error);
            console.log("error", error);
        });
    })
}

// get sms config from mysql_ (s_sms_config)
export const getSMSConfigByTenantId = (tenantId) => {
    return new Promise((res, rej) => {
        APISERVICE.GET(`${process.env.REACT_APP_BASE_PCS_URL}/smsconfigs/${tenantId}`).then((response) => {
            if (response) res(response.data);
            else res([])
            // console.log("response", response);
        }).catch(function (error) {
            rej(error);
            console.log("error", error);
        });
    })
}

// get payment config from mysql _ (s_payment_vendor_config)
export const getPaymentConfigByTenantAndStore = (tenantId, storeId) => {
    return new Promise((res, rej) => {
        APISERVICE.GET(`${process.env.REACT_APP_BASE_PCS_URL}/configs/paymentvendor/tenantstore/${tenantId}/${storeId}`).then((response) => {
            if (response) res(response.data);
            else res([])
            // console.log("response", response);
        }).catch(function (error) {
            rej(error);
            console.log("error", error);
        });
    })
}

// create sms config in mysql _ (s_sms_config)
export const createUpdateSMSConfig = (smsData: any) => {
    return new Promise((res, rej) => {
        APISERVICE.POST(`${process.env.REACT_APP_BASE_PCS_URL}/smsconfigs`, smsData).then((response) => {
            if (response) res(response.data);
            else res([])
            // console.log("response", response);
        }).catch(function (error) {
            rej(error);
            console.log("error", error);
        });
    })
}

// create payment config in mysql _ (s_payment_vendor_config)
export const createUpdatePaymentVendorConfig = (paymentVData: any) => {
    return new Promise((res, rej) => {
        APISERVICE.POST(`${process.env.REACT_APP_BASE_PCS_URL}/configs/paymentvendors`, paymentVData).then((response) => {
            if (response) res(response.data);
            else res([])
            // console.log("response", response);
        }).catch(function (error) {
            rej(error);
            console.log("error", error);
        });
    })
}

// //Upload Image API
export const uploadImage = (tenantId: any, imgFile: File, type: string) => {
    var formData: any = new FormData();
    formData.append("id", tenantId);
    formData.append("file", imgFile);
    formData.append("type", type);
    return new Promise((res, rej) => {
        APISERVICE.POST(`${process.env.REACT_APP_BASE_PCS_CATALOG_URL}/s3/uploadwithtype`, formData, { responseType: 'text' }).then((response) => {
            if (response) res(response.data);
            else res([])
            // console.log("response", response);
        }).catch(function (error) {
            rej(error);
            console.log("error", error);
        });
    })
}

//Upload Image API
export const uploadLogoToDB = (tenantId: any, imgFile: File, type: string) => {
    var formData: any = new FormData();
    formData.append("tenantid", tenantId);
    formData.append("file", imgFile);
    formData.append("type", type);
    return new Promise((res, rej) => {
        APISERVICE.POST(`${process.env.REACT_APP_BASE_PCS_CATALOG_URL}/s3/modifyLogoByTenant`, formData, { responseType: 'text' }).then((response) => {
            if (response) res(response.data);
            else res([])
            // console.log("response", response);
        }).catch(function (error) {
            rej(error);
            console.log("error", error);
        });
    })
}