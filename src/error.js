import React from "react";
import { Link } from 'react-router-dom';

export const Error = () => {
    return (
        <>
        <section>
            <div className="error-div"> 
                <h1>Oops!</h1>
                <h2>This page doesn't exist</h2>
                <Link to="/"><button className="btn">Return Home</button></Link>
            </div>
        </section>
        </>
    );
}