import {Button, Modal, InputGroup, FormControl, Form} from "react-bootstrap";
import React, {useState} from "react";

const EditModal = ({item, onClick, ...otherProps}) => {
  const [inputValue, setInputValue] = useState(null)

  // if (item.type) {
  //
  // } else if ()
  //
  const onButtonClick = (e) => {
    e.preventDefault();
    onClick(inputValue)
    otherProps.onHide();
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
        <Form onSubmit={onButtonClick}>
          <InputGroup className="mb-3">
            <FormControl  onChange={(e) => setInputValue(e.target.value)} required placeholder={type}/>
            <InputGroup.Append>
              <Button type="submit" variant="primary">Добавить</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form>

      </Modal.Body>
    </Modal>
  );
}

export default AddModal;