import { Box, useMediaQuery } from '@mui/material'
import NavBar from 'layout/navBar/NavBar'
import UserWidget from 'layout/widgets/UserWidget'
import React from 'react'
import { useSelector } from 'react-redux'
import MyPostWidget from 'layout/widgets/MyPostWidget'
import PostsWidget from "layout/widgets/PostsWidget";
import AdvertWidget from 'layout/widgets/AdvertWidget'
import FriendListWidget from 'layout/widgets/FriendListWidget'


function Home() {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)")
  const {_id, picturePath} = useSelector((state) => state.user)

  return (
    <Box>
      <NavBar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Home