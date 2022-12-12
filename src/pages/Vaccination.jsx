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
            width: 120,
            dataIndex: 'email',
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
        },
        {
            title: 'Action',
            width: 100,
            dataIndex: 'status',
            fix: 'right',
            render: (record, index) => {
                return (
                    <button className="action" onClick={() => changeStatus(index.id)} >Confirm</button>
                )
            },
        },
    ]

    const getRealTime = () => {
        return moment(new Date()).format("YYYY-MM-DD")
    }

    const fetchVaccinations = () => {
        getVaccinations(getRealTime())
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
                setIsLoading(false);
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
        var data = arr.slice(currentOffset, currentOffset + 10)
        return data
    };

    const handlePageClick = (data) => {
        let currentPage = data.selected + 1
        const result = fetchVaccine(currentPage);
        setVaccinations(result)
    };

    const handleSearch = (event) => {
        console.log("scdscsdfc")
        var key = event.target.value.toLowerCase()
        
        if (key !== "") {
            let user = arr.filter(item => {
                let result = item.userName.toLowerCase().includes(key) || item.phone.toLowerCase().includes(key) || item.email.toLowerCase().includes(key)
                return result;
            })
            setVaccinations(user)
        }
        else {
            setVaccinations(arr)
        }
    }


    if (isLoading) return <div className="spinner" ><Spinner animation="border" variant="primary" ></Spinner></div>;
    return (
        <>
            <h4>The list of customers vaccinate today</h4>
            <div className="container">
                <div className='content-vaccinations'>
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
                        dataSource={vaccinations}
                        pagination={false}
                        scroll={{
                            x: 670,
                        }}
                    >
                    </Table>
                    {/* <div className="row m-2 content-customer">
                {items.map((item) => {
                return (
                    <div key={item.id} className="col-sm-6 col-md-4 v my-2">
                    <div className="card shadow-sm w-100" style={{ minHeight: 225 }}>
                        <div className="card-body">
                        <h5 className="card-title text-center h2">Id :{item.id} </h5>
                        <h6 className="card-subtitle mb-2 text-muted text-center">
                            {item.email}
                        </h6>
                        <p className="card-text">{item.body}</p>
                        </div>
                    </div>
                    </div>
                );
                })}
            </div> */}

                    <div className='paginate'>
                        <ReactPaginate
                            previousLabel={'previous'}
                            nextLabel={'next'}
                            breakLabel={'...'}
                            pageCount={10}
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