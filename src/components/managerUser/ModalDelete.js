import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const modalDelete = (props) => {
    return(
        <>
           <Modal show={props.show} onHide={props.handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you want deleta User : {props.dataModal.email}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={props.confirmDelete}>
                        OK delete
                    </Button>
                </Modal.Footer>
            </Modal>



        </>
    )

}


export default modalDelete;