import {Button, Modal, InputGroup, FormControl, Form} from "react-bootstrap";
import React from "react";

class EditModal extends React.Component {
  state = {
    inputValue: ""
  }

  componentDidMount(){
    const {editItem} = this.props;
    const paramName = this.getParamName();
    if (editItem) {
      this.setState({inputValue: editItem[paramName]})

    }
  }
  setInputValue = (e) => {
    this.setState({inputValue: e.target.value})
  }

  getParamName = () => {
    const {type} = this.props;
    if (type === "район") {
      return "caption"
    } else if (type === "тип поломки") {
      return "type"
    }
    return null;
  }


  onButtonClick = (e) => {
    const {editItem, onHide} = this.props;
    e.preventDefault();
    const paramName = this.getParamName();
    editItem[paramName] = this.state.inputValue;
    this.props.onClick(editItem)
    onHide();
  }

  render() {
    const {type, onClick, editItem, ...otherProps} = this.props;
    const paramName = this.getParamName();
    let inputValue = ""
    if (editItem) {
      inputValue = editItem[paramName]
    }
    return (
      <Modal
        {...otherProps}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Редактировать {type}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.onButtonClick}>
            <InputGroup className="mb-3">
              <FormControl defaultValue={inputValue} onChange={this.setInputValue} required
                           placeholder={type}/>
              <InputGroup.Append>
                <Button type="submit" variant="primary">Редактировать</Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>

        </Modal.Body>
      </Modal>
    );
  }

}

export default EditModal;