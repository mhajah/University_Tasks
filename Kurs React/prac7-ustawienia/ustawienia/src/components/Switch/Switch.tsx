import React from 'react';
import * as Switch from '@radix-ui/react-switch';
import './style.css';

const SwitchDemo = () => (
  <form>
    <div>

      <Switch.Root className="SwitchRoot" id="airplane-mode">
        <Switch.Thumb className="SwitchThumb" />
      </Switch.Root>
    </div>
  </form>
);

export default SwitchDemo;