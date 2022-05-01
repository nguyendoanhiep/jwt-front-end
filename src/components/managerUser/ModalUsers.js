import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {useState,useEffect} from "react";
import './Users.scss'
import {getGroup  , createUser} from '../service/userService'
import {toast} from "react-toastify";
import  _ from 'lodash'

const ModalUsers = (props) => {
    const [userGroup , setUserGroup] = useState([])
    const totalData   ={
        email : '',
        phone : '',
        username : '',
        group : '',
        password : '',
        address : '',
        sex : '' ,
    }
    const validInputDefault = {
        email : true,
        phone : true,
        username : true,
        group : true,
        password : true,
        address : true,
        sex : true ,
    }


    const [userData , setUserData]  = useState(totalData)
    const [validInput , setValidInput] = useState(validInputDefault)

    const onChangeInPut = (value,name) => {
        let _userData = _.cloneDeep(userData)
        _userData[name] = value
        setUserData(_userData)
    }
    
    const validateInput = () => {
        setValidInput(validInputDefault)
        let arr = ['email','phone','group','password']
        let check = true
        for (let i = 0 ; arr.length ; i++){
            if(!userData[arr[i]]){
                let _validInput = _.cloneDeep(validInputDefault)
                _validInput[arr[i]] = false
                setValidInput(_validInput)
                toast.error(`Empty input  ${arr[i]}`)
                // eslint-disable-next-line no-unused-vars
                check = false
                break
            }
        }
      
    }
    const SaveUser = async () => {
      let check =  validateInput()
        if(check ===true){
          let res = await createUser({...userData, groupId: userData[`group`]})
            console.log("check data  " , res)
        }
    }

    useEffect(()=>{
        getAllGroups()
    },[])

    const getAllGroups = async () => {
      let res = await getGroup()
        if(res && res.data && res.data.EC === 0){
            setUserGroup(res.data.DT)
            if(res.data.DT && res.data.DT.length > 0){
                let groups = res.data.DT
                setUserData({...userData, group: groups[0].id})
            }
        }else {
            toast.warning(res.data.EM)
        }
    }
    return(
        <>
            <Modal
                show={true}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="content-body row">
                      <div className="col-6 form-group">
                          <label> Email (<span className="red">*</span>) :</label>
                          <input className={validInput.email ? 'form-control' : 'form-control is-valid'} value={userData.email} type="email" onChange={(event)=>onChangeInPut(event.target.value , "email")} />
                      </div>
                      <div className="col-6 form-group">
                          <label> Phone (<span className="red">*</span>) :</label>
                          <input className={validInput.phone ? 'form-control' : 'form-control is-valid'}  value={userData.phone} onChange={(event)=>onChangeInPut(event.target.value , "phone")} type="text"/>
                      </div>
                      <div className="col-6 form-group">
                          <label> Username  :</label>
                          <input className={validInput.username ? 'form-control' : 'form-control is-valid'}  value={userData.username} onChange={(event)=>onChangeInPut(event.target.value , "username")} type="text"/>
                      </div>
                      <div className="col-6 form-group">
                          <label> Password (<span className="red">*</span>) :</label>
                          <input className={validInput.password ? 'form-control' : 'form-control is-valid'}  value={userData.password} onChange={(event)=>onChangeInPut(event.target.value , "password")} type="password "/>
                      </div>
                      <div className="col-6 form-group">
                          <label> Address  :</label>
                          <input className={validInput.address ? 'form-control' : 'form-control is-valid'}  value={userData.address} onChange={(event)=>onChangeInPut(event.target.value , "address")} type="text"/>
                      </div>
                      <div className="col-6 form-group">
                          <label> Gender  :</label>
                          <select className='form-select' onChange={(event)=>onChangeInPut(event.target.value , "sex")} >
                              <option value="Male"  defaultValue >Male</option>
                              <option value="Female">Female</option>
                              <option value="Other"> Other</option>
                          </select>
                      </div>
                      <div className="col-6 form-group">
                          <label> Group  :</label>
                          <select className={validInput.group ? 'form-select' : 'form-select is-valid'} type="text" onChange={(event)=>onChangeInPut(event.target.value , "group")}>
                              {userGroup.length>0 && userGroup.map((item , index)=>{
                                  return(
                                      <>
                                          <option value={item.id} key={`group-${index}`} >{item.name}</option>


                                      </>
                                  )
                              })}

                          </select>
                      </div>


                  </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                    <Button onClick={()=>SaveUser()}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}
export default ModalUsers