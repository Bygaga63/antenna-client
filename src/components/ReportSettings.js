import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import Select from "react-select";
import {getUsers} from "../actions/userActions";
import {getBreakdownTypes} from "../actions/breakdownTypeActions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import ru from 'date-fns/locale/ru';
import {Button, Col, Form, Row} from "react-bootstrap";
import history from "../global/history"

class ReportSettings extends Component {

  getStartDate = () => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    return date;
  }

  state = {
    start: this.getStartDate(),
    end: new Date(),
    breakdownType: [],
    user: null,
    status: "",
    isOpen: false
  }

  componentDidMount() {
    const {getBreakdownTypes, getUsers, users, breakdownType} = this.props;
    if (users.length === 0) {
      getUsers("USER");
    }
    if (breakdownType.length === 0) {
      getBreakdownTypes();
    }
  }

  handleChangeBreakdown = (breakdownType) => {
    this.setState({breakdownType});
  }

  handleChangeUsers = (user) => {
    this.setState({user});
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }

  breakdownToOptions = (breakdowns) => {
    let result = breakdowns.map(breakdown => ({value: breakdown.id, label: breakdown.type}));
    result.unshift({value: 0, label: "все поломки"})
    return result;
  }

  userToOptions = (users) => {
    return users.map(user => ({value: user.id, label: user.fullName}));
  }

  handleChangeStartDate = (date) => {
    this.setState({
      start: date
    });
    this.toggleCalendar()
  }

  handleChangeEndDate = (date) => {
    this.setState({
      start: date
    });
    this.toggleCalendar()
  }


  toggleCalendar = (e) => {
    e && e.preventDefault()
    this.setState({isOpen: !this.state.isOpen})
  }

  formatDate = (date) => {
    var monthNames = [
      "Январь", "Феварль", "Март",
      "Апрель", "Май", "Июнь", "Июль",
      "Август", "Сентябрь", "Октябрь",
      "Ноябрь", "Декабрь"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

  convertOptionToUsers = (userChooseList) => {
    const {users} = this.props;
    let result = []
    userChooseList.forEach(choose => {
      const chooseUser = users.find(user => user.id === choose.value)

      if (chooseUser) {
        return result.push(chooseUser.id)
      }
    })
    return result;
  }

  convertOptionToBreakdown = (breakdownChooseList) => {
    const {breakdownType} = this.props;
    const result = []
    breakdownChooseList.forEach(choose => {

      if (choose.value === 0) {
        result.push(choose.value)
        return;
      }

      const chooseBreakdown = breakdownType.find(type => type.id === choose.value)

      if (chooseBreakdown) {
        result.push(chooseBreakdown.id)
      }
    })

    return result;
  }

  onSubmit = (e) => {
    e.preventDefault();

    const reportSettings = {
      breakdownType: this.convertOptionToBreakdown(this.state.breakdownType),
      status: this.state.status,
      start: this.state.start,
      end: this.state.end,
      users: this.convertOptionToUsers(this.state.user),
    };

    history.push("/report/" + btoa(JSON.stringify(reportSettings)))

  }

  render() {
    const {breakdownType, users} = this.props;
    return (
      <div className="add-PBI">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={"/dashboard"} className="btn btn-light">
                Назад к заявкам
              </Link>
              <h4 className="display-4 text-center">Создание отчета</h4>
              <Form onSubmit={this.onSubmit}>

                <Form.Group as={Row} controlId="formHorizontalEmail">
                <Form.Label column sm={2}>
                  Период
                </Form.Label>
                <Col sm={10}>
                  <Button block variant="outline-secondary"
                          onClick={this.toggleCalendar}
                  >{this.formatDate(this.state.start)}</Button>
                </Col>
              </Form.Group>

                {
                  this.state.isOpen && (
                    <DatePicker
                      selected={this.state.start}
                      onChange={this.handleChangeStartDate}
                      dateFormat="dd-MM-yyyy"
                      locale={ru}
                      withPortal
                      inline
                      onClickOutside={this.toggleCalendar}
                    />)
                }

                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={2}>
                    Период
                  </Form.Label>
                  <Col sm={10}>
                    <Button block variant="outline-secondary"
                            onClick={this.toggleCalendar}
                    >{this.formatDate(this.state.end)}</Button>
                  </Col>
                </Form.Group>

                {
                  this.state.isOpen && (
                    <DatePicker
                      selected={this.state.end}
                      onChange={this.handleChangeEndDate}
                      dateFormat="dd-MM-yyyy"
                      locale={ru}
                      withPortal
                      inline
                      onClickOutside={this.toggleCalendar}
                    />)
                }

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
                  <select
                    className="form-control form-control-sm"
                    name="status"
                    value={this.state.status}
                    onChange={this.onChange}
                  >
                    <option value="">Статус</option>
                    <option value="ALL">Все</option>
                    <option value="TO_DO">В ожидание</option>
                    <option value="IN_PROGRESS">В работе</option>
                    <option value="DONE">Готово</option>

                  </select>
                </div>

                <input
                  type="submit" value={"Сформировать"}
                  className="btn btn-primary btn-block mt-4"
                />
              </Form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ReportSettings.propTypes = {
  errors: PropTypes.object.isRequired,
  breakdownType: PropTypes.array.isRequired,
  getBreakdownTypes: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  getUsers: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  errors: state.errors,
  breakdownType: state.breakdownType,
  users: state.users
});

export default connect(
  mapStateToProps,
  {getUsers, getBreakdownTypes}
)(ReportSettings);
