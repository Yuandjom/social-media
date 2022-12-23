import {
    EditOutlined, 
    DeleteOutlined, 
    AttachFileOutlined, 
    GifBoxOutlined, 
    ImageOutlined, 
    MicOutlined, 
    MoreHorizOutlined,
    PostAdd
} from "@mui/icons-material"
import {Box, Divider, Typography, InputBase, useTheme, Button, IconButton, useMediaQuery} from '@mui/material'

import Dropzone from "react-dropzone"
import UserImage from "components/UserImage"
import WidgetWrapper from "components/WidgetWrapper"
import FlexBetween from "components/FlexBetween"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPosts } from "features/auth/authSlice"

const MyPostWidget = ({picturePath}) => {
    //this is the action 
    const dispatch = useDispatch()
    //this is going to set the image button whether the person want to drop the image or not
    const [isImage, setIsImage] = useState(false)
    //this is the actual image if they actually drop it 
    const [image, setImage] = useState(null);
    //this represents the content of the post 
    const [post, setPost] = useState(""); 
    //grab the colours
    const {palette} = useTheme()
    /**We grab the id from the user and send this id to the backend to know who is the person */
    const {_id} = useSelector((state) => state.user)
    const token = useSelector((state) => state.token)
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)")
    const mediumMain = palette.neutral.mediumMain
    const medium = palette.neutral.medium

    //this is to handle the post and make the API call 
    const handlePost = async() => {
        //sicne we are using an image, we use formData
        /**
         * Usually for these data is when u input the values in the post req that the return this will send that 
         * req to the backend api 
         */
        const formData = new FormData()
        formData.append("userId", _id)
        formData.append("description", post)
        if(image){ //this is grabbing the image and uploading here from server.js: app.post("/posts", verifyToken, upload.single("picture"), createPost);
            formData.append("picture", image)
            formData.append("picturePath", image.name)
        }
        const response = await fetch(`http://localhost:3001/posts` , {
            method: "POST", 
            headers: {Authorization: `Bearer ${token}`}, 
            body: formData, 
        });
        const posts = await response.json();
        //Dispatch is so that u can call that function to set an action 
        dispatch(setPosts({posts}))
        /**
         * This is to reset the state
         */
        setImage(null)
        setPost("")
    }
    
    return (

        /**
         * See the InputBase (where u can key in what u want), the setPost state is updated based on the e.target.value
         */
        <WidgetWrapper>
        <FlexBetween gap="1.5rem">
          <UserImage image={picturePath} />
          <InputBase
            placeholder="What's on your mind..."
            onChange={(e) => setPost(e.target.value)}
            value={post}
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "2rem",
              padding: "1rem 2rem",
            }}
          />
            </FlexBetween>

            {/**the image dropzone will open when it is clicked */}
            {isImage && (
                    <Box
                        border={`1px solid ${medium}`}
                        borderRadius="5px"
                        mt="1rem"
                        p="1rem"
                    >
                    <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setImage(acceptedFiles[0])
                    }
                    >
                    {({ getRootProps, getInputProps }) => (
                    <FlexBetween>
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        width="100%"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!image ? (
                          <p>Add image Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{image.name}</Typography>
                            <EditOutlined/>
                          </FlexBetween>
                        )}
                      </Box>
                      {image && (
                        <IconButton
                            onClick={() => setImage(null)}
                            sx={{width: "15%"}}
                        >
                            <DeleteOutlined />
                        </IconButton>
                      )}
                    </FlexBetween>

                    )}
                  </Dropzone>
                </Box>
            )}
            <Divider sx={{margin: "1.25rem 0"}} />

            {/**this will turn on and off the image dropzone */}
            <FlexBetween>
                <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
                    <ImageOutlined sx={{color: mediumMain}}/>
                    <Typography
                        color={mediumMain}
                        sx={{"&:hover" : {cursor: "pointer", color: medium}}}
                    >
                        Image
                    </Typography>
                </FlexBetween>
                {isNonMobileScreens ? (
                    <>
                        <FlexBetween gap="0.25rem">
                            <GifBoxOutlined sx={{color: mediumMain}}/>
                            <Typography color={mediumMain}>Clip</Typography>
                        </FlexBetween>
                        <FlexBetween gap="0.25rem">
                            <AttachFileOutlined sx={{color: mediumMain}}/>
                            <Typography color={mediumMain}>Attachment</Typography>
                        </FlexBetween>
                        <FlexBetween gap="0.25rem">
                            <MicOutlined sx={{color: mediumMain}}/>
                            <Typography color={mediumMain}>Audio</Typography>
                        </FlexBetween>
                    </>
                ): (<FlexBetween gap="0.25rem">
                    <MoreHorizOutlined sx={{color: mediumMain}}/>
                    </FlexBetween>)}
                <Button
                    disabled={!post}
                    onClick={handlePost}
                    sx={{
                        color: palette.background.alt, 
                        backgroundColor: palette.primary.main, 
                        borderRadius: "3rem"
                    }}
                >
                    POST
                </Button>
            </FlexBetween>
        </WidgetWrapper>
    )
}

export default MyPostWidget