import React, { useContext, useState } from 'react'

import Notes from './Notes';
function Home(props) {
    // const [Change, setChange] = useState("This is iNotebook...");
    const {showAlert}=props;
    return (
        // <div>
        //     <h1 onClick={()=>{setChange("Changed State...")}}>{Change}</h1>
        // </div>


        <>
            
            <Notes showAlert={showAlert} />
        </>
    )
}

export default Home