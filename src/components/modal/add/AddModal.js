import {Button, Modal, InputGroup, FormControl, Form} from "react-bootstrap";
import React, {useState} from "react";

const AddModal = ({type, onClick, errors, itemField, ...otherProps}) => {
  const [inputValue, setInputValue] = useState(null)

  const onButtonClick = (e) => {
    e.preventDefault();
    onClick(inputValue)
    otherProps.onHide()
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
          Добавить новый {type}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onButtonClick}>
          <InputGroup className="mb-3">
            <FormControl className={errors[itemField] && "is-invalid"} onChange={(e) => setInputValue(e.target.value)} required placeholder={type}/>
            {errors[itemField] && (
              <div className="invalid-feedback">{errors[itemField]}</div>
            )}
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