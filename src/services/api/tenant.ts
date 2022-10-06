import { APISERVICE } from "services/restApiClient";

//get all tenants list from mysql _ (s_tenant)
export const getAllTenants = () => {
    return new Promise((res, rej) => {
        APISERVICE.GET(`${process.env.REACT_APP_BASE_PCS_URL}/tenants`).then((response) => {
            if (response) res(response.data);
            else res([])
            // console.log("response", response);
        }).catch(function (error) {
            rej(error);
            console.log("error", error);
        });
    })
}

//create tenant in mysql _ (s_tenant)
export const createUpdateTenant = (tenantData: any) => {
    return new Promise((res, rej) => {
        APISERVICE.POST(`${process.env.REACT_APP_BASE_PCS_URL}/tenants`, tenantData).then((response) => {
            if (response) res(response.data);
            else res([])
            // console.log("response", response);
        }).catch(function (error) {
            rej(error);
            console.log("error", error);
        });
    })
}
