import {useEffect, useState} from "react";
import {fetchAllUsers , userDelete} from "../service/userService";
import ReactPaginate from 'react-paginate';
import {toast} from "react-toastify";
import ModalDelete from "./ModalDelete";
import ModalUsers from "./ModalUsers";




const Users = (props) => {
    const [listUser ,setListUser]  = useState();
    const [currentPage , setCurrenPage] = useState(1)
    const [currentLimit , setCurrenLimit] = useState(3)
    const [totalPages , setTotalPages] = useState(0)
    const [isShowModal , setIsShowModal] = useState(false)
    const [dataModal , setDataModal]  = useState({})

    useEffect(()=>{
        fetchUsers();
    },[currentPage])
    
    const fetchUsers = async () => {
         let response =  await fetchAllUsers(currentPage , currentLimit)
        if(response && response.data && response.data.EC===0  ){
            console.log(response.data.DT)
            setTotalPages(response.data.DT.totalPages)
            setListUser(response.data.DT.users)


        }
    }
    const handlePageClick = async (event) => {
      setCurrenPage(+event.selected +1)
    };
    const deleteUser = async (user) => {
        setDataModal(user)
        setIsShowModal(true);


    }
    const handleClose = () => {
        setIsShowModal(false);
        setDataModal({})
    }
    const confirmDelete = async () => {
         let response = await userDelete(dataModal)
            if(response && response.data.EC === 0){
                toast.success(response.data.EM)
                await fetchUsers();
                setIsShowModal(false);

            }else {
                toast.warning(response.data.EM)
            }
    }


    return(
        <>
        <div className='container'>
            <div className="manage-users-container" >
                <div className="user-header">
                    <div className="title">
                        <h3>Table-user</h3>
                    </div>
                    <div className="actions">
                        <button className="btn btn-success">Refesh</button>
                        <button className="btn btn-primary">Add new User</button>
                    </div>
                </div>
                <div>
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Email</th>
                            <th scope="col">username</th>
                            <th scope="col">Group</th>
                        </tr>
                        </thead>
                        <tbody>
                        {listUser && listUser.length > 0 ?
                            <>
                                {listUser.map(( item ,index  )=>{
                                    return(
                                        <tr key={`row-${index}`}>
                                            <td>{index+1}</td>
                                            <td>{item.email}</td>
                                            <td>{item.username}</td>
                                            <td>{item.Group ? item.Group.name : ""}</td>
                                           <td> <button>Edit</button></td>
                                           <td><button onClick={()=>deleteUser(item)}>Delete</button></td>
                                        </tr>
                                    )
                                })}
                            </>
                            :
                            <>
                                <tr>
                                    <td>User not found</td>
                                </tr>
                            </>
                        }
                        </tbody>
                    </table>
                </div>

                {totalPages>0 &&
                <div className="user-footer">
                    <ReactPaginate
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={totalPages}
                        previousLabel="< previous"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                    />
                </div>
                }
            </div>
        </div>
            <ModalDelete show = {isShowModal}
            handleClose={handleClose}
                         confirmDelete={confirmDelete}
                         dataModal ={dataModal}
            />
            <ModalUsers
                title={"Create new user"}
            />
        </>
  )
}
export default Users