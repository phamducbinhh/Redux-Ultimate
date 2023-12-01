import { Form } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import { setIsDarkMode } from '~/redux/app/app.slice'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'

const Header = () => {
  const state = useAppSelector((state) => state.app)
  const dispatch = useAppDispatch()

  const toggleDarkMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setIsDarkMode(e.target.value === 'light' ? 'dark' : 'light'))
  }

  return (
    <Navbar className='bg-body-tertiary' data-bs-theme={state.isDarkMode}>
      <Container>
        <Navbar.Brand href='#home'>Navbar with text</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
          <Form.Check
            type='switch'
            id='custom-switch'
            value={state.isDarkMode}
            onChange={toggleDarkMode}
            label={
              state.isDarkMode === 'light' ? (
                <Navbar.Text>Light Mode</Navbar.Text>
              ) : (
                <Navbar.Text>Dark Mode</Navbar.Text>
              )
            }
          />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
