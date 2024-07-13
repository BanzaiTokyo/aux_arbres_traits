import React from 'react';
import Temp from "./Temp";
import TokensTable from "./TokensTable";

function App() {
    return (<>
        <Temp/>
        <h1 style={{textAlign: 'center'}}>Zancan's "Aux Arbres" traits</h1>
        <TokensTable/>
    </>);
}

export default App;
