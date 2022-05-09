import React, { useState } from "react";
import "./Main.css";
import Upload from "./Upload";
import ShowData from "./ShowData";

const Main = (props) => {
    const [isFileUploaded, setIsFileUploaded] = useState(false);
    const [data, setData] = useState([]);
    const [fileNames, setFileNames] = useState([]);
    return (
        <div>
            {!isFileUploaded ? (
                <Upload
                    fileUploaded={setIsFileUploaded}
                    setData={setData}
                    setFileNames={setFileNames}
                />
            ) : (
                <ShowData
                    data={data}
                    fileUploaded={setIsFileUploaded}
                    fileNames={fileNames}
                />
            )}
        </div>
    );
};

export default Main;
