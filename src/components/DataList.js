import React from "react";

const DataList = ({data, ...otherProps}) => {
  return (
    <ul className="list-group">
      {data.map((item) =>
        <DataListItem key={item.id}
                      item={item}
                      {...otherProps}
        />
      )}
    </ul>
  )
};

const DataListItem = ({item, onDelete, onClick, type}) => {
  return (<li onClick={() => onClick(item.id)}
              className="list-group-item align-items-center d-flex justify-content-between align-items-center">
      {item[type]}
      <i className="fa fa-ban" style={{color: "red"}} aria-hidden="true"
         onClick={(e) => e.stopPropagation() | onDelete(item)}/>
    </li>
  )
}

export default DataList;

