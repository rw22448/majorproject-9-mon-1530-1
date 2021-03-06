import React, { useContext } from 'react';
import axios from 'axios';
import { mount } from 'enzyme';
import BookingContextProvider, { BookingContext } from './BookingContext';

// Mock default data returned from BookingContext

const defaultData = {
  customerId: 'rw22448',
  workerId: 'jeffOak',
  startTime: new Date(),
  endTime: new Date(),
};

// Wrapped a component to test the context, since it needs a vehicle to test ag-
// ainst

const TestComponent = () => {
  const {
    customerId,
    setCustomerId,
    workerId,
    setWorkerId,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    clearBooking,
    submitBooking,
  } = useContext(BookingContext);

  return (
    <>
      <div>
        <span data-testid="customerId">{customerId}</span>
        <span data-testid="workerId">{workerId}</span>
        <span data-testid="startTime">{startTime && startTime.toString()}</span>
        <span data-testid="endTime">{endTime && endTime.toString()}</span>
      </div>
      <button data-testid="clearButton" type="button" onClick={clearBooking}>
        Clear
      </button>
      <button
        data-testid="fillButton"
        type="button"
        onClick={() => {
          setCustomerId(defaultData.customerId);
          setWorkerId(defaultData.workerId);
          setStartTime(defaultData.startTime);
          setEndTime(defaultData.endTime);
        }}
      >
        Fill
      </button>
      <button data-testid="submitButton" type="button" onClick={submitBooking}>
        Submit
      </button>
    </>
  );
};

describe('BookingContext', () => {
  describe('clearBooking', () => {
    it('should clear state of all booking attributes', () => {
      const wrapper = mount(
        <BookingContextProvider>
          <TestComponent />
        </BookingContextProvider>
      );

      wrapper.find('[data-testid="fillButton"]').simulate('click');

      expect(wrapper.find('[data-testid="customerId"]').text()).toEqual(
        'rw22448'
      );

      wrapper.find('[data-testid="clearButton"]').simulate('click');

      expect(wrapper.find('[data-testid="customerId"]').text()).toEqual('');
    });
  });

  describe('submitBooking', () => {
    let spy;

    beforeEach(() => {
      spy = jest.spyOn(axios, 'post');
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should submit a booking with all details required', () => {
      const wrapper = mount(
        <BookingContextProvider>
          <TestComponent />
        </BookingContextProvider>
      );

      wrapper.find('[data-testid="fillButton"]').simulate('click');
      wrapper.find('[data-testid="submitButton"]').simulate('click');

      expect(spy).toHaveBeenCalled();
    });
  });
});
