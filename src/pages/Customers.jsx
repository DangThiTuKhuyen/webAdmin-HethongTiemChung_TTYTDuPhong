import React from 'react';
import ReactPaginate from "react-paginate";
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
    const [items, setItems] = useState([])
    const [pageCount, setpageCount] = useState(0);

    let limit = 12;
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
            width: 110,
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
            arr.map((item, index) => {
                const x = {
                    index: index + 1,
                    userName: item.userName,
                    phone: "0" + item.phone,
                    email: item.email,
                    identityCard: item.identityCard,
                    gender: item.gender,
                    birthday: moment.utc(item.birthday).format('DD/MM/YYYY'),
                    province: item.province,
                    district: item.district
                }
                // console.log(item.id)
                data.push(x);
            })
            setUsers(data)
            console.log(users)
            setIsLoading(false);
        })
        .catch(
            err => {
                console.log(err)
            })
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

    const handleSearch = () => {
        console.log("aaaaa")
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
                                    <input type="text" placeholder='Search...' className="search"></input>
                                    {/* <span class="icon" ><FaSearch size={30} /></span> */}
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

export default Customers;