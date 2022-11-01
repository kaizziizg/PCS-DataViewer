import React from "react"

export default function Counter(){
    fetch("https://api.countapi.xyz/update/PCS-DataViewer/count?amount=1")
                .then((response) => {
                    return response.json();
                })
    return(
        <div></div>
    );
}