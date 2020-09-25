import React, { ReactElement } from 'react';
import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { StepIconProps } from '@material-ui/core/StepIcon';
import User from '../User/User';
import Card from '../Card/Card';
import Security from '../Security/Security';

interface Props {
    
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }),
);

const QontoConnector = withStyles({
    alternativeLabel: {
      top: 10,
      left: 'calc(-50% + 16px)',
      right: 'calc(50% + 16px)',
    },
    active: {
      '& $line': {
        borderColor: '#784af4',
      },
    },
    completed: {
      '& $line': {
        borderColor: '#784af4',
      },
    },
    line: {
      borderColor: '#eaeaf0',
      borderTopWidth: 3,
      borderRadius: 1,
    },
  })(StepConnector);

  function getSteps() {
    return ['User Details', 'Information', 'Payment Details'];
  }

const useQontoStepIconStyles = makeStyles({
    root: {
        color: '#eaeaf0',
        display: 'flex',
        height: 22,
        alignItems: 'center',
    },
    active: {
        color: '#784af4',
    },
    circle: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
    },
    completed: {
        color: '#784af4',
        zIndex: 1,
        fontSize: 18,
    },
});

function QontoStepIcon(props: StepIconProps) {
    const classes = useQontoStepIconStyles();
    const { active, completed } = props;

    return (
        <div
        className={clsx(classes.root, {
            [classes.active]: active,
        })}
        >
        {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
        </div>
    );
}

function Signup({}: Props): ReactElement {

    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [user, setUser] = React.useState({first_name: "", last_name: '', email: "", password: "", confirm_password: ""})
    const [info, setInfo] = React.useState({contact: "", designation: ""});
    const [payment, setPayment] = React.useState({name: "", card: "", cvc: ""});
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    function getStepContent(step: number) {
        switch (step) {
          case 0:
            return <User user={user} setUser={setUser} activeStep={activeStep} steps={steps} handleNext={handleNext} handleBack={handleBack} />;
          case 1:
            return <Security info={info} setInfo={setInfo} activeStep={activeStep} steps={steps} handleNext={handleNext} handleBack={handleBack} />;
          case 2:
            return <Card payment={payment} setPayment={setPayment} activeStep={activeStep} steps={steps} handleNext={handleNext} handleBack={handleBack} />;
          default:
            return 'Unknown step';
        }
    }

    return (
        <div>
            <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
                {steps.map((label) => (
                <Step key={label}>
                    <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
                </Step>
                ))}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                <div>
                    <Typography className={classes.instructions}>
                    All steps completed - you&apos;re Register now
                    </Typography>
                </div>
                ) : (
                <div>
                    <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                    <div>
                    </div>
                </div>
                )}
            </div>
        </div>
    )
}

export default Signup
