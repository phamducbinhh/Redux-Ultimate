import Table from 'react-bootstrap/Table'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { fetchListUser } from '~/redux/user/user.slice'
import { Button } from 'react-bootstrap'
import UserCreateModal from '../Modal/user.create.modal'
import UserEditModal from '../Modal/user.edit.modal'
import UserDeleteModal from '../Modal/user.delete.modal'

interface User {
  id: number
  name: string
  email: string
}
const UsersTable: React.FC = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector<User[]>((state) => state.users.listUser)

  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false)

  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false)
  const [dataUser, setDataUser] = useState({})

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false)

  useEffect(() => {
    dispatch(fetchListUser())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditUser = (user: any) => {
    setDataUser(user)
    setIsOpenUpdateModal(true)
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDelete = (user: any) => {
    setDataUser(user)
    setIsOpenDeleteModal(true)
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '15px 0' }}>
        <h4>Table Users</h4>
        <Button variant='primary' onClick={() => setIsOpenCreateModal(true)}>
          Add New
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {state.length > 0 ? (
            state.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <Button variant='warning' onClick={() => handleEditUser(user)}>
                    Edit
                  </Button>
                  &nbsp;&nbsp;&nbsp;
                  <Button variant='danger' onClick={() => handleDelete(user)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No users found</td>
            </tr>
          )}
        </tbody>
      </Table>
      <UserCreateModal isOpenCreateModal={isOpenCreateModal} setIsOpenCreateModal={setIsOpenCreateModal} />
      <UserEditModal
        isOpenUpdateModal={isOpenUpdateModal}
        setIsOpenUpdateModal={setIsOpenUpdateModal}
        dataUser={dataUser}
      />
      <UserDeleteModal
        dataUser={dataUser}
        isOpenDeleteModal={isOpenDeleteModal}
        setIsOpenDeleteModal={setIsOpenDeleteModal}
      />
    </>
  )
}

export default UsersTable
