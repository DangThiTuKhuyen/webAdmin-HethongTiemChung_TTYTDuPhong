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
    const [currentHistory, setCurrentHistory] = useState([])
    const data = []

    useEffect(() => {
        fetchHistory()
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
            width: 160,
            dataIndex: 'email',
            fixed: '',
        },
        {
            title: 'Disease',
            dataIndex: 'disease',
            width: 80,
            key: '1',
        },
        {
            title: 'Vaccine',
            width: 80,
            dataIndex: 'vaccine',
            key: '2',
        },
        {
            title: 'Dose',
            width: 20,
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
        getHistoryVaccination(getCurrentDate())
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
                setCurrentHistory(data)
                setpageCount(Math.ceil(arr.length / 10))
                console.log(arr.length)
                setIsLoading(false);
            })
            .catch(
                err => {
                    console.log(err)
                })
    }

    const getCurrentDate = () => {

        var element = document.getElementById('search')
        if (element != null) {
            return moment.utc(element.value).format("YYYY-MM-DD")
        } else {
            return moment(new Date()).format("YYYY-MM-DD")
        }
    }

    const emptyArray = (arr) => {
        arr.splice(0, arr.length)
    }

    const getHistory = (currentPage) => {
        var currentOffset = currentPage * 10 - 10
        var data = currentHistory.slice(currentOffset, currentOffset + 10)
        return data
    };

    const handlePageClick = (data) => {
        let currentPage = data.selected + 1
        const result = getHistory(currentPage);
        setHistories(result)
    }

    const handleSearch = (event) => {
        var key = event.target.value.trim().toLowerCase()
        if (key !== "") {
            let user = arr.filter(item => {
                let result = item.userName.toLowerCase().includes(key) || item.phone.includes(key) || item.email.toLowerCase().includes(key)
                console.log(result)
                return result;

            })
            console.log(user)
            setHistories(user.slice(0, 10))
            setpageCount(Math.ceil(user.length / 10))
            setCurrentHistory(user)
        }
        else {
            setHistories(arr.slice(0, 10))
            setCurrentHistory(arr)
             setpageCount(Math.ceil(arr.length / 10))
        }
    }

    const handleSearchDate = (event) => {
        var key = event.target.value
        getHistoryVaccination(key).then(res => {
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
            setCurrentHistory(data)
            setpageCount(Math.ceil(arr.length / 10))
            // setIsLoading(false);
        })
        .catch(
            err => {
                console.log(err)
            })
    }


    if (isLoading) return <div className="spinner" ><Spinner animation="border" variant="primary" ></Spinner></div>;
    return (
        <>
            <h4>The list of customes vaccinated</h4>
            <div className="container">
                <div className='content-registrations'>
                    <div className="content-search">
                        <div class="row row-cols-3">
                            <div class="col">
                            </div>
                            <div class="col">
                                <div>
                                    <input type="text" placeholder='Search...' className="search" onKeyPress={handleSearch}></input>
                                    {/* <span class="icon" ><FaSearch size={30} /></span> */}
                                </div>
                            </div>
                            <div class="col">
                                <div>
                                    <input type="date" className="search" id='search' onChange={handleSearchDate}></input>
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
        </>
    );
};

export default Histories;