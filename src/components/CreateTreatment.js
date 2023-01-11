import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { TextField } from '../components/TextField';
import Select from 'react-select'
import { getDisease, getVaccine, addTreatment } from '../Service/Service';
import * as Yup from 'yup';
import Spinner from 'react-bootstrap/Spinner';

const CreateTreatment = () => {
    const [disease, setDisease] = useState(null);
    const [vaccine, setVaccine] = useState(null);
    const [diseaseId, setDiseaseId] = useState(null)
    const [vaccineId, setVaccineId] = useState(null)
    const [isLoadDisease, setIsLoadDisease] = useState(false)
    const [isLoadVaccine, setIsLoadVaccine] = useState(false)

    const validate = Yup.object().shape({
        time: Yup.number("Must be a number type").required('Required'),
        amount: Yup.number("Must be a number type").required('Required')
    });

    useEffect(() => {
        // Disease
        getDisease()
            .then(res => {
                const arr = res.data
                const data = [];
                arr.map((item) => {
                    const x = {
                        label: item.diseaseName,
                        value: item.diseaseId
                    }
                    data.push(x)
                })
                setDisease(data)
                setIsLoadDisease(true)
            })
            .catch(
                err => {
                    console.log(err)
                })
        // Vaccine
        getVaccine()
            .then(res => {
                const arr = res.data
                console.log(arr)
                const data = [];
                arr.map((item) => {
                    const x = {
                        label: item.vaccineName,
                        value: item.vaccineId
                    }
                    data.push(x)
                })
                setVaccine(data)
                setIsLoadVaccine(true)

            })
            .catch(
                err => {
                    console.log(err)
                })
    }, []);

    const onChange = (selector, event) => {
        if (selector === "disease") {
            setDiseaseId(event.value)
        } else {
            setVaccineId(event.value)
        }
    }

    const createTreatment = (data) => {
        addTreatment(data)
        .then(res => alert("Create treatment successfully!"))
        .catch(err => console.log(err))
    }

    if (!isLoadDisease && !isLoadVaccine) return <div className="spinner" ><Spinner animation="border" variant="primary" ></Spinner></div>;
    return (
        <>
            <h4>Create Treatment</h4>
            <Formik
                initialValues={{
                    diseaseId: "",
                    vaccineId: "",
                    time: "",
                    amount: ""
                }}
                validationSchema={validate}
                onSubmit={values => {
                    const data = {
                        diseaseId: diseaseId,
                        vaccineId: vaccineId,
                        time: parseInt(values.time),
                        amount: parseInt(values.amount)
                    }
                    createTreatment(data)
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
                                        <label htmlFor="disease" className="form-label" >Disease</label>
                                        <Select id='selected' name="nameDisease" onChange={event => onChange("disease", event)} options={disease} />
                                    </div>
                                    <div class="col-md-6">
                                        <label htmlFor="vaccine" className="form-label" >Vaccine</label>
                                        <Select id='selected' name="nameVaccine" onChange={event => onChange("vaccine", event)} options={vaccine} />
                                    </div>
                                    <div class="col-md-6">
                                        <TextField label="Time" name="time" type="text" />
                                    </div>
                                    <div class="col-md-6">
                                        <TextField label="Amount" name="amount" type="text" />
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

export default CreateTreatment