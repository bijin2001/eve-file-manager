import React, { useEffect, useState } from 'react'
import Folder from './Folder'
import { getAllFolderAPI, getFolderContentsAPI } from '../Services/allAPI'

function View({displayDate,addFileResponse,onFolderData}) {
  const [getAllFiles, setGetAllFiles] = useState([])
  const [deleteAllFiles,setDeleteAllFiles]=useState("")

  useEffect(() => {
    getAllFolders()
  }, [addFileResponse,deleteAllFiles])

  const getAllFolders = async (folderId = null) => {
    try {

      const result = folderId ? await getFolderContentsAPI(folderId) : await getAllFolderAPI()
      console.log(result);
      if (result.status >= 200 && result.status < 300) {

        setGetAllFiles(result.data)
      }
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <div>
      {
        getAllFiles?.length > 0 ?
          getAllFiles?.map(fname => (
            <div key={fname?.id}>
              <Folder displayData={fname} displayDate={displayDate} setDeleteAllFiles={setDeleteAllFiles} onFolderData={onFolderData}/>

            </div>))
          :
          <div className='text-center mt-3'>
            <h5 className='mt-5' style={{color:'#2b2b6c'}}>Folders is Empty</h5>
          </div>
      }

    </div>
  )
}

export default View