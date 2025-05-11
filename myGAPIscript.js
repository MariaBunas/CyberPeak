const API_KEY = "AIzaSyBE4jeVMYnAio8DgHU8EudkIJyA_M3odFU"; // Replace with your actual API key

var isListOfFilesCreated = false;
var listOfFiles = new Map();

async function readFileList_GAPI() {
    
    const folderId = "1lCpQoNRIPs6Q294Vt7JwDoq5GhPKEf6b";
    const url = "https://www.googleapis.com/drive/v3/files?q='" + folderId + "'+in+parents&key=" + API_KEY;
    const response = await fetch(url);
    const data = await response.json();

    console.log("Reading file list from GDrive folder: ");
    
    if (data.files && data.files.length > 0) {
        for(var i=0; i<data.files.length; i++)
        {
            listOfFiles.set(data.files[i].name, data.files[i].id);
            console.log("File: " + data.files[i].name);
        }
    }
}

async function getFileId(fileName, context) {

    // load list of files from google drive and store them to "cache" of listOfFiles if cache is empty 
    if (!isListOfFilesCreated) {
        isListOfFilesCreated = true;
        await readFileList_GAPI();
    } 

    const result = listOfFiles.get(fileName);
    return [result, context];
}

function getLocationsCsvFileId() {
    // read csv file using it's name
    return getFileId("locations.csv", null);
}

// async function searchImage() {
//     const fileName = document.getElementById("fileName").value;
    
//     if (!fileName) {
//         alert("Please enter a file name.");
//         return;
//     }

//     const fileId = await getFileId(fileName);
//     if (fileId) {
//         // const imageUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
//         const imageUrl = "https://drive.google.com/thumbnail?id=" + fileId + "&sz=w500";
//         document.getElementById("driveImage").src = imageUrl;
//     } else {
//         alert("Image file not found.");
//     }
// }

function getGdriveImgUrl (fileName, defaultUrl) {
    document.getElementById(fileName).src = defaultUrl; //"not found";
                   
    var fileIdPromise = getFileId(fileName, null);
    fileIdPromise.then((url, nothing) => {
        gdriveImgUrl = "https://drive.google.com/thumbnail?id=" + url + "&sz=w200px";
        document.getElementById(filename).src = gdriveImgUrl;
        document.getElementById("parent-" + filename).style.display = "block";
        alert(gdriveImgUrl);
    });

    return gdriveImgUrl;
}
