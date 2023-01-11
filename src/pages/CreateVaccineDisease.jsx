import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { Icon } from '@iconify/react';
import { TextField } from '../components/TextField';
import { TextArea } from '../components/TextArea';
import Select, { ActionMeta, OnChangeValue, StylesConfig } from 'react-select'
import * as Yup from 'yup';
import './CreateVaccineDisease.scss'
import { getDisease } from '../Service/Service';
import CreateVaccine from '../components/CreateVaccine'
import CreateDisease from '../components/CreateDisease'
import CreateTreatment from '../components/CreateTreatment'

const CreateVaccineDisease = () => {

    return (
        <>
            <CreateTreatment />
            <h4 style={{ padding: '20px 0px 0px 0px' }}>Create Disease</h4>
            <CreateDisease data={""}/>
            <h4 style={{ padding: '20px 0px 0px 0px' }}>Create Vaccine</h4>
            <CreateVaccine data={""}/>
        </>
    )
}
export default CreateVaccineDisease;