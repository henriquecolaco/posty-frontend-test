import "./Header.css"
import logo from "../../assets/logo/logo.png"
import CreatePost from "../CreatePost/CreatePost"
import {useState} from "react"

const Header = () => {

  const [active, setActive] = useState(false)
  const handlePostClick = () => {
    setActive(!active)
  }

  return (
    <>
      <header className="main-header">
          <img src={logo} alt="Posty" className="header-logo"/> 
          <button className="create-post-button" onClick={handlePostClick}>
              <i className="create-post-button-icon"></i>
              Criar um post
          </button>
      </header>
      <CreatePost active={active} />
    </>
  )
}

export default Header