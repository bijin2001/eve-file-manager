import commonAPI from "./commonAPI";
import SERVER_URL from "./server_url";

export const newFolderAPI = async(fname)=>{
    return await commonAPI("POST", `${SERVER_URL}/newfolder`,fname)
}

export const getAllFolderAPI = async ()=>{
   return await commonAPI("GET",`${SERVER_URL}/newfolder`,"")
}

export const updateNameAPI = async (folderId,folderDetails)=>{
    return await commonAPI("PUT",`${SERVER_URL}/newfolder/${folderId}`,folderDetails)
 }

 export const deleteNameAPI = async (folderId)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/newfolder/${folderId}`)
 }

 export const getFolderContentsAPI = async (folderId) => {
    return await commonAPI("GET", `${SERVER_URL}/newfolder/${folderId}/contents`, "");
};
 
 
