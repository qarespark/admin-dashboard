import { APISERVICE } from "services/restApiClient";

//create role in mysql_ (s_role)
export const createUpdateRole = (roleData: any) => {
    return new Promise((res, rej) => {
        APISERVICE.POST(`${process.env.REACT_APP_BASE_PCS_URL}/roles`, roleData).then((response) => {
            if (response) res(response.data);
            else res([])
            // console.log("response", response);
        }).catch(function (error) {
            rej(error);
            console.log("error", error);
        });
    })
}

//create staff in mysql_ (s_staff)
export const createUpdateStaff = (staffData: any) => {
    return new Promise((res, rej) => {
        APISERVICE.POST(`${process.env.REACT_APP_BASE_PCS_URL}/staffs`, staffData).then((response) => {
            if (response) res(response.data);
            else res([])
            // console.log("response", response);
        }).catch(function (error) {
            rej(error);
            console.log("error", error);
        });
    })
}

//create staff and role mapping in mysql_ (s_store_staff_role)
export const createUpdateStaffRoleMapping = (mappingData: any) => {
    return new Promise((res, rej) => {
        APISERVICE.POST(`${process.env.REACT_APP_BASE_PCS_URL}/ssroles`, mappingData).then((response) => {
            if (response) res(response.data);
            else res([])
            // console.log("response", response);
        }).catch(function (error) {
            rej(error);
            console.log("error", error);
        });
    })
}
//get all staff from mysql _ (s_staff)
export const getStaffbyTenantIdStoreId = (tenantId, storeId) => {
    return new Promise((res, rej) => {
        APISERVICE.GET(`${process.env.REACT_APP_BASE_PCS_URL}/staffs/${tenantId}/${storeId}`).then((response) => {
            if (response) res(response.data);
            else res([])
            // console.log("response", response);
        }).catch(function (error) {
            rej(error);
            console.log("error", error);
        });
    })
}