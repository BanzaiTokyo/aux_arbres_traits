import React from 'react';
import './App.css';
import {Box} from "@mui/material";


const MAX_TOKENS = 76159;

interface TokenResponse {
    items: [],
    next_page_params: {
        items_count: 50,
        unique_token: string
    }
}

interface SingleTokenProps {
    url: string
}


function SingleToken(props: SingleTokenProps) {


    return (
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>

        <div><img src={props.url}/></div>
        </Box>
    );
}

export default SingleToken;
