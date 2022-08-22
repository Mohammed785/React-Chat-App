import { Search } from "@mui/icons-material"
import { Box, IconButton, InputAdornment, TextField } from "@mui/material"
function SearchForm(){
    return <>
        <Box component="div" className="search-bar">
            <TextField variant="standard" label="Search by username" InputProps={{endAdornment:<InputAdornment position="end">
                <IconButton type="submit">
                    <Search/>
                </IconButton> 
            </InputAdornment>}} />
        </Box>
    </>
}

export default SearchForm