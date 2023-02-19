import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createBootcamp } from '../../services/bootcamp/BootcampService';
import { useDispatch } from 'react-redux';
import { SET_SHOW_LOADING, SET_REMOVE_LOADING } from '../../redux/slice/loadingSlice';
const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Please enter a name')
        .max(50, 'Name can not be more than 50 characters'),
    description: Yup.string()
        .required('Please enter a description')
        .max(500, 'Description can not be more than 500 characters'),
    website: Yup.string()
        .matches(
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            'Please use a valid URL with HTTP or HTTPS'
        ),
    phone: Yup.string().max(20, 'Phone number can not be longer than 20 characters'),
    email: Yup.string().required('Please enter an email').email('Please enter a valid email'),
    address: Yup.string().required('Please enter an address'),
    careers: Yup.array()
        .required('Please select at least one career')
        .min(1, 'Please select at least one career')
        .of(
            Yup.string().oneOf([
                'Web Development',
                'Mobile Development',
                'UI/UX',
                'Data Science',
                'Business',
                'Other',
            ])
        ),
    housing: Yup.boolean(),
    jobAssistance: Yup.boolean(),
    jobGuarantee: Yup.boolean(),
    acceptGi: Yup.boolean(),
    photo: Yup.mixed()
        .required('Photo is required')
        .test('fileSize', 'File too large', (value) => !value || value.size <= 2000000)
        .test('fileType', 'Unsupported File Format', (value) =>
            !value || ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(value.type)
        )
})
const initialValues = {
    name: '',
    description: '',
    website: '',
    phone: '',
    email: '',
    address: '',
    careers: [],
    housing: false,
    jobAssistance: false,
    jobGuarantee: false,
    acceptGi: false,
    photo: null,
}
const BootcampForm = () => {
    const dispatch = useDispatch()
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
                // Handle form submission
                const bootcamp = await createBootcamp({ ...values, photo: 'abc.png' })
                console.log("hrllo", bootcamp);
                setSubmitting(false);
            }}
        >
            {({ isSubmitting, isValid, touched, errors, field }) => (
                <Form >
                    <div className=' p-5 flex flex-row flex-wrap gap-11 justify-center'>
                        <div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text text-success">Address</span>
                                    <span>
                                        {touched.address && errors.address && (
                                            <div><span className="text-secondary label-text-alt">{errors.address}</span></div>
                                        )}
                                    </span>
                                </label>
                                <Field name="address" type="text" placeholder="Type here" className="input input-bordered input-sm w-full max-w-xs" />
                            </div>
                        </div>
                        <button className='mt-2 btn btn-secondary text-center ' type="submit" disabled={isSubmitting || !isValid}>Submit</button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};
export default BootcampForm;
