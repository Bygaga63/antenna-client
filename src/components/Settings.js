import React, {Component} from "react";
import classnames from "classnames";
import listWithData from "../hoc/listWithData";
import {getUsers, removeUser} from "../actions/userActions";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getAreas, removeArea} from "../actions/areaActions";
import {getBreakdownTypes, removeBreakdownType} from "../actions/breakdownTypeActions";
import {Link} from "react-router-dom";

class Settings extends Component {
  state = {
    active: "Сотрудники"
  }

  onMenuItemClick = (name) => {
    this.setState(({active}) => {
      return {active: name}
    })
  }

  renderItemList = () => {
    const {getUsers, getAreas, getBreakdownTypes, removeArea, removeBreakdownType, removeUser} = this.props;
    const view = []
    let button = {};

    switch (this.state.active) {
      case "Сотрудники":
        button.name = "Добавить сотрудника"
        button.path = "/addUser"
        view.push(<UserList
          onClick={() => console.log("click")}
          onDelete={(user) => (removeUser(user))}
          getData={getUsers}
        />)
        break;

      case "Типы поломок":
        button.name = "Добавить тип поломки"
        button.path = "/addBreak"
        view.push(<BreakdownTypeList
          onClick={() => console.log("click")}
          onDelete={(breakdown) => (removeBreakdownType(breakdown))}
          getData={getBreakdownTypes}
        />)
        break;

      case "Районы":
        button.name = "Добавить район"
        button.path = "/addArea"
        view.push(<AreaList
          onClick={() => console.log("click")}
          onDelete={(area) => (removeArea(area))}
          getData={getAreas}
        />)
        break;

      default:
        return null;
    }
    view.push(<Link key={2} to={button.path} className="btn btn-primary btn-lg btn-block">
      {button.name}
    </Link>)

    return view;
  }

  settingsItems = ["Сотрудники", "Типы поломок", "Районы"]

  render() {
    const {active} = this.state;
    return (
      <div className="projects">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">Настройки</span>
              </h4>
              <div className="list-group">
                {this.settingsItems.map((name, key) =>
                  <MenuItem key={key}
                            active={active}
                            name={name}
                            onClick={this.onMenuItemClick}
                  />)}
              </div>

            </div>
            <div className="col-md-6">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">{active}</span>
              </h4>
              {this.renderItemList()}

            </div>
          </div>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  getUsers: PropTypes.func.isRequired,
  getAreas: PropTypes.func.isRequired,
  getBreakdownTypes: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired,
  removeArea: PropTypes.func.isRequired,
  removeBreakdownType: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  // project: state.project
});

export default connect(
  mapStateToProps,
  {getUsers, getAreas, getBreakdownTypes, removeUser, removeArea, removeBreakdownType}
)(Settings);


const MenuItem = ({name, active, onClick}) => (
  <button type="button" className={classnames("list-group-item list-group-item-action", {active: active === name})}
          onClick={() => onClick(name)}>{name}</button>
)


const DataList = ({data, ...otherProps}) => {
  return (
    <ul className="list-group">
      {data.map((item) =>
        <DataListItem key={item.id}
                      item={item}
                      {...otherProps}
        />
      )}
    </ul>
  )


}

const UserList = listWithData(DataList, "fullName")
const AreaList = listWithData(DataList, "caption")
const BreakdownTypeList = listWithData(DataList, "type")

const DataListItem = ({item, onDelete, onClick, type}) => {
  return (<li onClick={() => onClick(item.id)}
              className="list-group-item align-items-center d-flex justify-content-between align-items-center">
      {item[type]}
      <i className="fa fa-ban" style={{color: "red"}} aria-hidden="true"
         onClick={(e) => e.stopPropagation() | onDelete(item)}/>
    </li>
  )
}