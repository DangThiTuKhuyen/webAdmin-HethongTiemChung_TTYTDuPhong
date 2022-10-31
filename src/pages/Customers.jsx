import React from 'react';
import ReactPaginate from "react-paginate";
import { useState, useEffect } from 'react';
// import {Table, Column, Cell} from 'fixed-data-table';
import { TextField } from '../components/TextField';
import { Table } from 'antd';
import './Customers.scss'


const Customers = () => {

    const [items, setItems] = useState([])
    const [pageCount, setpageCount] = useState(0);
    let limit = 12;
    const columns = [
        {
            title: 'Tên khách hàng',
            width: 150,
            dataIndex: 'tenKH',
            key: 'name',
            fixed: 'left',
        },
        {
            title: 'Số điện thoại',
            width: 150,
            dataIndex: 'SDT',
            key: 'age',
            fixed: 'left',
        },
        {
            title: 'Ngày mua',
            dataIndex: 'ngayMua',
            width: 150,
            key: '1',
    
        },
        {
            title: 'Suất chiếu',
            width: 250,
            dataIndex: 'tenSuatChieu',
            key: '2',
        },
        {
            title: 'Loại vé',
            width: 80,
            dataIndex: 'tenLoaiVe',
            key: '3',
        },
        {
            title: 'Phòng',
            width: 80,
            dataIndex: 'tenPhong',
            key: '4',
        },
        {
            title: 'Ghế',
            width: 70,
            dataIndex: 'tenGhe',
            key: '5',
        },
        {
            title: 'Phòng',
            width: 80,
            dataIndex: 'tenPhong',
            key: '4',
        },
        {
            title: 'Ghế',
            width: 70,
            dataIndex: 'tenGhe',
            key: '5',
        },
        {
            title: 'Phòng',
            width: 80,
            dataIndex: 'tenPhong',
            key: '4',
        },
        {
            title: 'Ghế',
            width: 70,
            dataIndex: 'tenGhe',
            key: '5',
        },
        {
            title: 'Phim',
            dataIndex: 'tenPhim',
            key: '6',
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 100,
            render: (record) => <div >
                <button className='btn-edit'  ><i className='fas fa-pencil-alt' ></i></button>&ensp;&ensp;
               
            </div>,
        }]

    useEffect(() => {
        const getComments = async () => {
            const res = await fetch(
                `http://localhost:3004/comments?_page=2&_limit=${limit}`
            );
            const data = await res.json();
            const total = res.headers.get('x-total-count')
            setpageCount(Math.ceil(total/5))
            console.log(pageCount)
        console.log(total)
            setItems(data)
        };
        getComments()
    }, []);

    console.log(items)

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
    return (
        <div className="container">
            <div className='content-customer'>
                <Table
                columns={columns}
                scroll={{
                    x: 2000,
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
        
            <div>
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
    );
};

export default Customers;