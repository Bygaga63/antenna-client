import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import "react-datepicker/dist/react-datepicker.css"
import {downloadReports, getReports} from "../actions/reportActions";
import history from "../global/history"
import {Badge, Button, ButtonToolbar, Card, Col, Container, Form, Nav, Navbar, Row, Table} from "react-bootstrap";

class Report extends Component {
  state = {
    userId: null
  }

  componentDidMount() {
    const {match, getReports} = this.props
    if (match.params.reportId) {
      const reportSettings = JSON.parse(atob(match.params.reportId))
      this.setState({userId: reportSettings.user})
      getReports(reportSettings)
    } else {
      history.push("/report")
    }
  }

  statusConverter = (status) => {
    switch (status) {
      case "TO_DO" :
        return "В ожидание"
      case "IN_PROGRESS" :
        return "В работе"
      case "DONE" :
        return "Готово"
    }
  }

  render() {
    const {reports} = this.props;
    const {userId} = this.state;
    return (
      <Container>

        {reports.map(report => {
          const {breakdownType, createAt, id, users, customer, status} = report
          const {street, house, flatNumber} = customer.address;
          let currentUser = users.find(user => user.id = userId);
          return <div key={id}>
            <Table bordered striped responsive={"md"}>
              <thead>
              <tr>
                <th align={"center"} colSpan={2}>{currentUser && currentUser.fullName}</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Дата создания</td>
                <td>{createAt}</td>
              </tr>
              <tr>
                <td>Типы поломок</td>
                <td>{breakdownType.map(breakType => breakType.type).join(", ")}</td>
              </tr>
              <tr>
                <td>ФИО заказчика</td>
                <td>{customer.fullName}</td>
              </tr>
              <tr>
                <td>Телефон</td>
                <td>{customer.phone}</td>
              </tr>
              <tr>
                <td>Адрес</td>
                <td>{street} {house} {flatNumber}</td>
              </tr>
              <tr>
                <td>Статус</td>
                <td>{this.statusConverter((status))}</td>
              </tr>
              </tbody>
            </Table>
          </div>
        })
        }
        <div style={{marginTop: "15px"}}>
          {reports.length !== 0 && <Form action="http://127.0.0.1:8080/api/report" method={"GET"}>
            <Button type={"submit"} variant="primary" style={{marginRight: "15px"}}>Сохранить в Word</Button>
          </Form>
          }
          <Button variant="secondary" disabled>
            Всего количество: <Badge variant="light">{reports.length}</Badge>
          </Button>

        </div>
      </Container>
    )
  }
}

Report.propTypes = {
  errors: PropTypes.object.isRequired,
  reports: PropTypes.array.isRequired,
  getReports: PropTypes.func.isRequired,
  downloadReports: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  errors: state.errors,
  reports: state.reports
});

export default connect(
  mapStateToProps,
  {getReports, downloadReports}
)(Report);