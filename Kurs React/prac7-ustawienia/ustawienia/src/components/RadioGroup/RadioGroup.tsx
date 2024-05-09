import React, { useState } from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';
import './style.css';

const RadioGroupDemo = () => {
  const [selectedValue, setSelectedValue] = useState('default');

  return (
    <form>
      <RadioGroup.Root
        className="RadioGroupRoot"
        value={selectedValue}
        onValueChange={setSelectedValue}
        aria-label="Gender"
      >
        <div style={{ display: 'flex', alignItems: 'center', padding: '5px' }}>
          <RadioGroup.Item className="RadioGroupItem" value="default" id="r1">
            <RadioGroup.Indicator className="RadioGroupIndicator" />
          </RadioGroup.Item>
          <label className="LabelRadio" htmlFor="r1">Male</label>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', padding: '5px' }}>
          <RadioGroup.Item className="RadioGroupItem" value="comfortable" id="r2">
            <RadioGroup.Indicator className="RadioGroupIndicator" />
          </RadioGroup.Item>
          <label className="LabelRadio" htmlFor="r2">Female</label>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', padding: '5px' }}>
          <RadioGroup.Item className="RadioGroupItem" value="compact" id="r3">
            <RadioGroup.Indicator className="RadioGroupIndicator" />
          </RadioGroup.Item>
          <label className="LabelRadio" htmlFor="r3">Other</label>
        </div>
      </RadioGroup.Root>
    </form>
  );
};

export default RadioGroupDemo;
