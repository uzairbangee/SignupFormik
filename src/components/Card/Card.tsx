import React, { ReactElement, Fragment } from 'react'
import TextField from '@material-ui/core/TextField';
import { Formik, Field, Form, ErrorMessage } from 'formik';
 import * as Yup from 'yup';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

interface InitialValue {
    name: string;
    card: string;
    cvc: string;
}

interface Props {
    activeStep: number;
    handleNext: () => void;
    handleBack: () => void;
    steps: string[];
    setPayment: (InitialValue: InitialValue) => void;
    payment: InitialValue;
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
    name: Yup.string()
        .required('Required'),
    card: Yup.string()
        .matches(/^[0-9]+$/, 'Only Numeric Values')
        .required('Required'),
    cvc: Yup.string()
        .matches(/^[0-9]+$/, 'Only Numeric Values')
        .max(4, "Cannot be greater than 4")
        .min(3, "Cannot be less than 3")
        .required('Required'),
})

function Card({activeStep, handleNext, handleBack, steps, setPayment, payment}: Props): ReactElement {
    const classes = useStyles();
    const initialValues: InitialValue = payment;
    return (
        <Fragment>
            <Formik 
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    console.log(values);
                    setPayment(values);
                    handleNext();
                }}
            >
                <div className="form">
                    <Form>
                        <Field name="name" type="text" as={TextField} id="outlined-basic" classes={{root: classes.textBox}} label="Name" variant="outlined" fullWidth={true} />
                        <ErrorMessage name="name" >{(msg) => (
                            <span className="error_message">{msg}</span>
                        )}</ErrorMessage>
                        <Field name="card" type="text" as={TextField} id="outlined-basic" classes={{root: classes.textBox}} label="Card Number" variant="outlined" fullWidth={true} />
                        <ErrorMessage name="card" >{(msg) => (
                            <span className="error_message">{msg}</span>
                        )}</ErrorMessage>
                        <Field name="cvc" type="text" as={TextField} id="outlined-basic" classes={{root: classes.textBox}} label="CVC" variant="outlined" fullWidth={true} />
                        <ErrorMessage name="cvc" >{(msg) => (
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

export default Card
