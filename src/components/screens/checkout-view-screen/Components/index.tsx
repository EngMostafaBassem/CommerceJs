import React, { useState } from 'react'
import styles from './index.module.scss'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import AddressForm from './address-from';
import PaymentForm from './payment-form';
import Form  from '../../../common/Form/form'
import {initialValues} from '../init'
const steps = ['Shippping Address', 'Payment details'];
const Checkout=()=>{
    const [activeStep, setActiveStep] = React.useState(0);
  
    const handleSubmit=()=>{
      handleNext()
    }
    const handleNext = () => {    
      setActiveStep((prevActiveStep) => prevActiveStep + 1);  
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const FormHandler=(
     <div style={{width:'100%',paddingTop:'1.5rem'}}>
         <Form values={initialValues} onSubmit={handleSubmit}>
           {activeStep===0?<AddressForm onNext={handleNext}/>:<PaymentForm onBack={handleBack}/>}
         </Form> 
      </div> 
     )
     
    return(
        <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          marginLeft:'auto',
          marginRight:'auto',
          '& > :not(style)': {
            m: 1,
            maxWidth: 600,
          },
        }}
      >
        <Paper elevation={3} style={{padding:15}}>
        <Typography variant="h4" component="h4" className={styles.textTitle} >Checkout</Typography>
        <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
       
      </Stepper>
         {activeStep===steps.length?'Confirmation':FormHandler}
        </Paper>
       
      </Box>
    )

}
export default Checkout