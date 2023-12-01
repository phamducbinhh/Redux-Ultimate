import { Form } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import { useDarkMode } from '~/context/Store-Context'

const Header = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  return (
    <Navbar className='bg-body-tertiary' data-bs-theme={isDarkMode}>
      <Container>
        <Navbar.Brand href='#home'>Navbar with text</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
          <Form.Check // prettier-ignore
            type='switch'
            id='custom-switch'
            onChange={toggleDarkMode}
            label={
              isDarkMode === 'light' ? <Navbar.Text>Light Mode</Navbar.Text> : <Navbar.Text>Dark Mode</Navbar.Text>
            }
          />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
