import React, { Fragment } from 'react';
import { Container, Divider } from './Styles';

interface IProp {
  items: (string | undefined)[];
}

const Breadcrumbs: React.FC<IProp> = ({ items }) => (
  <Container>
    {items.map((item, index) => (
      <Fragment key={item}>
        {index !== 0 && <Divider>/</Divider>}
        {item}
      </Fragment>
    ))}
  </Container>
);

export default Breadcrumbs;
