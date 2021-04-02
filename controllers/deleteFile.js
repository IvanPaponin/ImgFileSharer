const fs = require('fs');

const filePath = './public/uploads/myImage-1617218572656.jpg'

// fs.unlink(filePath, deleteFileCallback);

function deleteFileCallback(err) {
  if (err) {
    console.log('Err in deleting file!');
    console.log(err.message);
  } else {
    console.log('Deleted');
  }
}

module.exports = deleteFileCallback;
