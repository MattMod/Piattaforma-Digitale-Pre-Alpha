import React from 'react';
import { Button, ButtonProps } from 'design-react-kit';

export interface ButtonInButtonsBar extends ButtonProps {
  text: string;
}

interface StickyButtonsI {
  buttons: ButtonInButtonsBar[];
}

const ButtonsBar: React.FC<StickyButtonsI> = ({ buttons = [] }) => {
  return (
    <div className='buttons-bar'>
      {buttons.map((button: ButtonInButtonsBar, index: number) => (
        <Button key={index} {...button}>
          {button.text}
        </Button>
      ))}
    </div>
  );
};

export default ButtonsBar;
