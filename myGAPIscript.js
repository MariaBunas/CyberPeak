const API_KEY = "AIzaSyBE4jeVMYnAio8DgHU8EudkIJyA_M3odFU"; // Replace with your actual API key

async function getFileId(fileName) {
    const url = `https://www.googleapis.com/drive/v3/files?q=name='${fileName}' and trashed=false&key=${API_KEY}&fields=files(id,name)`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.files && data.files.length > 0) {
        return data.files[0].id; // Get first matching file ID
    } else {
        console.error("File not found.");
        return null;
    }
}

async function searchImage() {
    const fileName = document.getElementById("fileName").value;
    
    if (!fileName) {
        alert("Please enter a file name.");
        return;
    }

    const fileId = await getFileId(fileName);
    
    if (fileId) {
        const imageUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
        document.getElementById("driveImage").src = imageUrl;
    } else {
        alert("Image file not found.");
    }
}
