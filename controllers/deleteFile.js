function deleteFileCallback(err) {
  if (err) {
    console.log('Err in deleting file!');
    console.log(err.message);
  } else {
    console.log('Deleted');
  }
}

module.exports = deleteFileCallback;
