import { useState } from 'react'
import axios from 'axios'
import * as routes from '../constants/routePaths.js'
import { toast } from 'react-toastify'
import { Form, Button, FloatingLabel } from 'react-bootstrap'

const RegisterUser = () => {
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState('')

  const registerUser = async event => {
    try {
      event.preventDefault()
        await network.post('http://localhost:5000/users', {
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

      <Form onSubmit={registerUser}>
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
            Register
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default RegisterUser;
