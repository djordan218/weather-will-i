import React, { useContext } from 'react';
import { Oval } from 'react-loader-spinner';
import WeatherContext from '../Hooks/WeatherContext';

function LoadingSpinner() {
  const { theme } = useContext(WeatherContext);
  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Oval
        height={200}
        width={200}
        color="#fed402"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#fed402"
        strokeWidth={5}
        strokeWidthSecondary={2}
      />
    </div>
  );
}

export default LoadingSpinner;
