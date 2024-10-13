import React from 'react';

interface Props {
  path: string
  alt: string;
}

const LinkRender: React.FC<Props> = ({ path, alt }) => {
  return <a className='linkRender' href={path} target='_blank'>{alt}</a>
};

export default LinkRender;