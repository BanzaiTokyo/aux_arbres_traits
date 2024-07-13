import React, {useEffect, useState} from 'react';
import './App.css';
import SingleToken from "./SingleToken";
import {SingleTokenType} from "./models/TokensResponse";
require('dotenv').config()

const BLOCKSCOUT_API_KEY = 'BLOCKSCOUT_API_KEY'

interface TokenListProps {
    ids: string[]
}

function TokenList(props: TokenListProps) {
    const [tokens, setTokens] = useState<SingleTokenType[]>([]);

    useEffect(() => {
        const firstFive = props.ids.length >=5 ? props.ids.slice(0, 5) : props.ids;

        firstFive.forEach(id=>{
            const url = `https://base.blockscout.com/api/v2/tokens/0x26a1F8813dF5a318Ed7aA1091C30dB0f25727a18/instances/${id}?apikey=${BLOCKSCOUT_API_KEY}`;

            fetch(url)
                .then(response => response.json())
                .then((response: SingleTokenType[]) => {
                    setTokens(tokens => [...tokens, ...response]);
                });
        })

    }, [])

    return (
        <div>{tokens.map(token => {
            return <SingleToken url={token.image_url}/>
        })}</div>
    );
}

export default TokenList;
