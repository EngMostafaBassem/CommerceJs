import React from 'react'
import ReactLoading, { LoadingType } from 'react-loading';
import styles from './index.module.scss'
interface LoadingProps{
    type:LoadingType;
}
const Loading:React.FC<LoadingProps> = ({type}) => (
    <div className={styles.loadingContainer}>
       <div className={styles.loadingWrapper}>
        <ReactLoading type={type} color={'#1976d2'} height={50} width={50}  />
        </div>  
    
    </div>
    
);
 
export default Loading;