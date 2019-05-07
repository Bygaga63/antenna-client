import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {addTask} from "../../../actions/taskAction";
import Select from "react-select";
import {getBreakdownTypes} from "../../../actions/breakdownTypeActions";
import {getAreas} from "../../../actions/areaActions";
import {getUsers} from "../../../actions/userActions";

class AddTask extends Component {
  constructor(props) {
    super(props);


    this.state = {
      status: "",
      priority: 0,
      dueDate: "",
      breakdownType: [],
      area: {},
      flatNumber: "",
      street: "",
      fullName: "",
      house: "",
      phone: "",
      users: [],
      errors: {},
      // selectedOption: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const {getBreakdownTypes, getAreas, getUsers} = this.props;
    getBreakdownTypes();
    getAreas();
    getUsers();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }

  handleChangeBreakdown = (breakdownType) => {
    this.setState({breakdownType});
  }

  handleChangeUsers = (users) => {
    this.setState({users});
  }

  // on change
  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  //on submit
  onSubmit(e) {
    e.preventDefault();

    const newTask = {
      breakdownType: this.convertOptionToBreakdown(this.state.breakdownType),
      area: this.convertOptionToArea(this.state.area),
      status: this.state.status,
      priority: this.state.priority,
      dueDate: this.state.dueDate,
      customer: this.getCustomer(),
      users: this.convertOptionToUsers(this.state.users),
    };

    this.props.addTask(
      newTask,
      this.props.history
    );
  }

  convertOptionToArea = (choose) => {
    const {area} = this.props;
    if (choose) {
      const result = area.find(elem => elem.id === parseInt(choose, 10))
      if (result) {
        return result;
      }
    }

  }


  convertOptionToBreakdown = (breakdownChooseList) => {
    const {breakdownType} = this.props;
    const result = []
    breakdownChooseList.forEach(choose => {
      const chooseBreakdown = breakdownType.find(type => type.id === choose.value)
      if (chooseBreakdown) {
        result.push(chooseBreakdown)
      }
    })

    return result;
  }

  convertOptionToUsers = (userChooseList) => {
    const {users} = this.props;
    const result = []
    userChooseList.forEach(choose => {
      const chooseUser = users.find(user => user.id === choose.value)
      if (chooseUser) {
        result.push(chooseUser)
      }
    })
    return result;
  }

  breakdownToOptions = (breakdowns) => {
    return breakdowns.map(breakdown => ({value: breakdown.id, label: breakdown.type}));
  }

  userToOptions = (users) => {
    return users.map(user => ({value: user.id, label: user.fullName}));
  }

  getCustomer = () => {
    const {flatNumber, street, fullName, house, phone} = this.state;
    return {
      fullName,
      phone,
      address: {flatNumber, street, house}
    };
  }

  render() {
    // const { errors } = this.state;
    const {breakdownType, area, users} = this.props;
    return (
      <div className="add-PBI">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={"/dashboard"} className="btn btn-light">
                Назад к заявкам
              </Link>
              <h4 className="display-4 text-center">Добавить заявку</h4>
              <form onSubmit={this.onSubmit}>

                <div className="form-group">
                  <Select
                    placeholder={"Тип поломки"}
                    value={this.state.breakdownType}
                    onChange={this.handleChangeBreakdown}
                    options={this.breakdownToOptions(breakdownType)}
                    isMulti
                  />
                </div>

                <div className="form-group">
                  <Select
                    placeholder={"Выберите мастера"}
                    value={this.state.users}
                    onChange={this.handleChangeUsers}
                    options={this.userToOptions(users)}
                    isMulti
                  />
                </div>

                <div className="form-group">
                  <input
                    type={"text"}
                    className="form-control form-control-sm"
                    placeholder="ФИО заказчика"
                    name="fullName"
                    value={this.state.fullName}
                    onChange={this.onChange}
                  />
                </div>

                <div className="form-group">
                  <div className="form-row">
                    <div className="col-md-6">
                      <input
                        type={"text"}
                        className="form-control form-control-sm"
                        placeholder="Улицы"
                        name="street"
                        value={this.state.street}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="col-md-3">
                      <input
                        type={"text"}
                        className="form-control form-control-sm"
                        placeholder="Дом"
                        name="house"
                        value={this.state.house}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="col-md-3">
                      <input
                        type={"text"}
                        className="form-control form-control-sm"
                        placeholder="Квартира"
                        name="flatNumber"
                        value={this.state.flatNumber}
                        onChange={this.onChange}
                      />
                    </div>
                  </div>

                </div>

                <div className="form-group">
                  <input
                    type={"text"}
                    className="form-control form-control-sm"
                    placeholder="Контактный телефон"
                    name="phone"
                    value={this.state.phone}
                    onChange={this.onChange}
                  />
                </div>


                <div className="form-group">
                  <select
                    className="form-control form-control-sm"
                    name="area"
                    value={this.state.area}
                    onChange={this.onChange}
                  >
                    <option value={0}>Выберите район</option>
                    {area.map(elem => <option key={elem.id} value={elem.id}>{elem.caption}</option>)}
                  </select>
                </div>

                <div className="form-group">
                  <select
                    className="form-control form-control-sm"
                    name="priority"
                    value={this.state.priority}
                    onChange={this.onChange}
                  >
                    <option value={0}>Выберите приоритет</option>
                    <option value={1}>Высокий</option>
                    <option value={2}>Средний</option>
                    <option value={3}>Низкий</option>
                  </select>
                </div>


                <div className="form-group">
                  <select
                    className="form-control form-control-sm"
                    name="status"
                    value={this.state.status}
                    onChange={this.onChange}
                  >
                    <option value="">Статус</option>
                    <option value="TO_DO">В ожидание</option>
                    <option value="IN_PROGRESS">В работе</option>
                    <option value="DONE">Готово</option>
                  </select>
                </div>

                <h6>Срок выполнения</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-sm"
                    name="dueDate"
                    value={this.state.dueDate}
                    onChange={this.onChange}
                  />
                </div>

                <input
                  type="submit" value={"Добавить"}
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddTask.propTypes = {
  addTask: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  breakdownType: PropTypes.array.isRequired,
  area: PropTypes.array.isRequired,
  getBreakdownTypes: PropTypes.func.isRequired,
  getAreas: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  getUsers: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  errors: state.errors,
  breakdownType: state.breakdownType,
  area: state.area,
  users: state.users
});

export default connect(
  mapStateToProps,
  {addTask, getBreakdownTypes, getAreas, getUsers}
)(AddTask);

