// @ts-nocheck

import React, { useEffect, useState } from 'react';
import './App.css';
import ProgressBar from 'react-bootstrap/ProgressBar';
import {TokenResponse} from "./models/TokensResponse";

const BLOCKSCOUT_API_KEY = 'BLOCKSCOUT_API_KEY'

const MAX_TOKENS = 76159;

function App() {
    const [remainingTokens, setRemainingTokens] = useState(0);

    useEffect(() => {
        const request = indexedDB.open('tokens_db', 1);
        request.onerror = (event) => {
            console.error('IndexedDB error:', event.target.errorCode);
        };
        request.onsuccess = (event) => {
            const storedRemainingTokens = localStorage.getItem('remainingTokens');
            setRemainingTokens(storedRemainingTokens ? parseInt(storedRemainingTokens) : MAX_TOKENS);
        };
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            db.createObjectStore('tokens', { keyPath: 'id' });
        };
    }, []);

    useEffect(() => {
        const sleep = ms => new Promise(r => setTimeout(r, ms));
        (async () => {
            if (remainingTokens > 0) {
                await sleep(100);
                fetchDataForPosts();
            }
        })()
    }, [remainingTokens]);

    const fetchDataForPosts = async () => {
        const url = `https://base.blockscout.com/api/v2/tokens/0x26a1F8813dF5a318Ed7aA1091C30dB0f25727a18/instances?items_count=100&apikey=${BLOCKSCOUT_API_KEY}&unique_token=${remainingTokens}`;
        const res: TokenResponse = await fetch(url).then(response => response.json());
        const clearedTokens = res.items.map(cleanToken);

        const db = indexedDB.open('tokens_db', 1);
        db.onsuccess = (event) => {
            const transaction = event.target.result.transaction('tokens', 'readwrite');
            const store = transaction.objectStore('tokens');
            clearedTokens.forEach(token => {
                store.put(token);
            });
        };

        const uniqueToken = parseInt(res.next_page_params?.unique_token || 0);
        setRemainingTokens(uniqueToken);
        localStorage.setItem('remainingTokens', uniqueToken.toString());
        console.log(uniqueToken);
    };

    const cleanToken = (token: any): Object => {
        const result = {};
        token.metadata.attributes.forEach((attr: any) => {
            if (["TreeId", "Coordinates"].indexOf(attr.trait_type) < 0)
                result[attr.trait_type] = attr.value
        });
        result["id"] = parseInt(token.id);
        return result;
    };

    return (
        <div className="App">
            <ProgressBar max={MAX_TOKENS} now={MAX_TOKENS - remainingTokens} />
        </div>
    );
}

export default App;
