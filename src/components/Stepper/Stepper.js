import React, { useEffect, useState } from 'react';
import { Box, Stepper, Step, StepLabel, Button, Typography } from '@mui/material';
import { isStepSkipped, isStepOptional, handleSkip, handleNext, handleBack } from './StepperFunctions'
import useStyles from './styles'
import term from '../../terms';

const HorizontalLinearStepper = ({ fields, submitFunction, externalActiveStep, setExternalActiveStep, lastPartToRender, orientation }) => {

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const classes = useStyles()

  useEffect(() => {
    if (!externalActiveStep) {
      setActiveStep(0)
    }
  }, [fields])

  useEffect(() => {
    if (externalActiveStep >= 0) {
      setActiveStep(externalActiveStep)
    }
  }, [externalActiveStep])

  return (
    <Box sx={classes.container}>
      <Stepper activeStep={activeStep}>
        {fields.map(({ title }, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(fields, index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(skipped, index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={title} {...stepProps}>
              <StepLabel {...labelProps}>{title}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === fields.length ? (
        //The fragment for the last part
        <React.Fragment>
          {(lastPartToRender !== undefined) && lastPartToRender}
          <Typography sx={{ padding: '50px' }}>{term('do_you_want_to_save_your_changes') + "?"}</Typography>
          <Box sx={{
            display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: orientation === 'rtl' ? 'left' : 'right'
          }}>
            < Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={() => handleBack(externalActiveStep, setExternalActiveStep, setActiveStep)}
            >
              {term("back")}
            </Button>
            <Button onClick={submitFunction}>{term('edit')}</Button>
          </Box>
        </React.Fragment>
      ) : (
        //Any other fragment
        <React.Fragment>
          <Box className={classes.stepWrapper}>
            {fields[activeStep].field}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={() => handleBack(externalActiveStep, setExternalActiveStep, setActiveStep)}
              sx={{ mr: 1 }}
            >
              {term('back')}
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(fields, activeStep) && (
              <Button color="inherit" onClick={() => handleSkip(fields, activeStep, setActiveStep, setSkipped)} sx={{ mr: 1 }}>
                {term('skip')}
              </Button>
            )}
            {externalActiveStep === undefined &&
              <Button onClick={() => handleNext(skipped, activeStep, setActiveStep, setSkipped)}>
                {activeStep === fields.length - 1 ? 'Finish' : 'Next'}
              </Button>
            }
          </Box>
        </React.Fragment>
      )
      }
    </Box >
  );
};

export default HorizontalLinearStepper;