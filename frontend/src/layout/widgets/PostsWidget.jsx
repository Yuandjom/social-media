import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "features/auth/authSlice";
import PostWidget from "./PostWidget"

const PostsWidget = ({userId, isProfile = false}) => {
    const dispatch = useDispatch();
    //grab the post from the global state
    const posts = useSelector((state) => state.posts);
    //grab the token from the global state
    const token = useSelector((state) => state.token)

    //2 API calls
    const getPosts = async() => {
        //do the api call 
        //this will grab all the post
        const response = await fetch(`http://localhost:3001/posts`, {
            method: "GET", 
            headers: {Authorization: `Bearer ${token}`}, //this is to validate the API call 
        })
        //make it usable with 
        const data = await response.json();
        dispatch(setPosts({posts: data}))
    }

    const getUserPosts = async() => {
        //do the api call 
        //this will grab all the post
        const response = await fetch(`http://localhost:3001/posts/${userId}`/posts, {
            method: "GET", 
            headers: {Authorization: `Bearer ${token}`}, //this is to validate the API call 
        })
        //make it usable with 
        const data = await response.json();
        dispatch(setPosts({posts: data}))
    }

    useEffect(() => {
        if(isProfile){
            getUserPosts();
        } else {
            getPosts()
        }
    }, []) //eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            {posts.map(
              ({
                _id, 
                userId, 
                firstName, 
                lastName,
                description, 
                location, 
                picturePath, 
                userPicturePath, 
                likes, 
                comments,
              }) => <PostWidget
              key={_id}
              postid = {_id}
              postUserId = {userId}
              name={`${firstName} ${lastName}`}
              description = {description}
              location = {location}
              picturePath = {picturePath}
              userPicturePath = {userPicturePath}
              likes = {likes}
              comments= {comments}
              
              ></PostWidget>)}
        </>
    )
}

export default PostsWidget