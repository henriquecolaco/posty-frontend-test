import "./CreatePost.css"
import {useState} from "react"
import AlertBox from "../AlertBox/AlertBox";
import Loading from "../Loading/Loading";

const CreatePost = ({active}) => {

    const postsUrl = "https://jsonplaceholder.typicode.com/posts";
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [alertBoxActive, setAlertBoxActive] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [loadingActive, setLoadingActive] = useState(false)

    //Create post
    const handleSubmit = async (e) =>{

        setLoadingActive(true)
        e.preventDefault();

        const userId = 1

        const post = {
            userId,
            title,
            body
        }

        const res = await fetch(postsUrl, {
        method: "POST",
        headers:{
            "Content-Type" : "application/json"
            },
            body: JSON.stringify(post),
        }) 

        setTitle("")
        setBody("")
        setLoadingActive(false)
        showAlertBox("Post publicado com sucesso")
    }

    // Show alert box
    const showAlertBox = (message) => {
        setAlertMessage(message)
        setAlertBoxActive(true)
        setTimeout(function() {
            setAlertBoxActive(false)
            setAlertMessage("")
        }, 4000);
    }

    return (
        <>
            <Loading active={loadingActive}/>
            <AlertBox active={alertBoxActive} alertMessage={alertMessage}/>
            {active &&
                <div className="create-post-main">
                    <form onSubmit={handleSubmit} className="create-post-form">
                        <input type="text" value={title} className="form-title" name="title" onChange={(e) => setTitle(e.target.value)} placeholder="Título do post"/>
                        <textarea type="text" value={body} className="form-body" name="body" onChange={(e) => setBody(e.target.value)} placeholder="Escreva aqui sua publicação..."/>
                        <div className="preview">
                            <div className="upper-divisor">
                                <div className="line"></div>
                                <span>Prévia</span>
                                <div className="line"></div>
                            </div>
                            <div className="post-preview">
                                <div className="post-preview-marker"></div>
                                <p className="post-preview-tile">
                                    {title && title}
                                    {!title && "Sem Título"}
                                </p>
                                <p className="post-preview-body">
                                    {body && body}
                                    {!body && "..."}
                                </p>
                            </div>
                        </div>
                        {title && body && <input type="submit" value="Publicar" className="form-submit"/>}
                        {!title || !body && <input type="submit" disabled value="Publicar" className="form-submit-disabled"/>}
                        {!title && !body && <input type="submit" disabled value="Publicar" className="form-submit-disabled"/>}
                    </form>         
                </div>
            }
        </>
    )
}

export default CreatePost
