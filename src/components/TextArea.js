import React from 'react';
import { ErrorMessage, useField } from 'formik';

export const TextArea = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div className="mb-2">
            <label htmlFor={field.name} className="form-label"  >{label}</label>
            <textarea
                className={`form-control ${meta.touched && meta.error && 'is-invalid'}`}
                {...field} {...props}
                autoComplete="off"
                readOnly={props.readOnly}
            />
            {/* <input
        className={`form-control ${meta.touched && meta.error && 'is-invalid'}`}
        {...field} {...props}
        autoComplete="off"
        readOnly = {props.readOnly}
      /> */}
            <ErrorMessage component="div" name={field.name} className="error" style={{ color: 'red' }} />
        </div>
    )
}
