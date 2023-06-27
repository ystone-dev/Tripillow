import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { isKorea, isOverseas } from '../../Recoil/whichCountry/whichCountry';
import { useRecoilState } from 'recoil';

const Toggle = (props) => {
  const [korea, setKorea] = useRecoilState(isKorea);
  const [overseas, setOverseas] = useRecoilState(isOverseas);

  const handleToggleLeft = () => {
    if (props.setRightOn) {
      props.setRightOn(false);
    }
    setKorea(true);
    setOverseas(false);
    if (props.setIsLeftToggle) {
      props.setIsLeftToggle(true);
    }
  };
  const handleToggleRight = () => {
    if (props.setRightOn) {
      props.setRightOn(false);
    }
    setKorea(false);
    setOverseas(true);
  };

  return (
    <ToggleLayout margin={props.margin}>
      <ToggleButton onClick={handleToggleLeft} active={props.rightOn ? !props.rightOn : korea}>
        {props.leftButton}
      </ToggleButton>
      <ToggleButton onClick={handleToggleRight} active={props.rightOn ? props.rightOn : overseas}>
        {props.rightButton}
      </ToggleButton>
    </ToggleLayout>
  );
};

const ToggleLayout = styled.div`
  display: flex;
  gap: 6px;
  margin: ${(props) => props.margin};
`;

const ToggleButton = styled.button`
  width: 65px;
  font-size: 12px;
  font-weight: 500;
  border-radius: 8px;
  padding: 5px;
  background-color: #ffffff;
  color: #c8c3c0;
  border: 1px solid var(--light-gray)
    ${(props) =>
      props.active &&
      css`
        border: none;
        background-color: var(--primary);
        color: white;
      `};
`;

export default Toggle;
