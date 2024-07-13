import React from 'react';
import './App.css';
import {Box} from "@mui/material";


interface SingleTokenProps {
    url: string
}


function SingleToken(props: SingleTokenProps) {


    return (
        <Box component="section" sx={{p: 2, border: '1px dashed grey'}}>
            <div>
                <img height={200}
                     src={props.url}
                     loading="lazy"

                 alt={""}/></div>
        </Box>
    );
}

export default SingleToken;
