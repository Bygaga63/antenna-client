import React, {useState} from "react";
import listWithData from "../hoc/listWithData";
import {Col, Container, ListGroup, Row} from "react-bootstrap";
import DataList from "./DataList";

const Settings = () => {
  let titles = ["Сотрудники", "Типы поломок", "Районы"];
  let [active, setActive] = useState(titles[0])
  const ResultList = listWithData(DataList, active)
  return (
    <div className="projects">
      <Container>
        <Row>
          <Col xs={6}>
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">Настройки</span>
            </h4>
            <SettingsMenu titles={titles} active={active} onClick={setActive}/>
          </Col>
          <Col xs={6}>
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">{active}</span>
            </h4>
            <ResultList/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default Settings


const SettingsMenu = ({titles, ...otherProps}) => (
  <ListGroup as="ul">
    {titles.map((name, key) =>
      <SettingsMenuItem key={key}
                        name={name}
                        {...otherProps}/>)}
  </ListGroup>)


const SettingsMenuItem = ({name, active, onClick}) => (
  <ListGroup.Item as="li" active={active === name} onClick={() => onClick(name)}>
    {name}
  </ListGroup.Item>
)


