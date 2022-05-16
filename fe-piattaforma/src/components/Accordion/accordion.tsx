import clsx from 'clsx';
import {
  Accordion as AccordionKit,
  AccordionBody,
  AccordionHeader,
  Button,
  Icon,
} from 'design-react-kit';
import React, { memo, useState } from 'react';

interface AccordionI {
  title: string;
  totElem: number;
  children?: JSX.Element | JSX.Element[];
  cta?: string;
  className?: string;
}

const Accordion: React.FC<AccordionI> = (props) => {
  const { title, totElem, children, cta, className } = props;
  const [collapseOpen, setCollapseOpen] = useState(false);

  return (
    <AccordionKit iconLeft className={clsx(className)}>
      <AccordionHeader
        active={collapseOpen}
        onToggle={() => setCollapseOpen(!collapseOpen)}
      >
        {title} ({totElem | 0})
      </AccordionHeader>
      <AccordionBody active={collapseOpen}>
        {children}
        {cta && (
          <div className='d-flex justify-content-end'>
            <Button
              onClick={() => console.log('cta')}
              className='d-flex justify-content-between'
            >
              <Icon
                color='primary'
                icon='it-plus-circle'
                size='sm'
                className='mr-2'
              />
              {cta}
            </Button>
          </div>
        )}
      </AccordionBody>
    </AccordionKit>
  );
};

export default memo(Accordion);
