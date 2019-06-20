import React, {Component} from "react";
import "react-datepicker/dist/react-datepicker.css"
import {Badge, Button, Container, Table} from "react-bootstrap";
import axios from "axios";

export  default class Addresses extends Component {
  state = {
    address: []
  }

  componentDidMount() {
    this.fetchData()
      .then(result => {
        this.setState({address: result.data})
      })

  }

  fetchData = () => {
    return axios.get("/api/address")
  }

  downloadResult = () => {
    const link = document.createElement("a");
    link.download = "download";
    link.href = `http://localhost:8080/api/address/download`;
    link.click();
  }

  render() {
    const {address} = this.state;
    return (
      <Container>
        <Table bordered striped responsive={"md"}>
          <thead>
          <tr>
            <th>id</th>
            <th>ФИО</th>
            <th>Адрес</th>
          </tr>
          </thead>
          <tbody>
          {address.length && address.map((elem, key) => {
            const {street, house, flatNumber, fullName} = elem;
            return (
              <tr key={key}>
                <td>{key + 1}</td>
                <td>{fullName}</td>
                <td>{street} {house} {flatNumber}</td>
              </tr>)
          })}
          </tbody>

        </Table>
        <div style={{marginTop: "15px"}}>
          {address.length !== 0 &&
          <Button type={"submit"} variant="primary" style={{marginRight: "15px"}} onClick={() => {
            this.downloadResult()
          }}>Сохранить в Word</Button>
          }
          <Button variant="secondary" disabled>
            Всего количество: <Badge variant="light">{address.length}</Badge>
          </Button>

        </div>
      </Container>
    )
  }
}
