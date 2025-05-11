const API_KEY = "AIzaSyBE4jeVMYnAio8DgHU8EudkIJyA_M3odFU"; // Replace with your actual API key

var isListOfFilesCreated = false;
var listOfFiles = new Map();

async function readFileList_GAPI() {
    const folderId = "1lCpQoNRIPs6Q294Vt7JwDoq5GhPKEf6b";
    const url = "https://www.googleapis.com/drive/v3/files?q='" + folderId + "'+in+parents&key=" + API_KEY;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.files && data.files.length > 0) {
        for(var i=0; i<data.files.length; i++)
        {
            listOfFiles.set(data.files[i].name, data.files[i].id);
        }
    }
}

async function getFileId(fileName, context) {
    if (!isListOfFilesCreated) {
        await readFileList_GAPI();
    } 
    
    return [listOfFiles[fileName], context];
}

// async function getFileId_old(fileName, context) {
    
//     // const url = `https://www.googleapis.com/drive/v3/files?q=name='${fileName}' and trashed=false&key=${API_KEY}&fields=files(id,name)`;
//     // const url = `https://www.googleapis.com/drive/v3/files?q=title='${fileName}' and fileExtension='${extension}' and trashed=false&key=${API_KEY}&fields=files(id,name)`;
//     //title="File_1.xml" and fileExtension="xml"
//     //const url = `https://www.googleapis.com/drive/v3/files?q=name='${fileName}'&key=${API_KEY}&fields=files(id,name)`;
//     const folderId = "1lCpQoNRIPs6Q294Vt7JwDoq5GhPKEf6b";
//     const url = "https://www.googleapis.com/drive/v3/files?q='" + folderId + "'+in+parents&key=" + API_KEY;
//     const response = await fetch(url);
//     const data = await response.json();

//     // alert(fileName);
    
//     var index = -1;
//     if (data.files && data.files.length > 0) {
//         for(var i=0; i<data.files.length; i++)
//         {
//             if(data.files[i].name === fileName) {
//                 index = i;
//             }
//         }
//     }
//     if ( index > -1 ) {
//         // alert("found index " + index);
//         return [data.files[index].id, context]; // Get first matching file ID
//     } else {
//         // alert("not found");
//         console.error("File not found.");
//         return [null, context];
//     }
// }

function getLocationsCsvFileId() {
    
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
