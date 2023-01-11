import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { TextField } from '../components/TextField';
import { TextArea } from '../components/TextArea';
import * as Yup from 'yup';
import { addDisease, updateDisease } from '../Service/Service';

const CreateDisease = (props) => {

    const [id, setId] = useState(props.data.id)
    const validate = Yup.object().shape({
        nameDisease: Yup.string().required('Required'),
        describe: Yup.string().required('Required')
    });

    const ResizeTextarea = (e) => {
        const textarea = document.querySelector("textarea");
        textarea.addEventListener("keyup", e => {
            let scHeight = e.target.scrollHeight;
            textarea.style.height = `${scHeight}px`;
        })
    }

    const createDisease = (data) => {
        addDisease(data)
        .then(res => alert(" Create disease successfully"))
        .catch(err => console.log(err))
    }

    const handleUpdateDisease = (data) => {
        updateDisease(data, id)
        .then(res => alert(" Update disease successfully"))
        .catch(err => console.log(err))
    }
    return (
        <>
            <Formik
                initialValues={{
                    nameDisease: props.data.diseaseName,
                    describe: props.data.describe,
                }}
                validationSchema={validate}
                onSubmit={values => {
                    if (id != null) {
                        handleUpdateDisease(values)
                    } else {
                        createDisease(values)
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
                                    <div class="col-md-4">
                                        <TextField label="Name Disease" name="nameDisease" type="text" />
                                    </div>
                                    <div class="col-md-8">
                                        <TextArea label="Describe Disease" name="describe" onFocus={ResizeTextarea} />
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

export default CreateDisease