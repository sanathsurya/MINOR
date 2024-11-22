import { useState } from "react";
import { downloadFile } from "../services/fileService";

function FileDownload() {
  const [filename, setFilename] = useState("");

  const handleDownload = async () => {
    const token = localStorage.getItem("token");
    if (filename) {
      const result = await downloadFile(filename, token);
      if (result.success) {
        alert("File downloaded successfully!");
      } else {
        alert(result.message);
      }
    }
  };

  return (
    <div>
      <h2>Download File</h2>
      <input
        type="text"
        placeholder="Enter filename"
        value={filename}
        onChange={(e) => setFilename(e.target.value)}
      />
      <button onClick={handleDownload}>Download</button>
    </div>
  );
}

export default FileDownload;
