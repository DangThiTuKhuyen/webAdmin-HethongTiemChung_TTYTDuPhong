import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { TextField } from '../components/TextField';
import * as Yup from 'yup';
import { addVaccine, updateVaccine } from '../Service/Service';

const CreateVaccine = (props) => {

    const [id, setId] = useState(props.data.id)
    console.log(id)
    const validate = Yup.object().shape({
        nameVaccine: Yup.string().required('Required'),
        price: Yup.number("Must be a number type").required('Required'),
        country: Yup.string().required('Required'),
        firm: Yup.string().required('Required'),
    });

    const createVaccine = (data) => {
        addVaccine(data)
        .then(res => alert(" Create vaccine successfully"))
        .catch(err => console.log(err))
    }

    const handleUpdateVaccine = (data) => {
        updateVaccine(data, id)
        .then(res => alert(" Update vaccine successfully"))
        .catch(err => console.log(err))
    }
    return (
        <>
            <Formik
                initialValues={{
                    nameVaccine: props.data.name,
                    price: props.data.price,
                    country: props.data.country,
                    firm: props.data.firm
                }}
                validationSchema={validate}
                onSubmit={values => {
                    const data = {
                        name: values.nameVaccine,
                        price: parseInt(values.price),
                        country: values.country,
                        firm: values.firm
                    }
                    if (id != null) {
                        handleUpdateVaccine(data)
                    } else {
                        createVaccine(data)
                    }
                }}
            >
                {formik => (
                    <Form className=''>
                        <div class="container mt-3 ">
                            <div class="card">
                                <div class="d-flex flex-row justify-content-center mb-3">
                                    <div class="d-flex flex-column ms-3 user-details">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <TextField label="Name" name="nameVaccine" type="text" />
                                    </div>
                                    {/* <div class="col-md-6">
                                        <label htmlFor="disease" className="form-label" >Disease</label>
                                        <Select id='selected' name = "nameDisease"  onChange={event => onChange(event)} options={disease} menuIsOpen={menuIsOpen}>
                                        
                                        </Select>
                                    </div> */}
                                    <div class="col-md-6">
                                        <TextField label="Price" name="price" type="text" />
                                    </div>
                                    <div class="col-md-6">
                                        <TextField label="Country" name="country" type="text" />
                                    </div>
                                    <div class="col-md-6">
                                        <TextField label="Firm" name="firm" type="text" />
                                    </div>
                                </div>
                                <div class="mt-3 gap-2 d-flex justify-content-end">
                                    <button class="px-3 btn btn-sm btn-outline-primary" type='reset'>Cancel</button>
                                    <button class="px-3 btn btn-sm btn-primary" type="submit">Save</button>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default CreateVaccine