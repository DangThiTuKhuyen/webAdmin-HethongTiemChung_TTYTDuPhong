import React from 'react';
import ReactPaginate from "react-paginate";
import { useState, useEffect } from 'react';
import { Table, Tag } from 'antd';
import PopUp from '../components/PopUp';
import Spinner from 'react-bootstrap/Spinner';
import { getVaccine, deleteVaccine } from '../Service/Service';
import './Vaccine.scss'
import CreateVaccine from '../components/CreateVaccine';
import { Delete } from '@material-ui/icons';

const Vaccine = () => {

    const [vaccine, setVaccine] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [allVaccine, setAllVaccine] = useState([])
    const [pageCount, setpageCount] = useState();
    const [currentVaccine, setCurrentVaccine] = useState([])
    const [openPopupEdit, setOpenPopupEdit] = useState(false);
    const [dataForItem, setDataForItem] = useState(null)
    const columns = [
        {
            title: "#",
            width: 30,
            dataIndex: 'index',
            fixed: 'left'
        },
        {
            title: 'Name',
            width: 200,
            dataIndex: 'name',
            key: 'name',
            fixed: 'left'
        },
        {
            title: 'Price',
            width: 200,
            dataIndex: 'price',
        },
        {
            title: 'Country',
            width: 200,
            dataIndex: 'country',
        },
        {
            title: 'Firm',
            width: 200,
            dataIndex: 'firm',
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 100,
            render: (record) => <div >
                <ul class="list-inline m-0">
                    <li class="list-inline-item">
                        <button class="btn btn-success btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Edit"  onClick={e=>editVaccine(record)} ><i class="fa fa-edit"></i></button>
                    </li>
                    <li class="list-inline-item">
                        <button class="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete" onClick={e=>removeVaccine(record.id, record.name)} ><i class="fa fa-trash"></i></button>
                    </li>
                </ul>
                {/* <button className='btn-edit' onClick={e=>editDisease(record.id)} >dđ</button>&ensp;&ensp;
                <button className='btn-edit' onClick={e=>editDisease(record.id)} >dđ</button>&ensp;&ensp; */}
            </div>,
        },
    ]

    const editVaccine = (record) => {
        setOpenPopupEdit(true)
        setDataForItem(record)
    }

    const removeVaccine = (id, name) => {
        if (window.confirm(`Are you sure you want to delete vaccine ${name}?`)) {
            deleteVaccine(id).then(res => alert(`Delete vaccine ${name} successfully`)) 
            fetchVaccine()
        }
    };
    const data = [];
    useEffect(() => {
        fetchVaccine()
    }, []);

    const fetchVaccine = () => {
        getVaccine()
            .then(res => {
                const arr = res.data
                emptyArray(data)
                arr.map((item, index) => {
                    const x = {
                        index: index + 1,
                        name: item.vaccineName,
                        price: item.vaccinePrice,
                        firm: item.vaccineFirm,
                        country: item.country,
                        id: item.vaccineId
                    }
                    data.push(x);
                })
                setAllVaccine(data)
                setCurrentVaccine(data)
                setVaccine(data.slice(0, 10))
                setpageCount(Math.ceil(data.length / 10))
                setIsLoading(false);
            })
            .catch(
                err => {
                    console.log(err)
                })
    }

    const emptyArray = (arr) => {
        arr.splice(0, arr.length)
    }

    const getVaccineCurrent = (currentPage) => {
        var currentOffset = currentPage * 10 - 10
        var data = currentVaccine.slice(currentOffset, currentOffset + 10)
        return data
    };

    const handlePageClick = (data) => {
        let currentPage = data.selected + 1
        const result = getVaccineCurrent(currentPage);
        setVaccine(result)
    };

    const handleSearch = (event) => {
        var key = event.target.value.trim().toLowerCase()
        if (key !== "") {
            let vaccine = allVaccine.filter(item => {
                let result = item.name.toLowerCase().includes(key) || item.country.toLowerCase().includes(key) || item.firm.toLowerCase().includes(key)
                return result;
            })
            setCurrentVaccine(vaccine)
            setVaccine(vaccine.slice(0, 10))
            setpageCount(Math.ceil(vaccine.length / 10))
        }
        else {
            setCurrentVaccine(allVaccine)
            setVaccine(allVaccine.slice(0, 10))
            setpageCount(Math.ceil(allVaccine.length / 10))
        }
    }
    if (isLoading) return <div className="spinner" ><Spinner animation="border" variant="primary" ></Spinner></div>;
    return (
        <>
            <h4>List of vaccines</h4>
            <div className="container">
                <div className='content-customer'>
                    <div className="content-search">
                        <div class="row row-cols-2">
                            <div class="col">
                            </div>
                            <div class="col">
                                <div>
                                    <input type="text" placeholder='Search...' className="search" onKeyPress={handleSearch}></input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Table
                        columns={columns}
                        dataSource={vaccine}
                        pagination={false}
                        scroll={{ x: 'max-content' }}
                    >
                    </Table>
                    <div className='paginate'>
                        <ReactPaginate
                            previousLabel={'previous'}
                            nextLabel={'next'}
                            breakLabel={'...'}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={3}
                            onPageChange={handlePageClick}
                            containerClassName={'pagination justify-content-center'}
                            pageClassName={'page-item'}
                            pageLinkClassName={'page-link'}
                            previousClassName={'page-item'}
                            previousLinkClassName={'page-link'}
                            nextClassName={'page-item'}
                            nextLinkClassName={'page-link'}
                            breakClassName={'page-item'}
                            breakLinkClassName={'page-link'}
                            activeClassName={'active'}
                        > </ReactPaginate>
                    </div>

                </div>
            </div>
            <PopUp
            maxWidth="100" maxHeight="auto"
                title="Edit Vaccine"
                openPopup={openPopupEdit}
                setOpenPopup={setOpenPopupEdit}
                handleReloadComponent={fetchVaccine}
               
            >
                <CreateVaccine data={dataForItem}></CreateVaccine>
            </PopUp>
        </>
    );
};
export default Vaccine;