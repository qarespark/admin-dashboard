import { APISERVICE } from "services/restApiClient";

//get all stores wrt tenant in mysql _ (s_tenant_store)
export const getStoresByTenantId = (tenantId) => {
    return new Promise((res, rej) => {
        APISERVICE.GET(`${process.env.REACT_APP_GET_STORES_BY_TENANT_ID}/${tenantId}`).then((response) => {
            if (response) res(response.data);
            else res([])
            // console.log("response", response);
        }).catch(function (error) {
            rej(error);
            console.log("error", error);
        });
    })
}

//create store in mysql _ (s_tenant_store)
export const createUpdateStore = (storeData: any) => {
    return new Promise((res, rej) => {
        APISERVICE.POST(`${process.env.REACT_APP_BASE_PCS_URL}/tenants/stores`, storeData).then((response) => {
            if (response) res(response.data);
            else res([])
            // console.log("response", response);
        }).catch(function (error) {
            rej(error);
            console.log("error", error);
        });
    })
}

//create store in mongo db _ (pcs-catalog.stores)
export const createUpdateStoreCatalog = (storeData: any) => {
    return new Promise((res, rej) => {
        APISERVICE.POST(`${process.env.REACT_APP_BASE_PCS_CATALOG_URL}/stores`, storeData).then((response) => {
            if (response) res(response.data);
            else res([])
            // console.log("response", response);
        }).catch(function (error) {
            rej(error);
            console.log("error", error);
        });
    })
}

//create store config in mongo db _ (pcs-catalog.sconfigs)
export const createUpdateStoreConfig = (configData: any) => {
    return new Promise((res, rej) => {
        APISERVICE.POST(`${process.env.REACT_APP_BASE_PCS_CATALOG_URL}/configs`, configData).then((response) => {
            if (response) res(response.data);
            else res([])
            // console.log("response", response);
        }).catch(function (error) {
            rej(error);
            console.log("error", error);
        });
    })
}

//create store config in mongo db _ (pcs-catalog.sconfigs)
export const createUpdateManifestConfig = (configData: any, docId: any) => {
    return new Promise((res, rej) => {
        APISERVICE.POST(`${process.env.REACT_APP_BASE_PCS_CATALOG_URL}/configs/storeconfig/manifestconfig/${docId}`, configData).then((response) => {
            if (response) res(response.data);
            else res([])
            // console.log("response", response);
        }).catch(function (error) {
            rej(error);
            console.log("error", error);
        });
    })
}

//create store licen details mysql _ (s_tenant_store_license)
export const createUpdateStoreLicense = (storeLicData: any) => {
    return new Promise((res, rej) => {
        APISERVICE.POST(`${process.env.REACT_APP_BASE_PCS_URL}/tenantlic`, storeLicData).then((response) => {
            if (response) res(response.data);
            else res([])
            // console.log("response", response);
        }).catch(function (error) {
            rej(error);
            console.log("error", error);
        });
    })
}

//get store config from mongo db _ (pcs-catalog.sconfigs)
export const getStoresConfigbyTenantIdStoreId = (tenantId, storeId) => {
    return new Promise((res, rej) => {
        APISERVICE.GET(`${process.env.REACT_APP_BASE_PCS_CATALOG_URL}/configs/tenant/${tenantId}/store/${storeId}`).then((response) => {
            if (response) res(response.data);
            else res([])
            // console.log("response", response);
        }).catch(function (error) {
            rej(error);
            console.log("error", error);
        });
    })
}