import "./Loading.css"

const Loading = ({active}) => {
  return (
    <>
    {active && 
        <div className="loading-main">
            <div className="modal"></div>
            <div className="dots"></div>
        </div>
    }
    </>
  )
}

export default Loading