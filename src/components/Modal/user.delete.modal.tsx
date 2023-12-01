import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { deleteNewUser, resetStateDelete } from '~/redux/user/user.slice'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const UserDeleteModal = (props: any) => {
  const { dataUser, isOpenDeleteModal, setIsOpenDeleteModal } = props
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => state.users)

  useEffect(() => {
    if (state.deleteSuccess === true) {
      toast('🦄 Wow so easy! Delete success')
      setIsOpenDeleteModal(false)
      dispatch(resetStateDelete())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.deleteSuccess])

  const handleSubmit = () => {
    if (dataUser?.id) {
      dispatch(deleteNewUser({ id: dataUser?.id }))
    }
  }

  return (
    <Modal
      show={isOpenDeleteModal}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      backdrop={false}
      onHide={() => setIsOpenDeleteModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Delete A User</Modal.Title>
      </Modal.Header>
      <Modal.Body>Delete the user: {dataUser?.email ?? ''}</Modal.Body>
      <Modal.Footer>
        <Button variant='warning' onClick={() => setIsOpenDeleteModal(false)} className='mr-2'>
          Cancel
        </Button>
        <Button onClick={() => handleSubmit()}>Confirm</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default UserDeleteModal
