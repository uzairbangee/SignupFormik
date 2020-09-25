import React, { ReactElement, Fragment } from 'react'
import TextField from '@material-ui/core/TextField';
import { Formik, Field, Form, ErrorMessage } from 'formik';
 import * as Yup from 'yup';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


interface InitialValue {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirm_password: string
}

interface Props {
    activeStep: number;
    handleNext: () => void;
    handleBack: () => void;
    steps: string[];
    setUser: (InitialValue: InitialValue) => void;
    user: InitialValue
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textBox: {
        margin: '10px 0px'
    },
    button: {
        marginRight: theme.spacing(1),
    }
  }),
);

const validationSchema = Yup.object().shape({
    first_name: Yup.string()
        .required('Required'),
    last_name: Yup.string()
        .required('Required'),
    email: Yup.string().email()
        .required('Required'),
    password: Yup.string()
        .matches(/^.*[A-Z].*$/, 'At Least One Upper Case')
        .min(8, 'Must be at least 8 characters')
        .matches(/^.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?].*$/, 'At Least One Special Character')
        .matches(/^.*[0-9].*$/, 'At Least One Number')
        .required('Required'),
    confirm_password: Yup.string()
        .min(8, 'Must be at least 8 characters')
        .oneOf([Yup.ref('password')], 'Confirm Password and Password must match')
        .required('Required'),
})

function User({activeStep, handleNext, handleBack, steps, setUser, user}: Props): ReactElement {
    const classes = useStyles();
    const initialValues: InitialValue = user;
    return (
        <Fragment>
            <Formik 
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    console.log(values);
                    setUser(values)
                    handleNext();
                }}
            >
                <div className="form">
                    <Form>
                        <Field name="first_name" type="text" as={TextField} id="outlined-basic" classes={{root: classes.textBox}} label="First Name" variant="outlined" fullWidth={true} />
                        <ErrorMessage name="first_name" >{(msg) => (
                            <span className="error_message">{msg}</span>
                        )}</ErrorMessage>
                        <Field name="last_name" type="text" as={TextField} id="outlined-basic" classes={{root: classes.textBox}} label="Last Name" variant="outlined" fullWidth={true} />
                        <ErrorMessage name="last_name" >{(msg) => (
                            <span className="error_message">{msg}</span>
                        )}</ErrorMessage>
                        <Field name="email" type="text" as={TextField} id="outlined-basic" classes={{root: classes.textBox}} label="Email" variant="outlined" fullWidth={true} />
                        <ErrorMessage name="email" >{(msg) => (
                            <span className="error_message">{msg}</span>
                        )}</ErrorMessage>
                        <Field name="password" type="password" as={TextField} id="outlined-basic" classes={{root: classes.textBox}} label="Password" variant="outlined" fullWidth={true} />
                        <ErrorMessage name="password" >{(msg) => (
                            <span className="error_message">{msg}</span>
                        )}</ErrorMessage>
                        <Field name="confirm_password" type="password" as={TextField} id="outlined-basic" classes={{root: classes.textBox}} label="Confirm Password" variant="outlined" fullWidth={true} />
                        <ErrorMessage name="confirm_password" >{(msg) => (
                            <span className="error_message">{msg}</span>
                        )}</ErrorMessage>

                    <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button} >
                        Back
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className={classes.button}
                    >
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                    </Form>
                </div>
            </Formik>
        </Fragment>
    )
}

export default User
