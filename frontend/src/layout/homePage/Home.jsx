import { Box, useMediaQuery } from '@mui/material'
import NavBar from 'layout/navBar/NavBar'
import UserWidget from 'layout/widgets/UserWidget'
import React from 'react'
import { useSelector } from 'react-redux'

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
        gap = "0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%": undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
      </Box>
    </Box>
  )
}

export default Home