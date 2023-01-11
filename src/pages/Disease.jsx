import React from 'react';
import ReactPaginate from "react-paginate";
import { useState, useEffect } from 'react';
import { Table, Tag } from 'antd';
import PopUp from '../components/PopUp';
import Spinner from 'react-bootstrap/Spinner';
import { getDisease } from '../Service/Service';
import './Disease.scss'
import CreateDisease from '../components/CreateDisease';

const Disease = () => {

    const [disease, setDisease] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [allDisease, setAllDisease] = useState([])
    const [pageCount, setpageCount] = useState();
    const [currentDisease, setCurrentDisease] = useState([])
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
            dataIndex: 'diseaseName',
            key: 'diseaseName',
            fixed: 'left'
        },
        {
            title: 'Description',
            width: 500,
            dataIndex: 'describe',
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 100,
            render: (record) => <div >
                <ul class="list-inline m-0">
                    <li class="list-inline-item">
                        <button class="btn btn-success btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Edit"  onClick={e=>editDisease(record)} ><i class="fa fa-edit"></i></button>
                    </li>
                    {/* <li class="list-inline-item">
                        <button class="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete" onClick={e=>removeDisease(record.id, record.diseaseName)} ><i class="fa fa-trash"></i></button>
                    </li> */}
                </ul>
                {/* <button className='btn-edit' onClick={e=>editDisease(record.id)} >dđ</button>&ensp;&ensp;
                <button className='btn-edit' onClick={e=>editDisease(record.id)} >dđ</button>&ensp;&ensp; */}
            </div>,
        },
    ]

    const editDisease = (record) => {
        setOpenPopupEdit(true)
        setDataForItem(record)
    }

    const data = [];
    useEffect(() => {
        fetchDisease()
    }, []);

    const fetchDisease = () => {
        getDisease()
            .then(res => {
                const arr = res.data
                emptyArray(data)
                arr.map((item, index) => {
                    const x = {
                        index: index + 1,
                        diseaseName: item.diseaseName,
                        describe: item.diseaseDescribe,
                        id: item.diseaseId
                    }
                    data.push(x);
                })
                setAllDisease(data)
                setCurrentDisease(data)
                setDisease(data.slice(0, 10))
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

    const searchDisease = (currentPage) => {
        var currentOffset = currentPage * 10 - 10
        var data = currentDisease.slice(currentOffset, currentOffset + 10)
        return data
    };

    const handlePageClick = (data) => {
        let currentPage = data.selected + 1
        const result = searchDisease(currentPage);
        setDisease(result)
    };

    const handleSearch = (event) => {
        var key = event.target.value.trim().toLowerCase()
        if (key !== "") {
            let disease = allDisease.filter(item => {
                let result = item.diseaseName.toLowerCase().includes(key)
                return result;
            })
            setCurrentDisease(disease)
            setDisease(disease.slice(0, 10))
            setpageCount(Math.ceil(disease.length / 10))
        }
        else {
            setCurrentDisease(allDisease)
            setDisease(allDisease.slice(0, 10))
            setpageCount(Math.ceil(allDisease.length / 10))
        }
    }
    if (isLoading) return <div className="spinner" ><Spinner animation="border" variant="primary" ></Spinner></div>;
    return (
        <>
            <h4>List of diseases</h4>
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
                        dataSource={disease}
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
                title="Edit Disease"
                openPopup={openPopupEdit}
                setOpenPopup={setOpenPopupEdit}
                handleReloadComponent={fetchDisease}
            >
                <CreateDisease data={dataForItem}></CreateDisease>
            </PopUp>
        </>
    );
};
export default Disease;