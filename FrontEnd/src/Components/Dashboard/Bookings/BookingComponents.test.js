import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { shallow } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import {
  ServiceCard,
  WorkerRadioButton,
  DateTimeSelector,
} from './BookingComponents';
import { theme } from '../../../App';

// Added this render method to wrap components rendered in Theme tag to prevent
// test failing

const renderComponent = (component) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('BookingComponents', () => {
  describe('ServiceCard', () => {
    const testService = {
      serviceName: "Bambi's Restaurant",
      address: '123 Test Avenue, Melbourne, VIC, Australia',
      phoneNumber: '04 4151 3232',
    };

    it('should render component and details when provided a service as prop', () => {
      const { getByText } = renderComponent(
        <ServiceCard service={testService}></ServiceCard>
      );

      expect(getByText(testService.serviceName)).toBeTruthy();
      expect(getByText(testService.address)).toBeTruthy();
      expect(getByText(testService.phoneNumber)).toBeTruthy();
    });

    it('should simulate onClick event', () => {
      const onClickMock = jest.fn();

      const { getByText } = renderComponent(
        <ServiceCard service={testService} onClick={onClickMock}></ServiceCard>
      );

      fireEvent.click(getByText(testService.serviceName));

      expect(onClickMock).toHaveBeenCalled();
    });
  });

  describe('WorkerRadioButton', () => {
    const testWorker = {
      username: 'kath123',
      name: 'Kathreen McDonald',
    };

    it('should render component and details when provided a worker as prop', () => {
      const { getByText } = renderComponent(
        <WorkerRadioButton worker={testWorker}></WorkerRadioButton>
      );

      expect(getByText(testWorker.name)).toBeTruthy();
    });

    it('should simulate onChange event', () => {
      const onChangeMock = jest.fn();
      const onClickMock = jest.fn();

      const { getByText } = renderComponent(
        <WorkerRadioButton
          worker={testWorker}
          onChange={onChangeMock}
          onClick={onClickMock}
        ></WorkerRadioButton>
      );

      fireEvent.click(getByText(testWorker.name));

      expect(onChangeMock).toHaveBeenCalled();
    });
  });

  describe('DateTimeSelector', () => {
    const label = 'Time';

    it('should render component with a given label', () => {
      const { getByText } = renderComponent(
        <DateTimeSelector label={label}></DateTimeSelector>
      );

      expect(getByText(label)).toBeTruthy();
    });

    it('should simulate onChange event with correct event data', () => {
      const onChangeMock = jest.fn();
      const event = {
        target: { value: 'testValue' },
      };

      const wrapper = shallow(
        <DateTimeSelector
          label={label}
          onChange={onChangeMock}
        ></DateTimeSelector>
      );

      wrapper.find('StyledDateTimeInput').simulate('change', event);

      expect(onChangeMock).toHaveBeenCalled();
      expect(onChangeMock).toHaveBeenCalledWith(event.target.value);
    });
  });
});
