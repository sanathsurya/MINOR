import { useState } from "react";
import { uploadFile } from "../services/fileService";

function FileUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const token = localStorage.getItem("token");
    if (file) {
      const result = await uploadFile(file, token);
      if (result.success) {
        alert("File uploaded successfully!");
      } else {
        alert(result.message);
      }
    }
  };

  return (
    <div>
      <h2>Upload File</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default FileUpload;
