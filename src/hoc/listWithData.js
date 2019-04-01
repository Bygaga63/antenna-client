import React from "react";
import Spinner from "../components/Spinner";
import {getUsers, removeUser} from "../actions/userActions";
import {addBreakdownType, getBreakdownTypes, removeBreakdownType} from "../actions/breakdownTypeActions";
import {addArea, getAreas, removeArea} from "../actions/areaActions";
import {connect} from "react-redux";

import PropTypes from "prop-types";
import AddModal from "../components/modal/add/AddModal";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

const listWithData = (Component, active) => {
  class WithData extends React.Component {

    state = {
      showModal: false
    };

    toggleModal = () => this.setState({showModal: !this.state.showModal})

    componentDidMount() {
      const {getData} = this.update();
      getData();
    }

    update() {
      const {getAreas, getBreakdownTypes, getUsers, area, breakdownType, addArea, addBreakdownType, users, removeArea, removeBreakdownType, removeUser} = this.props;
      const {showModal} = this.state;
      let data, getData, onDelete, itemField, modal, button;
      switch (active) {
        case "Сотрудники" :
          getData = getUsers;
          data = users;
          onDelete = removeUser;
          itemField = "fullName"
          button =
            <Link to={"/settings/addUser"} className="btn btn-primary btn-lg btn-block">Добавить сотрудника</Link>
          break;
        case "Районы":
          getData = getAreas;
          data = area;
          onDelete = removeArea;
          itemField = "caption";
          modal = <AddModal onClick={addArea} show={showModal} onHide={this.toggleModal} type={"район"}/>;
          button = <Button block size={"lg"} onClick={this.toggleModal} variant="primary">Добавить район</Button>
          break;
        case "Типы поломок":
          getData = getBreakdownTypes;
          data = breakdownType;
          onDelete = removeBreakdownType;
          itemField = "type";
          modal =
            <AddModal show={showModal} onClick={addBreakdownType} onHide={this.toggleModal} type={"тип поломки"}/>;
          button = <Button block size={"lg"} onClick={this.toggleModal} variant="primary">Добавить тип поломки</Button>
          break;
        default:
          return null;
      }
      return {data, getData, onDelete, itemField, modal, button}
    }

    render() {
      const {data, onDelete, itemField, modal, button} = this.update();

      if (data.length) {
        return <React.Fragment>
          <Component {...this.props} onDelete={onDelete} data={data} itemField={itemField}/>
          {button}
          {modal}
        </React.Fragment>
      }
      return <Spinner/>
    }
  }

  WithData.propTypes = {
    getUsers: PropTypes.func.isRequired,
    getAreas: PropTypes.func.isRequired,
    getBreakdownTypes: PropTypes.func.isRequired,
    addArea: PropTypes.func.isRequired,
    addBreakdownType: PropTypes.func.isRequired,
    removeUser: PropTypes.func.isRequired,
    removeArea: PropTypes.func.isRequired,
    removeBreakdownType: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
    breakdownType: PropTypes.array.isRequired,
    area: PropTypes.array.isRequired
  };

  const mapStateToProps = ({users, breakdownType, area}) => ({
    users, breakdownType, area
  });

  return connect(
    mapStateToProps,
    {
      getUsers, getAreas, getBreakdownTypes,
      removeUser, removeArea, removeBreakdownType,
      addArea, addBreakdownType
    }
  )(WithData);
};

export default listWithData;



