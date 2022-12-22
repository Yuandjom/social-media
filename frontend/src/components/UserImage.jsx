import { Box } from "@mui/material";

//
const UserImage = ({image, size  = "60px"}) => {
    return (
        //we have default height and width if we dont specify
        <Box width={size} height={size}>
            <img 
                style={{objectFit: "cover", borderRadius: "50%"}}
                width={size}
                height={size}
                alt="user"
                src={`http://localhost:3001/assets/${image}`}
            />{/**this will grab each of the profile image for each user */}
        </Box>
    )
}

export default UserImage