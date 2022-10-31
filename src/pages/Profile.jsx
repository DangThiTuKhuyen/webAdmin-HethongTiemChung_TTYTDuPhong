import React from 'react';
import { Formik, Form } from 'formik';
import { Icon } from '@iconify/react';
import { TextField } from '../components/TextField';
import * as Yup from 'yup';
import './Profile.scss'

const Profile = () => {
  const validate = Yup.object({
    firstName: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    lastName: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Required'),
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 charaters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password must match')
      .required('Confirm password is required'),
  })
  var a = [1, 2, 3]
  return (
    <Formik
      initialValues={{
        firstName: 'xcvbn',
        lastName: '',
        email: 'khuyen@gmail.com',
        password: '',
        confirmPassword: ''
      }}
      validationSchema={validate}
      onSubmit={values => {
        console.log(values)
      }}
    >
      {formik => (
        <Form className=''>
          <div class="container mt-3 ">
            <div class="card">
              <div class="d-flex flex-row justify-content-center mb-3">
                <div class="image"> <img src="https://i.imgur.com/hczKIze.jpg" class="rounded-circle"></img> <span><Icon icon="ant-design:camera-filled" color="black"  width="1300" height="1300" /></span> </div>
                <div class="d-flex flex-column ms-3 user-details">
                    <h4 class="mb-3">{a}</h4>
                </div>
              </div>
              <div class="row">
                  <div class="col-md-6">
                    <TextField label="First Name" name="firstName" type = "text" readOnly = "true" />
                  </div>
                  <div class="col-md-6">
                    <TextField label="First Name" name="lastName" type = "text"  />
                  </div>
                  <div class="col-md-6">
                    <TextField label="First Name" name="email" type = "text"  />
                  </div>
                  <div class="col-md-6">
                    <TextField label="First Name" name="password" type = "text" />
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-6">
                    <TextField label="First Name" name="firstName" type = "text" readOnly = "true" />
                  </div>
                  <div class="col-md-6">
                    <TextField label="First Name" name="lastName" type = "text"  />
                  </div>
                  <div class="col-md-6">
                    <TextField label="First Name" name="email" type = "text"  />
                  </div>
                  <div class="col-md-6">
                    <TextField label="First Name" name="password" type = "text" />
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-6">
                    <TextField label="First Name" name="firstName" type = "text" readOnly = "true" />
                  </div>
                  <div class="col-md-6">
                    <TextField label="First Name" name="lastName" type = "text"  />
                  </div>
                  <div class="col-md-6">
                    <TextField label="First Name" name="email" type = "text"  />
                  </div>
                  <div class="col-md-6">
                    <TextField label="First Name" name="password" type = "text" />
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-6">
                    <TextField label="First Name" name="firstName" type = "text" readOnly = "true" />
                  </div>
                  <div class="col-md-6">
                    <TextField label="First Name" name="lastName" type = "text"  />
                  </div>
                  <div class="col-md-6">
                    <TextField label="First Name" name="email" type = "text"  />
                  </div>
                  <div class="col-md-6">
                    <TextField label="First Name" name="password" type = "text" />
                  </div>
              </div>
              <div class="row">
                <TextField label="First Name" name="confirmPassword" type = "text"  />
              </div>
              <div class="mt-3 gap-2 d-flex justify-content-end">
                <button class="px-3 btn btn-sm btn-outline-primary" type='reset'>Cancel</button>
                <button class="px-3 btn btn-sm btn-primary"  type="submit">Save</button> 
              </div>
            </div>
          </div>
        </Form>
    
      )}
    </Formik>
  )
}
export default Profile;