import React, {useEffect, useState} from 'react';
import './App.css';
import ProgressBar from 'react-bootstrap/ProgressBar';
import {TokenResponse} from "./models/TokensResponse";
require('dotenv').config()

const BLOCKSCOUT_API_KEY = 'BLOCKSCOUT_API_KEY'


const MAX_TOKENS = 76159;

function App() {

    const [tokens, setTokens] = useState([]);
    const [remainingTokens, setRemainingTokens] = useState(100_000);
    useEffect(() => {
        const fetchDataForPosts = async () => {

            const url = `https://base.blockscout.com/api/v2/tokens/0x26a1F8813dF5a318Ed7aA1091C30dB0f25727a18/instances?items_count=100&apikey=${BLOCKSCOUT_API_KEY}&unique_token=${remainingTokens}`;
            const res: TokenResponse = await fetch(url).then(response => response.json());
            setTokens(tokens => [...tokens, ...res.items]);
            const uniqueToken = parseInt(res.next_page_params.unique_token);
            setRemainingTokens(uniqueToken);
            console.log(res.next_page_params.unique_token)
            console.log(uniqueToken)
        };
        if (remainingTokens > 1) fetchDataForPosts();
    }, [remainingTokens])
    console.log(tokens)
    return (
        <div className="App">
            <ProgressBar now={MAX_TOKENS - remainingTokens}/>
            <h1>traits</h1>
            <button className="btn btn-secondary">Secondary</button>
        </div>
    );
}

export default App;
