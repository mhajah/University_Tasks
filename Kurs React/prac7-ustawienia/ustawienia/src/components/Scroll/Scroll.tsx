import React from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import * as Tabs from '@radix-ui/react-tabs';
import './style.css';

interface IProps {
  val: string,
  content: string
}

interface ScrollAreaProps {
  headers: IProps[];  
}

const ScrollAreaDemo = ({headers}: ScrollAreaProps ) => (
  <ScrollArea.Root className="ScrollAreaRoot">
    <ScrollArea.Viewport className="ScrollAreaViewport">
    {headers.map((header) => (
          <Tabs.Trigger className="TabsTrigger" value={header.val}>
            {header.content}
          </Tabs.Trigger>
        ))}
    </ScrollArea.Viewport>
    <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="vertical">
      <ScrollArea.Thumb className="ScrollAreaThumb" />
    </ScrollArea.Scrollbar>
    <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="horizontal">
      <ScrollArea.Thumb className="ScrollAreaThumb" />
    </ScrollArea.Scrollbar>
    <ScrollArea.Corner className="ScrollAreaCorner" />
  </ScrollArea.Root>
);

export default ScrollAreaDemo;
