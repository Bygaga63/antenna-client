import React, {Component} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {updateTask} from "../../../actions/taskAction";

class Task extends Component {
  onCloseClick(task) {
    task.closed = !task.closed
    this.props.updateTask(task);
  }
  render() {
    const { task } = this.props;
    const { flatNumber, street, house } = this.props.task.customer.address;
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
          <h5 className="card-title">{street} {house && `д.${house}`} {flatNumber && `кв.${flatNumber}`}</h5>

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
            onClick={this.onCloseClick.bind(
              this,
              task
            )}
          >
            {task.closed ? "Открыть": "Закрыть"}
          </button>
        </div>
      </div>
    );
  }
}

Task.propTypes = {
  updateTask: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired
};
export default connect(
  null,
  { updateTask }
)(Task);
