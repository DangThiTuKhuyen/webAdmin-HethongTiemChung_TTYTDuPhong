import React, { useState, useEffect  } from 'react';
import { Formik, Form } from 'formik';
import { Icon } from '@iconify/react';
import { TextField } from '../components/TextField';
import * as Yup from 'yup';
import './Profile.scss'
import { getProfile, updateProfile } from '../Service/Service';
import moment from "moment";

const Profile = () => {

  const [profiles, setProfiles] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [updateValues, setUpdateValues] = useState(null)

  useEffect(() => {
    getProfile()
    .then(res => {
      setProfiles(res.data);
      setIsLoading(false);
    })
    .catch(
      err => {
        console.log(err)
    })
  }, []);

  const updateMyProfile = () => {
    updateProfile(updateValues).then(res => {
      console.log(res)
    }).catch( err => 
      console.log(err))
  }

  const validate = Yup.object().shape({
    password: Yup.string()
      .required('Required')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
  });

  if (isLoading) return <div>Loading Data</div>;
  return (
    <>
      <h4>Your profile</h4>
      <Formik
        initialValues={{
          userName: profiles.userName,
          email: profiles.email,
          identityCard: profiles.identityCard,
          phoneNumber: "0" + profiles.phone,
          gender: profiles.gender,
          birthday: moment(profiles.birthday, 'DD/MM/YYYY').format('YYYY-MM-DD'),
          province: profiles.province,
          district: profiles.district
        }}
        validationSchema={validate}
        onSubmit={values => {
          const x = {
            phoneNumber: parseInt(values.phoneNumber),
            gender: values.gender,
            birthday: moment.utc(values.birthday).format('DD/MM/YYYY'),
            province: values.province,
            district: values.district
          }
          setUpdateValues(x)
          updateMyProfile()
        }}
      >
        {formik => (
          <Form className=''>
            <div class="container mt-3 ">
              <div class="card">
                <div class="d-flex flex-row justify-content-center mb-3">
                  <div class="image"> <img src = "https://imagetest12.s3.amazonaws.com/khuyen.png" class="rounded-circle" width={100} height={100} ></img> <span><Icon icon="ant-design:camera-filled" color="black"  width="1300" height="1300" /></span> </div>
                  <div class="d-flex flex-column ms-3 user-details">
                      <h4 class="mb-3">{profiles.userName}</h4>
                  </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                      <TextField label="Name" name="userName" type = "text" readOnly = "true" />
                    </div>
                    <div class="col-md-6">
                      <TextField label="Emai" name="email" type = "text" readOnly = "true" />
                    </div>
                    <div class="col-md-6">
                      <TextField label="Identity Card" name="identityCard" type = "text" readOnly = "true" />
                    </div>
                    <div class="col-md-6">
                      <TextField label="Phone number" name="phoneNumber" type = "text" />
                    </div>
                    <div class="col-md-6">
                      <TextField label="Gender" name="gender" type = "text" />
                    </div>
                    <div class="col-md-6">
                      <TextField label="Birthday" name="birthday" type = "date" />
                    </div>
                    <div class="col-md-6">
                      <TextField label="Province" name="province" type = "text" />
                    </div>
                    <div class="col-md-6">
                      <TextField label="District" name="district" type = "text" />
                    </div>
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
    </>
  )
}
export default Profile;