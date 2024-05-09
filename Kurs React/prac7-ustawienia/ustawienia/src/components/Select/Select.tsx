import React, { useState } from 'react';
import * as Select from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import './style.css';

const SelectDemo = () => {
  const [value, setValue] = useState('all');

  return (
    <div className='SelectRoot'>
      <Select.Root value={value} onValueChange={setValue}>
        <Select.Trigger className="SelectTrigger">
          <Select.Value />
          <Select.Icon>
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content className="SelectContent">
            <Select.ScrollUpButton className="SelectScrollButton">
              <ChevronUpIcon />
            </Select.ScrollUpButton>
            <Select.Viewport className="SelectViewport">
              <Select.Group>

                <Select.Item className="SelectItem" value="all">
                  <Select.ItemText>All</Select.ItemText>
                  <Select.ItemIndicator className="SelectItemIndicator">
                    <CheckIcon />
                  </Select.ItemIndicator>
                </Select.Item>

                <Select.Item className="SelectItem" value="important">
                  <Select.ItemText>Only important</Select.ItemText>
                  <Select.ItemIndicator className="SelectItemIndicator">
                    <CheckIcon />
                  </Select.ItemIndicator>
                </Select.Item>

                <Select.Item className="SelectItem" value="none">
                  <Select.ItemText>Turn off all</Select.ItemText>
                  <Select.ItemIndicator className="SelectItemIndicator">
                    <CheckIcon />
                  </Select.ItemIndicator>
                </Select.Item>

              </Select.Group>
              <Select.Separator />
            </Select.Viewport>
            <Select.ScrollDownButton className="SelectScrollButton">
              <ChevronDownIcon />
            </Select.ScrollDownButton>
            <Select.Arrow />
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
};

export default SelectDemo;
