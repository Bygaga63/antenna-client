import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {deleteTask} from "../../../actions/taskAction";

class Task extends Component {
  onDeleteClick(taskId) {
    this.props.deleteTask(taskId);
  }
  render() {
    const { task } = this.props;
    let priorityString;
    let priorityClass;

    if (task.priority === 1) {
      priorityClass = "bg-danger text-light";
      priorityString = "высокий";
    }

    if (task.priority === 2) {
      priorityClass = "bg-warning text-light";
      priorityString = "средний";
    }

    if (task.priority === 3) {
      priorityClass = "bg-info text-light";
      priorityString = "низкий";
    }

    return (
      <div className="card mb-1 bg-light">
        <div className={`card-header text-primary ${priorityClass}`}>
          Приоритет: {priorityString}
        </div>
        <div className="card-body bg-light">
          <h5 className="card-title">{task.customer.street}</h5>

          {task.breakdownType.map( ({type, id}) => <p key={id} className="card-text text-truncate ">
            {type}
          </p>)}

          <Link
            to={`/updateTask/${task.id}`}
            className="btn btn-primary"
          >
            Посмотреть
          </Link>

          <button
            className="btn btn-danger ml-4"
            onClick={this.onDeleteClick.bind(
              this,
              task.id
            )}
          >
            Удалить
          </button>
        </div>
      </div>
    );
  }
}

Task.propTypes = {
  deleteTask: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired
};
export default connect(
  null,
  { deleteTask }
)(Task);
