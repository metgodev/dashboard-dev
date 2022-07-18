export const isStepOptional = (fields, step) => {
    return fields[step].optional
};

export const isStepSkipped = (skipped, step) => {
    return skipped.has(step);
};

export const handleSkip = (fields, activeStep, setActiveStep, setSkipped) => {
    if (!isStepOptional(fields, activeStep)) {
        // You probably want to guard against something like this,
        // it should never occur unless someone's actively trying to break something.
        throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
        const newSkipped = new Set(prevSkipped.values());
        newSkipped.add(activeStep);
        return newSkipped;
    });
};

export const handleNext = (skipped, activeStep, setActiveStep, setSkipped) => {
    let newSkipped = skipped;
    if (isStepSkipped(skipped, activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
};

export const handleBack = (externalActiveStep, setExternalActiveStep, setActiveStep) => {
    if (externalActiveStep > 0) {
        setExternalActiveStep(prev => prev - 1)
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
};