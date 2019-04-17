import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import classnames from "classnames";
import {Link} from "react-router-dom";
import {editUser} from "../../actions/securityActions";
import {getUsers} from "../../actions/userActions";

class EditUser extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      fullName: "",
      role: "",
      id: 0,
      password: "",
      confirmPassword: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getUsers()
  }

  componentWillReceiveProps(nextProps) {
    const {match} = this.props
    if (nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }

    if (nextProps.users) {
      const user = nextProps.users.find(u => u.id === parseInt(match.params.id, 10))
      // debugger;
      const {username, fullName, id, role} = user;
      this.setState({username, fullName, id, role})
    }


  }

  onSubmit(e) {
    e.preventDefault();
    const user = {
      id: this.state.id,
      username: this.state.username,
      fullName: this.state.fullName,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      role: this.state.role
    };

    this.props.editUser(user);
  }

  onChange(e) {

    if (this.state.errors[e.target.name]) {
      const errors = {...this.state.errors}
      errors[e.target.name] = "";
      this.setState({errors});
    }

    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    const {errors} = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link
                to={`/settings`}
                className="btn btn-light"
              >
                Назад к настройкам
              </Link>
              <h1 className="display-4 text-center">Регистрация</h1>
              <p className="lead text-center">Создать аккаунт</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.fullName
                    })}
                    placeholder="Имя"
                    name="fullName"
                    value={this.state.fullName}
                    onChange={this.onChange}
                  />
                  {errors.fullName && (
                    <div className="invalid-feedback">{errors.fullName}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.username
                    })}
                    placeholder="Логин"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChange}
                  />
                  {errors.username && (
                    <div className="invalid-feedback">{errors.username}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password
                    })}
                    placeholder="Пароль"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.confirmPassword
                    })}
                    placeholder="Подтверждение пароля"
                    name="confirmPassword"
                    value={this.state.confirmPassword}
                    onChange={this.onChange}
                  />
                  {errors.confirmPassword && (
                    <div className="invalid-feedback">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="role"
                    value={this.state.role}
                    onChange={this.onChange}
                  >
                    <option value={"USER"}>Монтажник</option>
                    <option value={"ADMIN"}>Администратор</option>
                    <option value={"OWNER"}>Редактор</option>
                  </select>
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditUser.propTypes = {
  editUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
};

const mapStateToProps = ({errors, users}) => ({
  errors, users
});
export default connect(
  mapStateToProps,
  {editUser, getUsers}
)(EditUser);
