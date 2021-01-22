import { Container, Box } from '@material-ui/core'
import React from 'react'

const Body = ({ children }: { children: React.ReactElement }) => <Container><Box my={22}>{children}</Box></Container>


export default Body
