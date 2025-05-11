const API_KEY = "AIzaSyBE4jeVMYnAio8DgHU8EudkIJyA_M3odFU"; // Replace with your actual API key

async function getFileId(fileName, context) {
    // const url = `https://www.googleapis.com/drive/v3/files?q=name='${fileName}' and trashed=false&key=${API_KEY}&fields=files(id,name)`;
    // const url = `https://www.googleapis.com/drive/v3/files?q=title='${fileName}' and fileExtension='${extension}' and trashed=false&key=${API_KEY}&fields=files(id,name)`;
    //title="File_1.xml" and fileExtension="xml"
    //const url = `https://www.googleapis.com/drive/v3/files?q=name='${fileName}'&key=${API_KEY}&fields=files(id,name)`;
    const folderId = "1lCpQoNRIPs6Q294Vt7JwDoq5GhPKEf6b";
    const url = "https://www.googleapis.com/drive/v3/files?q='" + folderId + "'+in+parents&key=" + API_KEY;
    const response = await fetch(url);
    const data = await response.json();

    // alert(fileName);
    
    var index = -1;
    if (data.files && data.files.length > 0) {
        for(var i=0; i<data.files.length; i++)
        {
            if(data.files[i].name === fileName) {
                index = i;
            }
        }
    }
    if ( index > -1 ) {
        // alert("found index " + index);
        return [data.files[index].id, context]; // Get first matching file ID
    } else {
        // alert("not found");
        console.error("File not found.");
        return [null, context];
    }
}

function getLocationsCsvFileId() {
    
    // var fileIdPromise = await getFileId("locations.csv", null);
    // var locationsCsvFileId = null;
    // fileIdPromise.then(([url, x]) => {
    //     locationsCsvFileId = url;
    // });
    // return locationsCsvFileId;
    
    return getFileId("locations.csv", null);
    //var locationsCsvFileId = null;
    //return locationsCsvFileId;
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
