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

  getUserName = (users) => {
    return users.map((user, key) =>{
      let finalString = user.fullName
      if (users.length > 1 && key !== users.length - 1) {
        finalString += ", "
      }
      return finalString;
    })
  }

  render() {
    const { task } = this.props;
    const { flatNumber, street, house } = this.props.task.customer.address;
    let priorityClass;

    if (task.priority === 1) {
      priorityClass = "bg-danger text-light";
    }

    if (task.priority === 2) {
      priorityClass = "bg-warning text-light";
    }

    if (task.priority === 3) {
      priorityClass = "bg-info text-light";
    }

    return (
      <div className="card mb-1 bg-light">
        <div className={`card-header text-primary ${priorityClass}`}>
          {this.getUserName(task.users)}
        </div>
        <div className="card-body bg-light">
          <p className="card-text" style={{marginBottom: 0}}>{street} {house && `д.${house}`} {flatNumber && `кв.${flatNumber}`}</p>
          <hr/>
        <p>{task.breakdownType.map( ({type, id}) => <p style={{marginBottom: 0}} key={id} className="card-text text-truncate ">
            {type}
          </p>)}
        </p>
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
