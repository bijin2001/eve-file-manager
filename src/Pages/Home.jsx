import React, { useState, useEffect } from 'react'
import logo from '../assets/logo.png'
import { Navbar, Container, Breadcrumb, Table, Modal, Button, Dropdown } from 'react-bootstrap'
import Folder from '../Components/Folder'
import '../App.css'
import View from '../Components/View'
import { newFolderAPI } from '../Services/allAPI'
import { MdDone } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";



function Home() {
    const [addFile, setAddFile] = useState({ name: '', date: '', type: '', size: '' })
    const [addFileResponse, setAddFileResponse] = useState("")
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [displayDate, setDisplayDate] = useState('')

    useEffect(() => {
        const today = new Date();
        const thisDay = today.toLocaleDateString('en-US');
        setDisplayDate(thisDay);
    }, []);


    const add = async () => {

        setAddFile({ name: '', date: '', type: '' });
        handleClose(true)

        const { name, date: displayDate, type, size } = addFile
        try {

            const result = await newFolderAPI(addFile)
            setAddFileResponse(result.data)
            console.log(result);
        } catch (err) {

            console.log(err);
        }
    }

    const handleDropdownSelect = (e) => {
        setAddFile({ ...addFile, type: e });
    };

    console.log();
    return (
        <div>
            <Navbar>
                <Container>
                    <Navbar.Brand href="#home" style={{ color: '#1f80e0' }}>
                        <img alt="" src={logo} width="150" height="100" className="d-inline-block align-top" />{' '}
                    </Navbar.Brand>
                </Container>
            </Navbar>

            <div className='container d-flex justify-content-between' style={{ border: '0.5px solid #1f7fe07f' }}>
                <div className='d-flex align-items-center pt-3 ps-2'>
                    <Breadcrumb>
                        <Breadcrumb.Item href="#"></Breadcrumb.Item>
                        <Breadcrumb.Item href=''>
                            
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className='pt-2 ps-3'>
                    <button className='btn' onClick={handleShow} style={{ backgroundColor: '#3838f0', fontWeight: '700' }}>+</button>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Body className='d-flex' style={{ gap: '8px' }}>
                            <input type="text" onChange={(e) => { setAddFile({ ...addFile, name: e.target.value }) }} className='form-control' placeholder='Folder Name' />
                            <select name="type" className='form-control' id="status"  onChange={e =>setAddFile({...addFile,type:e.target.value})}>
                                <option style={{backgroundColor:'white'}} value="" selected='disabled'>Purpose</option>
                                <option style={{backgroundColor:'white'}} value="Office">Office</option>
                                <option style={{backgroundColor:'white'}} value="Personal">Personal</option>
                            </select>
                            <button onClick={add} style={{ backgroundColor: '#205720b8', color: 'green', borderRadius: '5px' }}><MdDone style={{ backgroundColor: 'transparent' }} /></button>
                            <button onClick={handleClose} style={{ backgroundColor: '#ff000073', color: 'red', borderRadius: '5px' }}><IoCloseSharp style={{ backgroundColor: 'transparent' }} /></button>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
            <div>
                <div className='container mt-5'>
                    <div className='text-center my-5'>
                        <h5 style={{color:'#2b2b6c'}}>Double Click For The Folder Deletion</h5>
                    </div>
                    <Table className='table-primary'>
                        <thead >
                            <tr>
                                <th style={{ backgroundColor: 'transparent', color: 'rgb(108 108 238)', width: '11em' }}>Name</th>
                                <th style={{ backgroundColor: 'transparent', color: 'rgb(108 108 238)', width: '20em' }}>Date Modified</th>
                                <th style={{ backgroundColor: 'transparent', color: 'rgb(108 108 238)', width: '9em' }}>Purpose</th>
                            </tr>
                        </thead>
                    </Table>

                    <View displayDate={displayDate} addFileResponse={addFileResponse} />

                </div>
            </div>
        </div>
    )
}

export default Home