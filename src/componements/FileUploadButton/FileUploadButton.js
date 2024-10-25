import React, { useRef } from "react";
import logo from "../img/clip-svgrepo-com.svg"; // Убедитесь, что путь к вашему логотипу корректный
import "./FileUploadButton.css"; // Импортирую стили

const FileUploadButton = () => {
    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
            if (allowedTypes.includes(file.type)) {
                console.log("Выбран файл:", file);
                // Здесь вы можете добавить дополнительную логику для работы с выбранным файлом
            } else {
                alert("Пожалуйста, выберите файл формата PDF или Word.");
            }
        }
    };

    return (
        <div className="file-upload-container">
            <button className="add-button" onClick={handleButtonClick}>
                <img className="add-button-img" src={logo} alt=""/>
            </button>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept=".pdf, .doc, .docx"
                onChange={handleFileChange}
            />
        </div>
    );
};

export default FileUploadButton;