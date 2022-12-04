import React from 'react';
import ReactPaginate from "react-paginate";
import { useState, useEffect } from 'react';
import { Input, Table } from 'antd';
import './Histories.scss'
import {
    FaSearch
} from "react-icons/fa";
import { getHistoryVaccination, updateStatusRegistration } from '../Service/Service';
import Spinner from 'react-bootstrap/Spinner';
import moment from "moment";


const Histories = () => {

    const [histories, setHistories] = useState(null)

    const [pageCount, setpageCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshData, setRefreshData] = useState(false);
    // const [choose, setChoose] = useState("All");
    const [arr, setArr] = useState(null)
    const data = []

    useEffect(() => {
        fetchHistory()
        console.log("refresh")
    }, [refreshData]);

    const columns = [
        {
            title: '#',
            width: 30,
            dataIndex: 'index',
            fixed: 'left',
        },
        {
            title: 'Name',
            width: 100,
            dataIndex: 'userName',
            fixed: 'left',
        },
        {
            title: 'Phone number',
            width: 80,
            dataIndex: 'phone',
            fixed: '',
        },
        {
            title: 'Email',
            width: 80,
            dataIndex: 'phone',
            fixed: '',
        },
        {
            title: 'Disease',
            dataIndex: 'disease',
            width: 90,
            key: '1',
        },
        {
            title: 'Vaccine',
            width: 90,
            dataIndex: 'vaccine',
            key: '2',
        },
        {
            title: 'Dose',
            width: 30,
            dataIndex: 'dose',
            key: '3',
        },
        {
            title: 'Date',
            width: 60,
            dataIndex: 'date',
            key: '4',
        },
        {
            title: 'Medical center',
            width: 90,
            dataIndex: 'medicalCenter',
            key: '5',
        }
    ]

    const fetchHistory = () => {
        getHistoryVaccination(getRealTime())
            .then(res => {
                const arr = res.data.reverse()
                emptyArray(data)
                console.log(data)
                arr.map((item, index) => {
                    const x = {
                        index: index + 1,
                        id: item.historyId,
                        userName: item.user.userName,
                        phone: "0" + item.user.phone,
                        email: item.user.email,
                        disease: item.disease.diseaseName,
                        vaccine: item.disease.treatments[0].vaccine.vaccineName,
                        dose: item.dose,
                        date: item.time,
                        // moment.utc(item.registrationTime).format('DD/MM/YYYY')
                        medicalCenter: item.medicalCenter.name,
                    }
                    data.push(x);
                })
                setArr(data)
                setHistories(data.slice(0, 10))
                setIsLoading(false);
            })
            .catch(
                err => {
                    console.log(err)
                })
    }

    // Admin accept
    const changeStatus = (id) => {
        updateStatusRegistration(id)
            .then(res =>
                setRefreshData(!refreshData)
            )
            .catch()
    }
  
    const getRealTime = () => {
        return moment(new Date()).format("YYYY-MM-DD")
    }

    const emptyArray = (arr) => {
        arr.splice(0, arr.length)
    }

    const getHistory = (currentPage) => {
        var currentOffset = currentPage * 10 - 10
        var data = arr.slice(currentOffset, currentOffset + 10)
        return data
    };

    const handlePageClick = (data) => {
        let currentPage = data.selected + 1
        const result = getHistory(currentPage);
        console.log(result)
        console.log("cfdscfds")
        setHistories(result)
    }

    const handleSearch = (event) => {
        var key = event.target.value.toLowerCase()
        if (key !== "") {
            let user = arr.filter(item => {
                let result = item.userName.toLowerCase().includes(key) || item.phone.toLowerCase().includes(key) || item.email.toLowerCase().includes(key)
                return result;
            })
            setHistories(user)
        }
        else {
            setHistories(arr)
        }
    }

    if (isLoading) return <div className="spinner" ><Spinner animation="border" variant="primary" ></Spinner></div>;
    return (
        <>
            <h4>The list of customes vaccinated</h4>
            <div className="container">
                <div className='content-registrations'>
                    <div className="content-search">
                        <div class="row row-cols-2">
                            <div class="col">
                            </div>
                            <div class="col">
                                <div>
                                    <input type="text" placeholder='Search...' className="search" onKeyPress={handleSearch}></input>
                                    {/* <span class="icon" ><FaSearch size={30} /></span> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Table
                        columns={columns}
                        dataSource={histories}
                        pagination={false}

                        scroll={{
                            x: 670,
                        }}
                    >
                    </Table>
                    <div className='paginate'>
                        <ReactPaginate
                            previousLabel={'previous'}
                            nextLabel={'next'}
                            breakLabel={'...'}
                            pageCount={2}
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
        </>
    );
};

export default Histories;