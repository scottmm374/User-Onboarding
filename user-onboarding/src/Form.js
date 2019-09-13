import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import styled from 'styled-components';
import { Container, Card, CardBody, Button } from 'reactstrap';
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
        <Container>
            <Form>
                <Card>
                    <CardBody>
                        <div className="input-field">
                            {touched.name && errors.name && <p className="error">{errors.name}</p>}
                            Enter Name
                            <Field type="name" name="name" />
                        </div>
                        <div className="input-field">
                            {touched.email && errors.email && <p className="error">{errors.email}</p>}
                            Enter Email
                            <Field type="email" name="email" />
                        </div>
                        <div className="input-field">
                            {touched.password && errors.password && <p className="error">{errors.password}</p>}
                            Enter Password
                            <Field type="password" name="password" />
                        </div>
                        <label>
                            <div className="tos">
                            <Field type="checkbox" name="tos" checked={values.tos} />
                            Agree to terms of service
                            </div>
                        </label>
                       <div> <Button color="danger" size="sm" disabled={isSubmitting}>Submit</Button></div>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <h4>User List</h4>
                        {users.map((user) => (
                            <div className="user-input"key={user.email}>
                                <p> Name: {user.name}</p>
                                <p> Email: {user.email}</p>
                            </div>
                        ))}
                    </CardBody>
                </Card>
            </Form>
        </Container>
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