import React, {Component, Fragment} from "react";
import {Link} from "react-router-dom";
import Backlog from "./Backlog";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getTaskList} from "../../actions/taskAction";

class ProjectBoard extends Component {
  //constructor to handle errors
  constructor() {
    super();
    this.state = {
      errors: {}
    };
  }

  componentDidMount() {
    // const { id } = this.props.match.params;
    this.props.getTaskList(false);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }

  render() {
    const {tasks} = this.props;
    const {errors} = this.state;
    let BoardContent;

    const boardAlgorithm = (errors, tasks) => {
      if (tasks.length < 1) {
        //PROJECT IDENTIFIER BUG
        if (errors.projectNotFound) {
          return (
            <div className="alert alert-danger text-center" role="alert">
              {errors.projectNotFound}
            </div>
          );
        } else if (errors.projectIdentifier) {
          return (
            <div className="alert alert-danger text-center" role="alert">
              {errors.projectIdentifier}
            </div>
          );
        } else {
          return (
            <div className="alert alert-info text-center" role="alert">
              Список пока пуст
            </div>
          );
        }
      } else {
        return <Backlog data={tasks}/>;
      }
    };

    BoardContent = boardAlgorithm(errors, tasks);
    const {user} = this.props.security;
    return (
      <div className="container">
        {user.role !== "USER" &&
        <Fragment>
          <Link to={`/addTask`} className="btn btn-primary mb-3" style={{marginRight: "20px"}}>
            <i className="fas fa-plus-circle"> Создать заявку </i>
          </Link>
          < Link to={`/report`} className="btn btn-primary mb-3">
            <i className="fas fa-plus-circle"> Сформировать отчет </i>
          </Link>
          <br/>
          <hr/>
        </Fragment>
        }
        {BoardContent}
      </div>
    );
  }
}

ProjectBoard.propTypes = {
  tasks: PropTypes.array.isRequired,
  getTaskList: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  tasks: state.tasks,
  errors: state.errors,
  security: state.security
});

export default connect(
  mapStateToProps,
  {getTaskList}
)(ProjectBoard);
