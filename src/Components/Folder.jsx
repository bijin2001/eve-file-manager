import React, { useState, useEffect } from 'react'
import '../App.css'
import Table from 'react-bootstrap/Table';
import { MdDone } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { deleteNameAPI, getAllFolderAPI, updateNameAPI } from '../Services/allAPI';



function Folder({ displayData, displayDate, setDeleteAllFiles}) {

    const [edit, setEdit] = useState(false)
    const [name, setName] = useState(displayData?.name || '');

    useEffect(() => {
        setName(displayData?.name || '');
    }, [displayData]);


    const folderclick = () => {
        setEdit(true)
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const folderDoubleClick = async(folderId)=>{

        try{
            // deleteNameAPI(displayData.id);
            // onDelete(displayData.id);
            const result = await deleteNameAPI(displayData.id)
            deleteNameAPI(result.data)
            setDeleteAllFiles(deleteNameAPI)

        }catch(error){
            console.log(error);
        }
    }


    const updateName = async ()=>{   

        try{

            const folderDetails = { name };
            await updateNameAPI(displayData.id, folderDetails);
            setEdit(false);
            displayData.name = name;
        }catch(error){
            console.log(error);
        }

    }

    const closeUpdation = () =>{
        setEdit(false);

    }

    return (

        <div className='container mt-3 ps-2'>
            {/* <div className='d-flex' >
                <button className='fbns w-100 py-3 ps-2' style={{ borderRadius: '10px' }}>
                    <button className='ps-2 fb1ns' style={{ color: "#5d5dff", marginLeft: '-12em', letterSpacing: '1px', backgroundColor: 'tranparent' }}>{displayData?.name}</button>
                    <span style={{ marginLeft: '11em', color: "#5d5dff", letterSpacing: '1px', backgroundColor: 'transparent' }}>{displayDate}</span>
                    <span style={{ marginLeft: '454px', color: "#5d5dff", letterSpacing: '1px', backgroundColor: 'transparent' }}>File</span>
                    <span style={{ marginLeft: '14em', color: "#5d5dff", letterSpacing: '1px', backgroundColor: 'transparent' }}>1kb</span>
                </button>
            </div> */}

            <Table className='borderless' striped size="sm">
                <tbody>
                    <tr onDoubleClick={folderDoubleClick}  className='mb-5 fb1ns py-3 px-3'>
                        {
                            edit ? (
                                <div className='d-flex' style={{width:'53px',padding:'0',margin:'0'}}>
                                    <input type="text" onChange={handleNameChange} className='px-2 py-2' style={{backgroundColor:'#212152',width:'11em',color:'rgb(108 108 238)'}}/>
                                    <button onClick={updateName} className='px-2 py-2' style={{ backgroundColor: '#205720b8', color: 'green', borderRadius: '5px' }}><MdDone style={{ backgroundColor: 'transparent' }} /></button>
                                    <button onClick={closeUpdation} className='px-2 py-2' style={{ backgroundColor: '#ff000073', color: 'red', borderRadius: '5px' }}><IoCloseSharp style={{ backgroundColor: 'transparent' }} /></button> 
                                </div>
                            )
                                :
                                <td onClick={folderclick}  className='fb1ns px-2 py-2' style={{ backgroundColor: 'transparent', color: 'rgb(108 108 238)',width:'22em' }}>{name}</td>
                        }
                        <td className='fb1ns px-2 py-2' style={{ backgroundColor: 'transparent', color: 'rgb(108 108 238)',width:'41em' }}>{displayDate}</td>
                        <td className='fb1ns px-2 py-2' style={{ backgroundColor: 'transparent', color: 'rgb(108 108 238)' }}>{displayData?.type}</td>
                    </tr>
                </tbody>
            </Table>
        </div>

    )
}

export default Folder