import "./Feed.css"
import {useState, useEffect} from "react"
import AlertBox from "../AlertBox/AlertBox";
import Loading from "../Loading/Loading";

const Feed = () => {

    // API Url
    const postsUrl = "https://jsonplaceholder.typicode.com/posts";
    const usersUrl = "https://jsonplaceholder.typicode.com/users";
    const commentsUrl = "https://jsonplaceholder.typicode.com/comments";

    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [comments, setComments] = useState([]);
    const [fetchErr, setFetchErr] = useState(null);
    const [alertBoxActive, setAlertBoxActive] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [loadingActive, setLoadingActive] = useState(false);

    //GET
    useEffect(() => {

        //GET Posts
        async function fetchPostsData(){
            setLoadingActive(true)
            try{
                const res = await fetch(postsUrl)
                const data = await res.json()        
                setPosts(data)
            }catch(err){
                setFetchErr("Ops! Houve algum erro, tente novamente")
            }
            setLoadingActive(false) 
        }

        //GET Users
        async function fetchUsersData(){
            setLoadingActive(true)
            try{
                const res = await fetch(usersUrl)
                const data = await res.json()        
                setUsers(data)
            }catch(err){
                setFetchErr("Ops! Houve algum erro ao carregar os autores")
            }
            setLoadingActive(false) 
        }

        //GET Comments
        async function fetchCommentsData(){ 
            setLoadingActive(true)    
            try{
                const res = await fetch(commentsUrl)
                const data = await res.json()        
                setComments(data)
            }catch(err){
                setFetchErr("Ops! Houve algum erro ao carregar os comentários")
            }
            setLoadingActive(false) 
        }

        fetchPostsData();
        fetchUsersData();
        fetchCommentsData();

    },[])
    
    // Delete Post
    const deletePost = async (id) =>{
        setLoadingActive(true)
        try{
            const itemUrl = postsUrl + "/" + id
            const res = await fetch( itemUrl, {
                method: "DELETE",
                headers:{
                "Content-Type": "application/json"
                },
            })

            showAlertBox("Post apagado com sucesso")
            
        }catch(err){
            console.log(err)
        }
        setLoadingActive(false)
    }
    
    // Show Alert Box
    const showAlertBox = (message) => {
        setAlertMessage(message)
        setAlertBoxActive(true)
        setTimeout(function() {
            setAlertBoxActive(false)
            setAlertMessage("")
        }, 4000);
    }


    // Find User Name by userId
    const findUserName = (userId) => {
        const findUser = users.find(item => item.id === userId)
        const userName = findUser?.name
        
        return(userName)
    }
  
    // Filter Comments by Post
    const findPostComment = (postId) =>{
        return(
            comments.filter(comment => comment.postId === postId).map(filteredPost => (
                <li key={filteredPost.id} className="item-comment">
                    <p className="item-email">{filteredPost.email}</p><p className="item-body">{filteredPost.body}</p>
                </li>
            ))
        )
    }


    // 
    return (
    <div className="main-feed">
        <Loading active={loadingActive}/>
        {fetchErr && <span className="error-message">{fetchErr}</span>}
        <AlertBox active={alertBoxActive} alertMessage={alertMessage}/>
        <div className="feed-container">
            <ul className="feed-post-list">
                {posts.map((post) => (
                    <li className="feed-post-item" key={post.id}>
                        <button className="delete-post-button" onClick={() => deletePost(post.id)}>Apagar Publicação</button>
                        <i className="item-marker" />
                        <p className="item-title">{post.title}</p>
                        <p className="item-desc">
                            {post.body}
                        </p>
                        <p className="item-author">
                            Por: <span>{findUserName(post.userId)}</span>
                        </p>
                        <div className="item-comments-main" >
                            <ul>
                                {findPostComment(post.id)}
                            </ul>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
    )
}

export default Feed