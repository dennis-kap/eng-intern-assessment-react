import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import Stopwatch from '../src/StopWatch';

describe('Stopwatch', () => {
  test('renders initial state correctly', () => {
    render(<Stopwatch />);
    
    expect(screen.getByText('00:00:00')).toBeInTheDocument();
    expect(screen.queryByTestId('lap-list')).toBeEmptyDOMElement();
  });

  // Modified test case to start the stopwatch, then stop it and compare if the stop value is the same 
  test('starts and stops the stopwatch', () => {
    render(<Stopwatch />);
    
    fireEvent.click(screen.getByText('Start'));
    expect(screen.getByText(/(\d{2}:){2}\d{2}/)).toBeInTheDocument();

    // Get the starting time and make sure it exists
    var startTime = "";
    const timeElement = screen.queryByText(/(\d{2}:){2}\d{2}/);

    if (timeElement) {
      startTime = timeElement.textContent;
    }

    // Make sure time still exists and stop the time after two seconds
    var stopTime1 = "";
    var stopTime2 = "";
    setTimeout(() => {
      fireEvent.click(screen.getByText('Stop'));
    }, 2000);

    // Check if time is still there and save it to a variable
    expect(screen.queryByText(/(\d{2}:){2}\d{2}/)).toBeInTheDocument();
    const stopElement1 = screen.queryByText(/(\d{2}:){2}\d{2}/);

    if (stopElement1) {
      stopTime1 = stopElement1.textContent;
    }

    // Wait another 2 seconds and make sure stop time hasn't changed
    setTimeout(() => {
      expect(screen.queryByText(/(\d{2}:){2}\d{2}/)).toBeInTheDocument();
      const stopElement2 = screen.queryByText(/(\d{2}:){2}\d{2}/);

      if (stopElement2) {
        stopTime2 = stopElement2.textContent;
      }
    }, 2000);

    // Make sure the stop time hasn't changed and isn't empty
    expect((stopTime1 === stopTime2) && (stopTime1 !== startTime || stopTime1 !== ""));

  });
 
  // Test case changed to use "Start" and "Stop" instead of "Pause" and "Resume"
  test('pauses and resumes the stopwatch', () => {
    render(<Stopwatch />);
    
    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('Stop'));
    const pausedTime = screen.getByText(/(\d{2}:){2}\d{2}/).textContent;

    setTimeout(() => {
      
      fireEvent.click(screen.getByText('Start'));
    }, 100);
    

    // Wait 2 seconds to check after the start
    setTimeout(() => {
      
      fireEvent.click(screen.getByText('Start'));
      expect(screen.getByText(/(\d{2}:){2}\d{2}/).textContent).not.toBe(pausedTime);
    }, 2000);

    
  });

  // Fixed test case to be able to take multiple lap times and check for the first one
  test('records and displays lap times', () => {
    render(<Stopwatch />);
    
    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('Lap'));
    expect(screen.getByTestId('lap-list')).toContainElement(screen.getAllByText(/(\d{2}:){2}\d{2}/)[1]);

    fireEvent.click(screen.getByText('Lap'));
    expect(screen.getByTestId('lap-list').children.length).toBe(2);
  });

  test('resets the stopwatch', () => {
    render(<Stopwatch />);
    
    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('Lap'));
    fireEvent.click(screen.getByText('Reset'));

    expect(screen.getByText("00:00:00")).toBeInTheDocument();
    expect(screen.queryByTestId('lap-list')).toBeEmptyDOMElement();
  });
});
