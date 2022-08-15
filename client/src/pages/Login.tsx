import {Box, Grid, Paper, Typography,Link } from "@mui/material"
import LoginForm from "../components/AuthForm"
import {Link as RouterLink} from "react-router-dom"

function Login(){
    return <>
    <Paper>
        <Grid container direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}>
        <Grid item xs={3} >
            <Box maxWidth="sm" sx={{ width: 400, height: 400, padding: 5 }}>
                <Typography align="center" variant="h4" sx={{marginBottom:"8px"}}>
                    Login
                </Typography>
                    <LoginForm auth="login"/>
                <Box sx={{ marginTop: "6px" }}>
                    <Link component={RouterLink} to="/register">Need account? Register</Link>
                </Box>
            </Box>
        </Grid>
    </Grid>
    </Paper>
    </>
}

export default Login