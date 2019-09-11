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
        </Form>
    )
}
    

export default Form;