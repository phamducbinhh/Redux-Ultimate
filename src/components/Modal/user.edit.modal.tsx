import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { resetStateUpdate, updateNewUser } from '~/redux/user/user.slice'
import { toast } from 'react-toastify'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const UserEditModal = (props: any) => {
  const { isOpenUpdateModal, setIsOpenUpdateModal, dataUser } = props
  const [formData, setFormData] = useState({
    id: '',
    email: '',
    name: ''
  })
  const { email, name } = formData
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => state.users)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    if (dataUser?.id) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        id: dataUser.id,
        email: dataUser.email,
        name: dataUser.name
      }))
    }
  }, [dataUser])

  useEffect(() => {
    if (state.updateSuccess === true) {
      toast('🦄 Wow so easy! Update success')
      setIsOpenUpdateModal(false)
      setFormData({
        id: '',
        email: '',
        name: ''
      })
      dispatch(resetStateUpdate())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.updateSuccess])

  const handleSubmit = () => {
    if (!email.trim()) {
      alert('email empty')
      return
    }
    if (!name.trim()) {
      alert('name empty')
      return
    }
    //call api post redux
    dispatch(updateNewUser(formData))
  }

  return (
    <>
      <Modal
        show={isOpenUpdateModal}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        backdrop={false}
        onHide={() => setIsOpenUpdateModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update A User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel label='Email' className='mb-3'>
            <Form.Control name='email' value={email} onChange={handleChange} type='text' />
          </FloatingLabel>
          <FloatingLabel label='Name'>
            <Form.Control name='name' value={name} onChange={handleChange} type='text' />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='warning' onClick={() => setIsOpenUpdateModal(false)} className='mr-2'>
            Cancel
          </Button>
          <Button onClick={() => handleSubmit()}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default UserEditModal
