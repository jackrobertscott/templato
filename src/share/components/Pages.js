import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from 'colors-simple';
import { Button, Icon, Tooltip } from '@blueprintjs/core';

const Background = styled.div`
  background-color: ${colors.GREY0};
  border-top: 1px solid ${colors.GREY1};
  color: ${colors.GREY5};
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 30px;
  border-bottom: 1px solid ${colors.GREY1};
`;

const Heading = styled.div`
  font-weight: bold;
  margin-right: auto;
`;

const Files = styled.div`
  display: flex;
  flex-direction: column;
  color: ${colors.GREY4};
  max-height: 200px;
  overflow: auto;
`;

const Item = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  padding: 10px 30px;
  font-size: 13px;
  border-bottom: 1px solid ${colors.GREY0};
  background-color: ${colors.CLOUDS2};
  &:nth-child(2n) {
    background-color: ${colors.CLOUDS4};
  }
  &:last-child {
    border-bottom: none;
  }
  span {
    font-weight: bold;
    min-width: 20px;
  }
`;

const Delete = styled(Icon).attrs({ icon: 'cross' })`
  margin-left: auto;
  cursor: pointer;
  &:hover {
    color: ${colors.RED5};
  }
`;

const Pages = ({
  pages,
  handleDownload,
  handleClearSaved,
  handleRemovePage,
}) => (
  <Background>
    <Actions>
      <Heading>Generated code</Heading>
      {pages.length ? (
        <Button intent="success" onClick={() => handleDownload()}>
          Download
        </Button>
      ) : (
        <Tooltip content="You can download the code after you generate some from a template">
          <Button intent="success">Download</Button>
        </Tooltip>
      )}
      <Button style={{ marginLeft: '10px' }} onClick={() => handleClearSaved()}>
        Remove All
      </Button>
    </Actions>
    <Files>
      {pages.length ? (
        pages.map((save, index) => (
          <Item key={save.created}>
            <span>{index + 1}.</span> {save.folder || '$'}{' '}
            <Icon icon="chevron-right" /> {save.renders.length} files including:{' '}
            {save.renders
              .map(({ name }) => name)
              .join(', ')
              .slice(0, 30)}...
            <Delete onClick={() => handleRemovePage(save.created)} />
          </Item>
        ))
      ) : (
        <Item>
          <Icon icon="circle-arrow-up" /> Go submit some code - the files will
          appear here.
        </Item>
      )}
    </Files>
  </Background>
);

Pages.propTypes = {
  handleClearSaved: PropTypes.func.isRequired,
  handleDownload: PropTypes.func.isRequired,
  handleRemovePage: PropTypes.func.isRequired,
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      created: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default Pages;
