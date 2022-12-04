import React from 'react';
import ReactPaginate from "react-paginate";
import { useState, useEffect } from 'react';
import { Input, Table } from 'antd';
import './Registrations.scss'
import {
    FaSearch
} from "react-icons/fa";
import { getRegistrations, updateStatusRegistration } from '../Service/Service';
import Spinner from 'react-bootstrap/Spinner';
import moment from "moment";


const Registrations = () => {

    const [registrations, setRegistrations] = useState(null)
    const [items, setItems] = useState([])
    const [pageCount, setpageCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshData, setRefreshData] = useState(false);
    const [choose, setChoose] = useState("All");
    const [arr, setArr] = useState(null)
    let limit = 12;
    const data = []

    useEffect(() => {
        fetchRegistrations()
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

    const fetchRegistrations = () => {
        getRegistrations()
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
        updateStatusRegistration(id)
            .then(res =>
                setRefreshData(!refreshData)
            )
            .catch()

        console.log(refreshData)
        console.log(id)
    }
    // useEffect(() => {
    //     const getComments = async () => {
    //         const res = await fetch(
    //             `http://localhost:3004/comments?_page=2&_limit=${limit}`
    //         );
    //         const data = await res.json();
    //         const total = res.headers.get('x-total-count')
    //         setpageCount(Math.ceil(total/5))
    //         console.log(pageCount)
    //     console.log(total)
    //         setItems(data)
    //     };
    //     getComments()
    // }, []);

    const emptyArray = (arr) => {
        arr.splice(0, arr.length)
    }

    const fetchComments = async (currentPage) => {
        const res = await fetch(
            `http://localhost:3004/comments?_page=${currentPage}&_limit=${limit}`
        );
        const data = await res.json();

        return data
    };

    const handlePageClick = async (data) => {
        console.log(data.selected)
        let currentPage = data.selected + 1

        const commentsFormServer = await fetchComments(currentPage);
        setItems(commentsFormServer)
    };

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
        // setRegistrations(result)
    }

    if (isLoading) return <div className="spinner" ><Spinner animation="border" variant="primary" ></Spinner></div>;
    return (
        <>
            <h4>The list of vaccination applications</h4>
            <div className="container">
                <div className='content-registrations'>
                    <div className="content-search">
                        <div class="row row-cols-2">
                            <div class="col">
                                <div onChange={onChangeValue} className="radio">
                                    <input type="radio" value="Accepted" name="choose" checked={choose === "Accepted"} /> Accepted
                                    <input type="radio" value="Not Accepted" name="choose" checked={choose === "Not Accepted"} /> Not Accepted
                                    <input type="radio" value="All" name="choose" checked={choose === "All"} /> All
                                </div>
                            </div>
                            <div class="col">
                                <div>
                                    <input type="text" placeholder='Search...' className="search"></input>
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

export default Registrations;