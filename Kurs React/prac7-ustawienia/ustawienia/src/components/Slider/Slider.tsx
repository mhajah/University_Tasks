import React, { useState } from 'react';
import * as Slider from '@radix-ui/react-slider';
import './style.css';

const SliderDemo = () => {
  const [sliderValue, setSliderValue] = useState([50]);

  return (
    <form>
      <Slider.Root
        className="SliderRoot"
        value={sliderValue} 
        onValueChange={setSliderValue}
        max={100}
        step={1}
      >
        <Slider.Track className="SliderTrack">
          <Slider.Range className="SliderRange" />
        </Slider.Track>
        <Slider.Thumb className="SliderThumb" aria-label="Volume" />
      </Slider.Root>
      <div style={{ marginTop: 20 }}>Current Value: {sliderValue[0]}</div> 
    </form>
  );
};

export default SliderDemo;
