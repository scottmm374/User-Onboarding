import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';


function LoginForm({ values, errors, touched, isSubmitting, status }) {
    const [users, setUsers] = useState([])

    useEffect(() => {
        if (status) {
            setUsers([...users, status])
        }
    }, [status])

    return (
        <Form>
            <div>
                {touched.name && errors.name && <p>{errors.name}</p>}
                <Field type="name" name="name" placeholder="Name" />
            </div>
            <div>
                {touched.email && errors.email && <p>{errors.email}</p>}
                <Field type="email" name="email" placeholder="Email" />
            </div>
            <div>
                {touched.password && errors.password && <p>{errors.password}</p>}
                <Field type="password" name="password" placeholder="Password" />
            </div>
            <label>
                <Field type="checkbox" name="tos" checked={values.tos} />
                Agree to terms of service
            </label>
            <button disabled={isSubmitting}>Submit</button>

            {users.map((user) => (
                <div>
                    {/* key={user.id} */}
                    <div>Name: {user.name}</div>
                    <div>Email: {user.email}</div>
                </div>
            ))}

        </Form>
    );
}

const FormikForm = withFormik({
    mapPropsToValues({ name, email, password, tos }) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            tos: tos || false
        };
    },

    // Validation user input 

    validationSchema: Yup.object().shape({
        name: Yup.string().required("Required"),
        email: Yup.string().email("Email not valid").required("Required"),
        password: Yup.string().min(6, "Password must be at least 6 characters long").required("Required"),
        // want to add required for tos
    }),



    // handeling user input    

    handleSubmit(values, { resetForm, setSubmitting, setStatus }) {
        axios
            .post(' https://reqres.in/api/users', values)
            .then(res => {
                console.log("res", res);
                setStatus(res.data);
                resetForm();
                setSubmitting(false);
            })
            .catch(err => {
                console.log("err", err);
                setSubmitting(false);
            })
    }

})(LoginForm)


export default FormikForm;