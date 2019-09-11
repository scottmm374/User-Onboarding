import React from 'react';
import { withFormik, FOrm, Field} from 'formik';
import axios from 'axios';
import * as Yup from 'yup';


function Form ({values, errors, touched, isSubmitting}) {
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
        </Form>
    );
}

const LoginForm = withFormik ({
    mapPropsToValues({ name, email, password, tos}) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            tos: tos || false
        };
    },
    
    validationSchema: Yup.object().shape({
        email: Yup.string()
            .email("Email not valid")
            .required("Required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters long")
            .required("Required"),
    }),
})(Form)
    

export default LoginForm;