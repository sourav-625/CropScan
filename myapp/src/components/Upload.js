import React, { useState, useRef } from "react";

export default function Upload() {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No file chosen");
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveFile = () => {
    setFileName("No file chosen");
    setImage(null);
    fileInputRef.current.value = ""; // Reset the file input
  };

  const handleUpload = () => {
    alert("Image uploaded successfully!");
    // Add actual upload logic here (e.g., send file to server)
  };

  return (
    <div className="container mt-4 text-center">
      <h2>Upload Image</h2>

      <div className="input-group mt-3">
        <input type="text" className="form-control" value={fileName} readOnly />
        <button className="btn btn-primary" onClick={handleButtonClick}>
          Choose File
        </button>
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="d-none"
        onChange={handleImageChange}
      />

      {image && (
        <div className="mt-5">
          <h3>Your Image:</h3>
          <img
            src={image}
            alt="Preview"
            className="img-fluid rounded"
            style={{ maxWidth: "300px" }}
          />
          <br />
          <button className="btn btn-danger mt-3 me-2" onClick={handleRemoveFile}>
            Remove File
          </button>
          <button className="btn btn-success mt-3" onClick={handleUpload}>
            Upload
          </button>
        </div>
      )}
    </div>
  );
}
