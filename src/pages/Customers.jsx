import React from 'react';
import ReactPaginate from "react-paginate";
import { Pagination } from 'antd';
import { useState, useEffect } from 'react';
import { getUsers } from '../Service/Service';
import { Table, Tag } from 'antd';
// import Table  from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import moment from "moment";
import './Customers.scss'
import {
    FaSearch
} from "react-icons/fa";
import Sidebar from '../components/Sidebar';


const Customers = () => {

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [allusers, setAllusers] = useState([])
    const [pageCount, setpageCount] = useState();
    const [currentUsers, setCurrentUsers] = useState([])
    const columns = [
        {
            title: "#",
            width: 30,
            dataIndex: 'index',
            fixed: 'left',
        },
        {
            title: 'Name',
            width: 100,
            dataIndex: 'userName',
            key: 'userName',
            fixed: 'left',
        },
        {
            title: 'Phone number',
            width: 80,
            dataIndex: 'phone',
            key: 'phone',
            // fixed: 'left',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: 130,
            key: 'email',
        },
        {
            title: 'Identity card',
            width: 70,
            dataIndex: 'identityCard',
            key: 'identityCard',
        },
        {
            title: 'Gender',
            width: 50,
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'Birthday',
            width: 60,
            dataIndex: 'birthday',
            // moment.utc('birthday').format('YYYY-MM-DD')
            key: 'birthday',
        },
        {
            title: 'Province',
            width: 70,
            dataIndex: 'province',
            key: 'province',
        },
        {
            title: 'District',
            width: 80,
            dataIndex: 'district',
            key: 'district'
        }]
    const data = [];
    useEffect(() => {
        fetchUsers()
    }, []);

    const fetchUsers = () => {
        getUsers()
            .then(res => {
                const arr = res.data.reverse()
                emptyArray(data)
                arr.map((item, index) => {
                    const x = {
                        index: index + 1,
                        userName: item.userName,
                        phone: "0" + item.phone,
                        email: item.email,
                        identityCard: item.identityCard,
                        gender: item.gender,
                        birthday: item.birthday,
                        // moment.utc(item.birthday).format('DD/MM/YYYY')
                        province: item.province,
                        district: item.district
                    }
                    data.push(x);
                })
                setAllusers(data)
                setCurrentUsers(data)
                setUsers(data.slice(0, 10))
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

    const fetchCustomer = (currentPage) => {
        var currentOffset = currentPage * 10 - 10
        var data = currentUsers.slice(currentOffset, currentOffset + 10)
        return data
    };

    const handlePageClick = (data) => {
        let currentPage = data.selected + 1
        const result = fetchCustomer(currentPage);
        setUsers(result)
    };

    const handleSearch = (event) => {
        var key = event.target.value.trim().toLowerCase()
        if (key !== "") {
            let user = allusers.filter(item => {
                let result = item.userName.toLowerCase().includes(key) || item.phone.includes(key) || item.email.toLowerCase().includes(key)
                return result;
            })
            setCurrentUsers(user)
            setUsers(user.slice(0, 10))
            setpageCount(Math.ceil(user.length / 10))
        }
        else {
            setCurrentUsers(allusers)
            setUsers(allusers)
            setpageCount(Math.ceil(allusers.length / 10))
        }
    }
    if (isLoading) return <div className="spinner" ><Spinner animation="border" variant="primary" ></Spinner></div>;
    return (
        <>
            <h4>List of customers</h4>
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
                        dataSource={users}
                        pagination={false}
                        scroll={{ x: 1500 }}
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
export default Customers;