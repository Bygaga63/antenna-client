import React from "react";
import Spinner from "../components/Spinner";
import {getUsers, removeUser} from "../actions/userActions";
import {
  addBreakdownType,
  editBreakdownType,
  getBreakdownTypes,
  removeBreakdownType
} from "../actions/breakdownTypeActions";
import {addArea, editArea, getAreas, removeArea} from "../actions/areaActions";
import {connect} from "react-redux";

import PropTypes from "prop-types";
import AddModal from "../components/modal/add/AddModal";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import EditModal from "../components/modal/edit/EditModal";

const listWithData = (Component, active) => {
  class WithData extends React.Component {


    state = {
      showAddModal: false,
      showEditModal: false,
      editItem: null,
    };

    toggleAddModal = () => this.setState({showAddModal: !this.state.showAddModal})
    toggleEditModal = (item) => {
      this.setState({showEditModal: !this.state.showEditModal, editItem: item})
    }

    componentDidMount() {
      const {getData} = this.update();
      getData();
    }

    update() {
      const {getAreas, editArea, editBreakdownType, getBreakdownTypes, getUsers, area, breakdownType, addArea, addBreakdownType, users, removeArea, removeBreakdownType, removeUser} = this.props;
      const {showAddModal, showEditModal, editItem} = this.state;
      let data, getData, onDelete, itemField, addModal, button, editModal;
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
          addModal = <AddModal onClick={addArea} show={showAddModal} onHide={this.toggleAddModal} type={"район"}/>;
          editModal = <EditModal editItem={editItem} onClick={editArea} show={showEditModal} onHide={this.toggleEditModal} type={"район"}/>;
          button = <Button block size={"lg"} onClick={this.toggleAddModal} variant="primary">Добавить район</Button>
          break;
        case "Типы поломок":
          getData = getBreakdownTypes;
          data = breakdownType;
          onDelete = removeBreakdownType;
          itemField = "type";
          addModal = <AddModal show={showAddModal} onClick={addBreakdownType} onHide={this.toggleAddModal} type={"тип поломки"}/>;
          editModal = <EditModal editItem={editItem} onClick={editBreakdownType} show={showEditModal} onHide={this.toggleEditModal} type={"тип поломки"}/>;
          button = <Button block size={"lg"} onClick={this.toggleAddModal} variant="primary">Добавить тип поломки</Button>
          break;
        default:
          return null;
      }
      return {data, getData, onDelete, itemField, addModal, button, editModal}
    }

    render() {
      const {data, onDelete, itemField, addModal, button, editModal} = this.update();

      if (data.length) {
        return <React.Fragment>
          <Component {...this.props} onDelete={onDelete} data={data} itemField={itemField} onClick={this.toggleEditModal}/>
          {button}
          {addModal}
          {editModal}
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
    editBreakdownType: PropTypes.func.isRequired,
    editArea: PropTypes.func.isRequired,
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
      addArea, addBreakdownType, editBreakdownType, editArea
    }
  )(WithData);
};

export default listWithData;



