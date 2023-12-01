import { useState } from 'react'
import { Modal, Button, FloatingLabel, Form } from 'react-bootstrap'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const UserCreateModal = ({ isOpenCreateModal, setIsOpenCreateModal }: any) => {
  const [formData, setFormData] = useState({
    email: '',
    name: ''
  })

  const { email, name } = formData
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = () => {
    if (!email.trim()) {
      alert('Email cannot be empty')
      return
    }
    if (!name.trim()) {
      alert('Name cannot be empty')
      return
    }
    console.log('>>> check create: ', { email, name })
  }

  return (
    <Modal
      show={isOpenCreateModal}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      backdrop={false}
      onHide={() => setIsOpenCreateModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add A New User</Modal.Title>
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
        <Button variant='warning' onClick={() => setIsOpenCreateModal(false)} className='mr-2'>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Save</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default UserCreateModal
