import { Card, CardBody } from 'design-react-kit';
import React from 'react';
interface InfoPanelI {
  title?: string;
  list: string[];
  onlyList?: boolean;
  rowsNo?: number;
}

const InfoPanel: React.FC<InfoPanelI> = (props) => {
  const { title, list = [], onlyList = false, rowsNo } = props;
  const rowStyle = rowsNo ? `repeat(${rowsNo}, 1fr)` : 'repeat(3, 1fr)';

  return (
    <div className='info-panel'>
      {onlyList ? (
        <div
          className='info-panel__list-container'
          style={{ gridTemplateRows: `${rowStyle}` }}
        >
          {list.map((item, index) => (
            <div key={index}>
              <p>{item}</p>
            </div>
          ))}
        </div>
      ) : (
        <>
          {title ? <h6 className='info-panel__title'>{title}</h6> : null}

          <Card spacing className='card-bg'>
            <CardBody>
              <div
                className='info-panel__list-container'
                style={{ gridTemplateRows: `${rowStyle}` }}
              >
                {list.map((item, index) => (
                  <div key={index}>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </>
      )}
    </div>
  );
};

export default InfoPanel;
