import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getTaskList} from "../actions/taskAction";
import Task from "../components/ProjectBoard/ProjectTasks/ProjectTask"
import {Col} from "react-bootstrap";
import {Link} from "react-router-dom";

class ClosedTasks extends Component {
  componentDidMount() {
    this.props.getTaskList(true);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }

  render() {
    const {tasks} = this.props;

    return (
      <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={"/dashboard"} className="btn btn-light">
                Назад к заявкам
              </Link>
              <h4 className="display-4 text-center">Закрытые заявки</h4>

              {tasks
                .filter((task) => task.closed)
                .map(task => <Col>
                  <Task key={task.id} task={task}/>
                </Col>)
              }
            </div>
          </div>


      </div>
    );
  }
}

ClosedTasks.propTypes = {
  tasks: PropTypes.array.isRequired,
  getTaskList: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  tasks: state.tasks,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {getTaskList}
)(ClosedTasks);
