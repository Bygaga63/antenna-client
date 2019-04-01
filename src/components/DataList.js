import React from "react";
import {ListGroup} from "react-bootstrap";

const DataList = ({data, ...otherProps}) => {
  return (
  <ListGroup as="ul">
      {data.map((item) =>
        <DataListItem key={item.id}
                      item={item}
                      {...otherProps}
        />
      )}
  </ListGroup>
  )
};

const DataListItem = ({item, onDelete, onClick, itemField}) => {
  return (
    <ListGroup.Item action onClick={() => onClick(item)}>
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
      {item[itemField]}
      <i className="fa fa-ban" style={{color: "red"}} aria-hidden="true"
         onClick={(e) => e.stopPropagation() | onDelete(item)} />
      </div>
    </ListGroup.Item>
  )
}

export default DataList;

