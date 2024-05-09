import React, { useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import ScrollArea from '../Scroll/Scroll';
import RadioGroup from '../RadioGroup/RadioGroup';
import Select from '../Select/Select';
import Slider from '../Slider/Slider';
import Switch from '../Switch/Switch';
import './style.css';

const tabHeaders = [
  { val: "tab1", content: "Account" },
  { val: "tab2", content: "Password" },
  { val: "tab3", content: "Preferences" }
];

const TabsDemo = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  return (
    <Tabs.Root className="TabsRoot" defaultValue="tab1">
      <Tabs.List className="TabsList" aria-label="Manage your account">
        <ScrollArea headers={tabHeaders}></ScrollArea>
      </Tabs.List>

      <Tabs.Content className="TabsContent" value="tab1">
        <p className="Text">Make changes to your account here. Click save when you're done.</p>
        <fieldset className="Fieldset">
          <label className="LabelTabs" htmlFor="name">Name</label>
          <input 
            className="Input" 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
          />
        </fieldset>
        <fieldset className="Fieldset">
          <label className="LabelTabs" htmlFor="username">Username</label>
          <input 
            className="Input" 
            id="username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
          />
        </fieldset>
        <RadioGroup></RadioGroup>
        <div style={{ display: 'flex', marginTop: 20, justifyContent: 'flex-end' }}>
          <button className="Button green">Save changes</button>
        </div>
      </Tabs.Content>

      <Tabs.Content className="TabsContent" value="tab2">
        <p className="Text">Change your password here. After saving, you'll be logged out.</p>
        <fieldset className="Fieldset">
          <label className="LabelTabs" htmlFor="currentPassword">Current password</label>
          <input 
            className="Input" 
            id="currentPassword" 
            type="password"
            value={currentPassword} 
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </fieldset>
        <fieldset className="Fieldset">
          <label className="LabelTabs" htmlFor="newPassword">New password</label>
          <input 
            className="Input" 
            id="newPassword" 
            type="password"
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </fieldset>
        <fieldset className="Fieldset">
          <label className="LabelTabs" htmlFor="confirmPassword">Confirm password</label>
          <input 
            className="Input" 
            id="confirmPassword" 
            type="password"
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </fieldset>
        <div style={{ display: 'flex', marginTop: 20, justifyContent: 'flex-end' }}>
          <button className="Button blue">Change password</button>
        </div>
      </Tabs.Content>

      <Tabs.Content className='TabsContent' value="tab3">
        <p className="Text">Change preferences here. Click save when you're done.</p>
        <fieldset className="Fieldset">
          <label className="LabelTabs" htmlFor="newPassword">
            Notification Settings
          </label>
          <Select></Select>
          <label className="LabelTabs" htmlFor="newPassword">
            Notification frequency
          </label>
          <Slider></Slider>
          <label className="LabelTabs" htmlFor="newPassword">
            Additional data
          </label>
          <Switch></Switch>
        </fieldset>
        <div style={{ display: 'flex', marginTop: 20, justifyContent: 'flex-end' }}>
          <button className="Button green">Save changes</button>
        </div>
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default TabsDemo;
