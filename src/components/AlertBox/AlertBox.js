import "./AlertBox.css"
import {useState} from "react"

const AlertBox = ({active, alertMessage}) => {
  return (
    <>
    {active && 
      <div className="alert-box-main">
        <span>
          {alertMessage}
        </span>
      </div>
    }
    </>
  )
}

export default AlertBox