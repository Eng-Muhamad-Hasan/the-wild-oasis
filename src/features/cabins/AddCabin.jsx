import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";
function AddCabin() {
  return (
    <>
    <Modal>
      <Modal.Toggle opens='cabin-form'>
        <Button variation='primary'>Create new cabin</Button>
      </Modal.Toggle>
      <Modal.Window name='cabin-form'>
        <CreateCabinForm />
      </Modal.Window>
      </Modal>
      
    {/* <Modal>
      <Modal.Toggle opens='cabin-table'>
        <Button variation='primary'>View all cabins</Button>
      </Modal.Toggle>
      <Modal.Window name='cabin-table'>
        <CabinTable />
      </Modal.Window>
    </Modal> */}
    </>
  );
}

//! Version 1 : Normal way without Compound Components
// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);

//   return (
//     <>
//       <Row>
//         <Button
//           variation="primary"
//           onClick={() => setIsOpenModal((isOpen) => !isOpen)}>
//           Create new cabin
//         </Button>
//       </Row>
//       {isOpenModal && (
//         <Modal onCloseModal={()=>setIsOpenModal(false)}>
//           <CreateCabinForm onCloseModal={()=>setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </>
//   );
// }

export default AddCabin;
