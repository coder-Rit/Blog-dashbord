 
var firebaseConfig = {
  apiKey: "AIzaSyBIp40zS3UrpQmE8Lff4L1MvkKmhRoJF2k",
  authDomain: "blog-server-sahil.firebaseapp.com",
  projectId: "blog-server-sahil",
  storageBucket: "blog-server-sahil.appspot.com",
  messagingSenderId: "1064452278736",
  appId: "1:1064452278736:web:a81239ab607cdd752351d5"
};


firebase.initializeApp(firebaseConfig);


var messagesRef = firebase.database().ref('Checking');
document.getElementById('contactForm').addEventListener('submit', submitForm); //uploading file in storage function uploadimage() {



function uploadimage(dynamicId,folderName,cb) {

  var file = document.getElementById(dynamicId).files[0];
  if (!file) {
    toastit("Please Upload a File ","r")
    return
  }

  toastit("Uploading Image ","w")

  var storage = firebase.storage();
  var storageref = storage.ref();
  var thisref = storageref.child(folderName).child(file.name).put(file);
  thisref.on('state_changed', function (snapshot) { }, function (error) { }, function () {
      // Uploaded completed successfully, now we can get the download URL
      thisref.snapshot.ref.getDownloadURL().then(function (downloadURL) { 
           
        toastit("Image Uploaded ","w")
          cb(downloadURL)

      });
  });
} 
 
