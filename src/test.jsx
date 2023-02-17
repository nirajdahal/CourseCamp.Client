import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
const BootcampSchema = Yup.object().shape({
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
    email: Yup.string().email('Please enter a valid email'),
    address: Yup.string().required('Please enter an address'),
    careers: Yup.array()
        .required('Please select at least one career')
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
        .test('fileSize', 'File too large', (value) => value && value.size <= 2000000)
        .test('fileType', 'Unsupported File Format', (value) =>
            value ? ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(value.type) : true
        ),
})
export default function BootcampForm() {
    return (
        <Formik
            initialValues={{
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
            }}
            validationSchema={BootcampSchema}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            }}
        >
            {({ isSubmitting, errors, touched }) => (
                <Form>
                    <div>
                        <label htmlFor="name">Name</label>
                        <Field type="text" name="name" />
                        <ErrorMessage name="name" component="div" className="error" />
                        {touched.name && errors.name && <div className="error">{errors.name}</div>}
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <Field component="textarea" name="description" />
                        <ErrorMessage name="description" component="div" className="error" />
                        {touched.description && errors.description && <div className="error">{errors.description}</div>}
                    </div>
                    <div>
                        <label htmlFor="website">Website</label>
                        <Field type="text" name="website" />
                        <ErrorMessage name="website" component="div" className="error" />
                    </div>
                    <div>
                        <label htmlFor="careers">Careers</label>
                        <Field name="careers" type="checkbox" value="Web Development" />
                        <label htmlFor="careers">Web Development</label>
                        <Field name="careers" type="checkbox" value="Mobile Development" />
                        <label htmlFor="careers">Mobile Development</label>
                        <Field name="careers" type="checkbox" value="UI/UX" />
                        <label htmlFor="careers">UI/UX</label>
                        <ErrorMessage name="careers" />
                    </div>
                    <div>
                        <label htmlFor="housing">Housing</label>
                        <Field name="housing" type="checkbox" />
                    </div>
                    <div>
                        <label htmlFor="jobAssistance">Job Assistance</label>
                        <Field name="jobAssistance" type="checkbox" />
                    </div>
                    <div>
                        <label htmlFor="jobGuarantee">Job Guarantee</label>
                        <Field name="jobGuarantee" type="checkbox" />
                    </div>
                    <div>
                        <label htmlFor="acceptGi">Accepts GI Bill</label>
                        <Field name="acceptGi" type="checkbox" />
                    </div>
                    <button type="submit" className='btn btn-primary' disabled={isSubmitting}>
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    );
}