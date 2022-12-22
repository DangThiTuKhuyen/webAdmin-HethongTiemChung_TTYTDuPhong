import React from 'react';
import ReactPaginate from "react-paginate";
import { useState, useEffect } from 'react';
import { Input, Table } from 'antd';
import './Vaccination.scss'
import {
    FaSearch
} from "react-icons/fa";
import { confirmVaccination, getVaccinations } from '../Service/Service';
import Spinner from 'react-bootstrap/Spinner';
import moment from "moment";


const Vaccination = () => {

    const [vaccinations, setVaccinations] = useState(null)
    const [items, setItems] = useState([])
    const [pageCount, setpageCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshData, setRefreshData] = useState(false);
    const [arr, setArr] = useState(null)
    const [currentVaccinations, setCurrentVaccinations] = useState([])
    let limit = 12;
    const data = []

    useEffect(() => {
        fetchVaccinations()
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
        },
        {
            title: 'Action',
            width: 50,
            dataIndex: 'status',
            fix: 'right',
            render: (record, index) => {
                return (
                    <button className="action" onClick={() => changeStatus(index.id)} >Confirm</button>
                )
            },
        },
    ]
    
    const getCurrentDate = () => {
        var element = document.getElementById('search')
        if (element != null) {
            return moment.utc(element.value).format("YYYY-MM-DD")
        } else {
            return moment(new Date()).format("YYYY-MM-DD")
        }
    }

    const fetchVaccinations = () => {
        console.log(getCurrentDate())
        getVaccinations(getCurrentDate())
            .then(res => {
                const arr = res.data.reverse()
                emptyArray(data)
                console.log(data)
                arr.map((item, index) => {
                    const x = {
                        index: index + 1,
                        id: item.registrationId,
                        userName: item.user.userName,
                        phone: "0" + item.user.phone,
                        email: item.user.email,
                        disease: item.disease.diseaseName,
                        vaccine: item.vaccine.vaccineName,
                        dose: item.registrationDose,
                        date: item.registrationTime,
                        // moment.utc(item.registrationTime).format('DD/MM/YYYY')
                        medicalCenter: item.medicalCenter.name,
                    }
                    data.push(x);
                })
                setVaccinations(data.slice(0,10))
                setArr(data)
                setCurrentVaccinations(data)
                setpageCount(Math.ceil(arr.length / 10))
                setIsLoading(false);
                console.log(res.data)
            })
            .catch(
                err => {
                    console.log(err)
                })
    }
    const handleSearchDate = (event) => {
        var key = event.target.value
        getVaccinations(key)
            .then(res => {
                const arr = res.data.reverse()
                emptyArray(data)
                arr.map((item, index) => {
                    const x = {
                        index: index + 1,
                        id: item.registrationId,
                        userName: item.user.userName,
                        email: item.user.email,
                        phone: "0" + item.user.phone,
                        disease: item.disease.diseaseName,
                        vaccine: item.vaccine.vaccineName,
                        dose: item.registrationDose,
                        date: item.registrationTime,
                        // moment.utc(item.registrationTime).format('DD/MM/YYYY')
                        medicalCenter: item.medicalCenter.name,
                        status: item.status
                    }
                    data.push(x);
                })
                setArr(data)
                setCurrentVaccinations(data)
                setpageCount(Math.ceil(arr.length / 10))
                setVaccinations(data.slice(0, 10))
            })
            .catch(
                err => {
                    console.log(err)
                })
    }

    // Admin accept
    const changeStatus = (id) => {
        confirmVaccination(id)
            .then(res =>
                setRefreshData(!refreshData)
            )
            .catch()
    }

    const emptyArray = (arr) => {
        arr.splice(0, arr.length)
    }
    const fetchVaccine = (currentPage) => {
        var currentOffset = currentPage * 10 - 10
        console.log(arr)
        var data = currentVaccinations.slice(currentOffset, currentOffset + 10)
        return data
    };

    const handlePageClick = (data) => {
        let currentPage = data.selected + 1
        const result = fetchVaccine(currentPage);
        setVaccinations(result)
    };

    const handleSearch = (event) => {
        var key = event.target.value.trim().toLowerCase()
        if (key !== "") {
            let user = arr.filter(item => {
                let result = item.userName?.toLowerCase().includes(key) || item.phone.includes(key) || item.email?.toLowerCase().includes(key)
                return result;
            })
            setCurrentVaccinations(user)
            setVaccinations(user.slice(0, 10))
            setpageCount(Math.ceil(user.length / 10))
        }
        else {
            setCurrentVaccinations(arr)
            setVaccinations(arr.slice(0, 10))
            setpageCount(Math.ceil(arr.length / 10))
        }
    }

    if (isLoading) return <div className="spinner" ><Spinner animation="border" variant="primary" ></Spinner></div>;
    return (
        <>
            <h4>The list of customers vaccinate today</h4>
            <div className="container">
                <div className='content-vaccinations'>
                    <div className="content-search">
                        <div class="row row-cols-3">
                            <div class="col">
                            </div>
                            <div class="col">
                                <div>
                                    <input type="text" placeholder='Search...' className="search" onKeyPress={handleSearch}></input>
                                </div>
                            </div>
                            <div class="col">
                                <div>
                                    <input type="date" className="search" id='search' onChange={handleSearchDate}></input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Table
                        columns={columns}
                        dataSource={vaccinations}
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

export default Vaccination;