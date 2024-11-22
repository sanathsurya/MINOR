export const uploadFile = async (file, token) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("patient_id", "some_patient_id"); // Customize based on your use case
  
    const response = await fetch("/files/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
  
    const data = await response.json();
    if (data.message === "File uploaded successfully!") {
      return { success: true };
    } else {
      return { success: false, message: data.message };
    }
  };
  
  export const downloadFile = async (filename, token) => {
    const response = await fetch(`/files/download/${filename}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    const data = await response.blob();
    if (data.size > 0) {
      const url = URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.click();
      return { success: true };
    } else {
      return { success: false, message: "File not found or unauthorized." };
    }
  };
  