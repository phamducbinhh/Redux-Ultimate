import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Container from 'react-bootstrap/Container'
import UsersTable from '../UsersTable'
import { useEffect } from 'react'
import { useDarkMode } from '~/context/Store-Context'

const TabsContent = () => {
  const { isDarkMode } = useDarkMode()

  useEffect(() => {
    const body = document.querySelector('body')
    if (body) {
      body.setAttribute('data-bs-theme', isDarkMode)
    }
  }, [isDarkMode])

  return (
    <Container>
      <Tabs defaultActiveKey='home' id='uncontrolled-tab-example' className='mb-3 mt-3'>
        <Tab eventKey='home' title='Home'>
          <UsersTable />
        </Tab>
        <Tab eventKey='profile' title='Profile'>
          Tab content for Profile
        </Tab>
      </Tabs>
    </Container>
  )
}

export default TabsContent
