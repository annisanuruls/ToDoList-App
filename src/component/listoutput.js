import React from "react";

function ListOutput({lists, handleDelete, handleEdit}){
    return(
      <div>
        {
          lists.map((list, index) => {
            return(
              <div className="output-wrapper" key={index}>
                <input className="checkbox" type="checkbox" ></input>
                <div className="list-output">
                    <p className="task">{list.names}</p>
                    <p className="date">{list.times}</p>
                </div>
                <div className="button-output">
                    <button className="edit-button" onClick={() => handleEdit(list.id)}>Edit</button>
                    <button className="delete-button" onClick={() => handleDelete(list.id)}>Delete</button>
                </div>
              </div>
            )
          })
        }
      </div>
    )
}

export default ListOutput;