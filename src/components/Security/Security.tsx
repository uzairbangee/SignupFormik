import React, { ReactElement, Fragment } from 'react'
import TextField from '@material-ui/core/TextField';
import { Formik, Field, Form, ErrorMessage } from 'formik';
 import * as Yup from 'yup';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

interface InitialValue {
    contact: string;
    designation: string;
}

interface Props {
    activeStep: number;
    handleNext: () => void;
    handleBack: () => void;
    steps: string[];
    setInfo: (InitialValue: InitialValue) => void;
    info: InitialValue;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textBox: {
        margin: '10px 0px',
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    }
  }),
);

const validationSchema = Yup.object().shape({
    contact: Yup.string()
        .matches(/^[0-9]+$/, 'Only Numeric Values')
        .min(11, "Contact cannot be less then 11")
        .max(13, "Contact cannot be less then 13")
        .required('Required'),
    designation: Yup.string()
        .required('Required'),
})

function Security({activeStep, handleNext, handleBack, steps, setInfo, info}: Props): ReactElement {
    const classes = useStyles();
    const initialValues: InitialValue = info;

    return (
        <Fragment>
            <Formik 
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    console.log(values);
                    setInfo(values);
                    handleNext();
                }}
            >
                <div className="form">
                    <Form>
                        <Field name="contact" type="text" as={TextField} id="outlined-basic" classes={{root: classes.textBox}} label="Contact" variant="outlined" fullWidth={true} />
                        <ErrorMessage name="contact" >{(msg) => (
                            <span className="error_message">{msg}</span>
                        )}</ErrorMessage>
                        <FormControl variant="outlined" className={classes.textBox}>
                            <Field name="designation" as={Select} label="Designation" labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" fullWidth={true}>
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={"Developer"}>Developer</MenuItem>
                                <MenuItem value={"Designer"}>Designer</MenuItem>
                                <MenuItem value={"Client"}>Client</MenuItem>
                            </Field>
                        </FormControl>
                        <ErrorMessage name="designation" >{(msg) => (
                            <span className="error_message">{msg}</span>
                        )}</ErrorMessage>
                        <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
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

export default Security
