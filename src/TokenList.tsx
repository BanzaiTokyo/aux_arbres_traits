import React, {useEffect, useState} from 'react';
import './App.css';
import ProgressBar from 'react-bootstrap/ProgressBar';
import SingleToken from "./SingleToken";


const MAX_TOKENS = 76159;

interface TokenResponse {
    items: [],
    next_page_params: {
        items_count: 50,
        unique_token: string
    }
}

interface TokenListProps {
    ids:string[]
}

interface TokenMeta {
    url:string;
}

function TokenList(props:TokenListProps) {
    const [tokens, setTokens] = useState<TokenMeta[]>([]);


    return (
        <div>{tokens.map(token => {return <SingleToken url={token.url}/>})}</div>
    );
}

export default TokenList;
