import React, { useState } from "react";
import styled from "styled-components";
import './customMessage.css';

const CustomMessage = (props) => {
  const { message, className } = props;

  return (
    <MessageContainer className={className} role="alert">
      { message }
    </MessageContainer>
  )
}

const MessageContainer = styled.div`
  font-size: 14px;
  margin-top: 30px;
  padding: 10px;
  border-radius: 5px;
  text-align: center;

`

export default CustomMessage;