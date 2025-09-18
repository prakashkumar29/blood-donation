import React from 'react'
import { CustomTitle } from '../../styles'
import { Paper } from '@mui/material'

const CustomMobileTitle = (props) => {
  return (
    <CustomTitle onClick={()=>{
      props?.handleClick(props?.id);
    }} component={Paper}>
      {props?.label}
    </CustomTitle>
  )
}

export default CustomMobileTitle