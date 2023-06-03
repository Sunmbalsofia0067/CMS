import { useState } from 'react'
import { toast } from 'react-toastify'
import network from '../utils'
import { Form, Button } from 'react-bootstrap'

const LoginUser = () => {
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState('')

  const loginUser = async event => {
    try {
      event.preventDefault()
        await network.post('http://localhost:8080/api/users', {
          name: userName,
          email: email,
          age: age
        })
        setAge('')
        setEmail('')
        setUserName('')
        toast.info('🦄 User Successfully added!')
    } catch (err) {
      toast.error('🦄 Something went Wrong!!!')
    }
  }
  return (
    <div>
      <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '10px'
            }}
          >
            <h2>Register User </h2>
            {/* <Button variant='outline-info'>
              <Link to={routes.usersPage}> Homepage</Link>
            </Button> */}
          </div>
      </div>

      <Form onSubmit={loginUser}>
        <Form.Group className='m-3 w-50' controlId='formBasicUsername'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Username'
            value={userName}
            onChange={event => {
              setUserName(event.target.value)
            }}
          />
        </Form.Group>

        <Form.Group className='m-3 w-50' controlId='formBasicEmail'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            value={email}
            placeholder='Enter Email'
            onChange={event => {
              setEmail(event.target.value)
            }}
          />
        </Form.Group>

        <Form.Group className='m-3 w-50' controlId='formBasicEmail'>
          <Form.Label>Age</Form.Label>
          <Form.Control
            type='number'
            value={age}
            placeholder='Enter Age'
            onChange={event => {
              setAge(event.target.value)
            }}
          />
        </Form.Group>

        <Form.Group className='m-3 w-50' controlId='formBasicSubmit'>
          <Button variant='primary' type='submit'>
            Login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginUser;
