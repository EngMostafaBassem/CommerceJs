import React from 'react'
import { Formik } from 'formik';

interface FormProps{
    values:any,
    onSubmit:(values:any)=>void
}

const Form:React.FC<FormProps>=({values,onSubmit,children})=>{
 return(
     <Formik
      initialValues={values}
      onSubmit={onSubmit}
     >
         {({handleSubmit})=>(
             <form onSubmit={handleSubmit}>
               {children}
             </form>
         )}
     </Formik>
 )
}
export default Form