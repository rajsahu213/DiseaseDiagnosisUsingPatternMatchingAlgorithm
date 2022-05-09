import React, { useState } from "react";
import axios from "axios";
import "./Upload.css";

import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";
const uploader = new Uploader({
    apiKey: "free",
});

const Upload = (props) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const onFileUpload = async () => {
        const datas = [];
        const fileNames = [];
        for (let i = 0; i < selectedFile.length; i++) {
            const formData = new FormData();
            formData.append(
                "file",
                selectedFile[i].originalFile.file,
                selectedFile[i].originalFile.file.name
            );
            fileNames.push(selectedFile[i].originalFile.file.name);
            try {
                let data;
                for (let rep = 0; rep < 10; rep++) {
                    data = await axios.post(
                        "http://localhost:8080/upload",
                        formData
                    );
                }
                data = await axios.post(
                    "http://localhost:8080/upload",
                    formData
                );
                datas.push(data.data);
                setSelectedFile(null);
            } catch (error) {
                console.log(error);
            }
        }
        props.setData(datas);
        props.setFileNames(fileNames);
        props.fileUploaded(true);
    };

    const fileData = () => {
        if (selectedFile && selectedFile[0]) {
            const renderDetails = selectedFile.map((file, index) => {
                const selectedFile1 = file.originalFile.file;
                return (
                    <div
                        key={index}
                        style={{
                            border: "1px solid black",
                            borderRadius: "12px",
                            padding: "5px",
                            margin: "10px",
                        }}
                    >
                        <p>Name: {selectedFile1.name}</p>

                        <p>Type: {selectedFile1.type}</p>

                        <p>Size: {selectedFile1.size / 1024} KB</p>
                    </div>
                );
            });
            return (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                    }}
                >
                    <h3>File Details</h3>
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                        }}
                    >
                        {renderDetails}
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <br />
                    <h4>Choose a File before Pressing the Upload button</h4>
                </div>
            );
        }
    };

    return (
        <div className="main">
            <div className="upload">
                <UploadButton
                    uploader={uploader}
                    options={{ multi: true }}
                    onComplete={(files) => setSelectedFile(files)}
                >
                    {({ onClick }) => (
                        <button onClick={onClick} className="choose">
                            CHOOSE A FILE
                        </button>
                    )}
                </UploadButton>
                <div className="buttons">
                    <button id="cancel" onClick={() => setSelectedFile(null)}>
                        Cancel
                    </button>
                    <button id="upl" onClick={onFileUpload}>
                        Upload
                    </button>
                </div>
                <div>{fileData()}</div>
            </div>
        </div>
    );
};

export default Upload;
