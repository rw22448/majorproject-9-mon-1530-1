import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Title } from '../DashboardComponents';
import { BookingContext } from '../../../Contexts/BookingContext';

// Components defined here are specifically used for booking appointments

const StyledServiceCard = styled.div`
  height: 106px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
`;

const StyledWorkerCard = styled.div`
  height: 60px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
`;

const CardContents = styled.div`
  display: flex;
  margin: 16px 24px;
  transition: color ${(props) => props.theme.transition.short};

  &:hover {
    cursor: pointer;
    text-decoration: underline;
    color: ${(props) => props.theme.colours.green.primary};
  }
`;
const TempServiceIcon = styled.div`
  width: 74px;
  height: 74px;
  background-color: ${(props) => props.theme.colours.green.primary};
  border-radius: 37px;
`;

const CardContentsText = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  bottom: 2px;
  flex: none;
  margin-left: 20px;
  width: calc(100% - 74px - 24px);
`;

const DateTimeSelectorWrapper = styled.span`
  margin-right: 20px;
`;

const StyledRadioInput = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 24px;
  height: 24px;
  margin: 0;
  outline: 0px;
  border-radius: 50%;
  border: 2px solid #999;
  position: relative;
  top: 2px;

  &:checked {
    border: 12px solid ${(props) => props.theme.colours.green.primary};
  }
`;

const StyledLabel = styled.label`
  width: 100%;
  height: 100%;
  font-weight: ${(props) => props.theme.fontWeight.semiBold};
  font-size: 24px;
`;

const StyledDateTimeInput = styled.input`
  display: block;
  border: none;
  outline: none;
  background-color: transparent;
  position: relative;
  right: 2px;
  margin-top: 4px;
  padding-top: 4px;
  font-size: 16px;
  font-family: ${(props) => props.theme.font.primary};
`;

// Used to help find component during unit testing
StyledDateTimeInput.displayName = 'StyledDateTimeInput';

const TimeFlex = styled.div`
  display: flex;
`;

const StyledHr = styled.hr`
  margin-bottom: 0;
`;

const TimeSlot = styled.button`
  margin-top: 12px;
  padding: 4px 24px;
  font-family: ${(props) => props.theme.font.primary};
  font-size: 16px;
  font-weight: ${(props) => props.theme.fontWeight.semiBold};
  color: white;
  border: 2px solid transparent;
  border-radius: 4px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  background-color: ${(props) => props.theme.colours.green.primary};
  outline: 0px;
  transition: background-color ${(props) => props.theme.transition.short};

  &:hover {
    background-color: ${(props) => props.theme.colours.green.secondary};
  }

  &:active {
    background-color: ${(props) => props.theme.colours.green.tertiary};
    border: 2px solid black;
    position: relative;
    top: 4px;
  }
`;

const DisabledButton = styled.button`
  margin-top: 12px;
  padding: 4px 24px;
  font-family: ${(props) => props.theme.font.primary};
  font-size: 16px;
  font-weight: ${(props) => props.theme.fontWeight.semiBold};
  color: #0000003a;
  border: 2px solid transparent;
  border-radius: 4px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  background-color: #ffffff0a;
  outline: 0px;
  transition: background-color ${(props) => props.theme.transition.short};
`;

const ServiceCard = ({ service, onClick }) => {
  return (
    <StyledServiceCard>
      <CardContents onClick={onClick}>
        <TempServiceIcon></TempServiceIcon>
        <CardContentsText>
          <Title>{service.serviceName}</Title>
          <div>{service.address}</div>
          <div>{service.phoneNumber}</div>
        </CardContentsText>
      </CardContents>
    </StyledServiceCard>
  );
};

const WorkerRadioButton = ({ worker, onChange, onClick }) => {
  return (
    <StyledWorkerCard>
      <CardContents>
        <StyledRadioInput
          type="radio"
          id={worker.workerUserName}
          key={worker.workerUserName}
          label={worker.workerFullName}
          value={worker.workerUserName}
          name="selectWorker"
          onChange={() => {
            onChange(worker.workerUserName);
          }}
          onClick={() => {
            onClick();
          }}
        />
        <CardContentsText>
          <StyledLabel htmlFor={worker.workerUserName}>
            {worker.workerFullName}
          </StyledLabel>
        </CardContentsText>
      </CardContents>
    </StyledWorkerCard>
  );
};

const DateTimeSelector = ({ label, onChange }) => {
  return (
    <DateTimeSelectorWrapper>
      <label htmlFor={label}>{label}</label>
      <StyledDateTimeInput
        type="datetime-local"
        id={label}
        name={label}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
      <StyledHr />
    </DateTimeSelectorWrapper>
  );
};

const DateSelector = ({ label, onChange }) => {
  return (
    <DateTimeSelectorWrapper>
      <label htmlFor={label}>{label}</label>
      <StyledDateTimeInput
        type="date"
        id={label}
        name={label}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
      <StyledHr />
    </DateTimeSelectorWrapper>
  );
};

const TimeSelector = ({ label, onChange }) => {
  return (
    <DateTimeSelectorWrapper>
      <label htmlFor={label}>{label}</label>
      <StyledDateTimeInput
        type="time"
        id={label}
        name={label}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
      <StyledHr />
    </DateTimeSelectorWrapper>
  );
};

const TimeSlotView = ({ children, startTime, endTime }) => {
  const { setStartTime, setEndTime } = useContext(BookingContext);

  const [localStartTime] = useState(startTime);
  const [localEndTime] = useState(endTime);

  return (
    <TimeSlot
      onClick={() => {
        setStartTime(localStartTime);
        setEndTime(localEndTime);
      }}
    >
      {children}
    </TimeSlot>
  );
};

export {
  ServiceCard,
  DateTimeSelector,
  WorkerRadioButton,
  TimeFlex,
  TimeSlotView,
  DisabledButton,
  DateSelector,
  TimeSelector,
};
