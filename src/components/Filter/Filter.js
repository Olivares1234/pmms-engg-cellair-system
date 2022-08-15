import React from 'react';
import moment from 'moment';
import { Collapse, Row, Col, Button } from 'antd';

const { Panel } = Collapse;

const Filter = ({ filter, setFilter, onResetFilter, onFilter }) => {

  return (
    <Collapse style={{ margin: '10px 0 10px 0' }} defaultActiveKey={[1]}>
      <Panel header="ADVANCE FILTER" key="1">
        <Row gutter={16}>
          <Col lg={{ span: 6 }}>
            <br />
            <Button icon="filter" onClick={onFilter} className="bl-cl" block>Filter</Button>
          </Col>
          <Col lg={{ span: 6 }}>
            <br />
            <Button className="bl-cl" onClick={onResetFilter} icon="undo" block>Reset</Button>
          </Col>
        </Row>
      </Panel>
    </Collapse>
  )
}

export default Filter
