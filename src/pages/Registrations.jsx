import React from 'react';
import ReactPaginate from "react-paginate";
import { useState, useEffect } from 'react';
import { Input, Table } from 'antd';
import './Registrations.scss'
import { getRegistrations, updateStatusRegistration } from '../Service/Service';
import Spinner from 'react-bootstrap/Spinner';
import moment from "moment";

const Registrations = () => {

    const [registrations, setRegistrations] = useState([])
    const [pageCount, setpageCount] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [refreshData, setRefreshData] = useState(false);
    const [choose, setChoose] = useState("All");
    const [arr, setArr] = useState([])
    const data = []

    useEffect(() => {
        fetchRegistrations()
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
                let color = record === true ? "#f6ffec" : "#fff0ef";
                let borderColor = record === true ? "#c2eea0" : "#ffa39e";
                let textColor = record === true ? "#42a221" : "#cf1321";
                let key = record === true ? "Accepted" : "Not Accepted";
                return (
                    <button style={{ backgroundColor: color, borderColor: borderColor, color: textColor }} onClick={() => changeStatus(index.id)} disabled={record}>{key}</button>
                )
            },
        },
    ]

    const getRealTime = () => {
        return moment(new Date()).format("YYYY-MM-DD")
    }

    const fetchRegistrations = () => {
        getRegistrations(getRealTime())
            .then(res => {
                const arr = res.data.reverse()
                emptyArray(data)
                arr.map((item, index) => {
                    const x = {
                        index: index + 1,
                        id: item.registrationId,
                        userName: item.user.userName,
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
                setpageCount(Math.ceil(data.length / 10))
                setRegistrations(data.slice(0,10))
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

    const emptyArray = (arr) => {
        arr.splice(0, arr.length)
    }

    const fetchUsers = (currentPage) => {
        var currentOffset = currentPage * 10 - 10
        console.log(arr)
        var data = arr.slice(currentOffset, currentOffset + 10)
        return data
    };

    const handlePageClick = (data) => {
        let currentPage = data.selected + 1
        const result = fetchUsers(currentPage);
        setRegistrations(result)
    };

    // filter radio
    function onChangeValue(event) {
        setChoose(event.target.value);
        setRegistrations(handleSearchRadio(event.target.value))
    }

    const handleSearchRadio = (value) => {
        return arr.filter((item) => {
            switch (value) {
                case 'All':
                    return item
                case 'Accepted':
                    return item.status === true
                case 'Not Accepted':
                    return item.status === false
            }
        })
    }

    const handleSearch = (event) => {
        var key = event.target.value
        if (key !== "") {
            let registration = arr.filter(item => {
                let result = item.userName?.toLowerCase().includes(key) || item.phone.includes(key) || item.email?.toLowerCase().includes(key)
                return result;
            })
            setRegistrations(registration)
        }
        else {
            setRegistrations(arr)
        }
    }

    const handleSearchDate = (event) => {
        var key = event.target.value
        getRegistrations(key)
            .then(res => {
                const arr = res.data.reverse()
                emptyArray(data)
                arr.map((item, index) => {
                    const x = {
                        index: index + 1,
                        id: item.registrationId,
                        userName: item.user.userName,
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
                setRegistrations(data)
            })
            .catch(
                err => {
                    console.log(err)
                })
    }
 
    if (isLoading) return <div className="spinner" ><Spinner animation="border" variant="primary" ></Spinner></div>;
    return (
        <>
            <h4>The list of vaccination applications</h4>
            <div className="container">
                <div className='content-registrations'>
                    <div className="content-search">
                        <div class="row row-cols-3">
                            <div class="col">
                                <div onChange={onChangeValue} className="radio">
                                    <input type="radio" value="Accepted" name="choose" checked={choose === "Accepted"} /> Accepted
                                    <input type="radio" value="Not Accepted" name="choose" checked={choose === "Not Accepted"} /> Not Accepted
                                    <input type="radio" value="All" name="choose" checked={choose === "All"} /> All
                                </div>
                            </div>
                            <div class="col">
                                <div>
                                    <input type="text" placeholder='Search...' className="search" onKeyPress={handleSearch}></input>
                                    {/* <span class="icon" ><FaSearch size={30} /></span> */}
                                </div>
                            </div>
                            <div class="col">
                                <div>
                                    <input type="date" className="search" onChange={handleSearchDate}></input>
                                    {/* <span class="icon" ><FaSearch size={30} /></span> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Table
                        columns={columns}
                        dataSource={registrations}
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

export default Registrations;