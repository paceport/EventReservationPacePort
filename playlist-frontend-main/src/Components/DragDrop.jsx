import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import uploadImage from '../images/Upload.png';
import { Button } from "react-bootstrap";


// const dropzoneStyle = {
//   flex: 1,
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   width: '450px',
//   justifyContent: "center",
//   padding: "30px",
//   marginRight: '20px',
//   borderWidth: "2px",
//   borderRadius: "1px",
//   borderColor: "#A1A1A1",
//   borderStyle: "dashed",
//   backgroundColor: "#fafafa",
//   color: "#bdbdbd",
//   outline: "none",
//   transition: "border 0.24s ease-in-out",
//   cursor: "pointer",
// };


const dropzoneStyle = {  
  flex: 1,  
  display: "flex",  
  flexDirection: "column",  
  alignItems: "center",  
  width: '100%',  
  maxWidth: '450px',  
  justifyContent: "center",  
  padding: "30px",  
  marginRight: '20px',  
  borderWidth: "2px",  
  borderRadius: "1px",  
  borderColor: "#A1A1A1",  
  borderStyle: "dashed",  
  backgroundColor: "#fafafa",  
  color: "#bdbdbd",  
  outline: "none",  
  transition: "border 0.24s ease-in-out",  
  cursor: "pointer",  
};  
  
const activeDropzoneStyle = {
  borderColor: "#00adb5",
};

const DropzoneText = {
  margin: "5px",
  fontSize: "10px",
  fontWeight: "500",
  textAlign: "center",
  color: '#000000',
  fontFamily:"Segoe UI",
  letterSpacing: '0.48px',

};

const ImagePreview = {
  display: "flex",
  width: "50%",
  height: "auto",
  margin: "20px",
  borderRadius: "2px",
};

const FileName = {
  display: "flex",
  fontSize: "14px",
  marginTop: "8px",
};


export const DropzoneComponent = ({ updateFormData, section, arrayName, imageFiles}) => {

  const onDrop = useCallback((acceptedFiles) => {
    const imgFile =
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),  })
      
    );
    updateFormData(section, arrayName, imgFile);  
    console.log(acceptedFiles);
  }, [updateFormData,section, arrayName]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png','.jpg','.tiff', '.jpeg', '.svg', '.bmp']} ,
    maxSize: 1920 * 1080,  
    maxFiles: 1,
  });

  const fileList = imageFiles.map((file) => (
    <li key={file.name}>
      <img style={ImagePreview} src={file.preview} alt={file.name} />
      <span style={FileName}>{file.name}</span>
    </li>
  ));

  return (
    <div style={ isDragActive  ? { dropzoneStyle, activeDropzoneStyle }  : dropzoneStyle   }
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <img src={uploadImage} alt="Hello" style={{width: '30px', height: '30px'}} />
      <p style={DropzoneText}>
      Drag and drop your Image files here
      </p>
      <p style={DropzoneText}>or</p>
      <Button style={{backgroundColor: '#4E84C4', borderRadius: 20, width: 100, color: '#FFFFFF', height: 30, fontSize: 10}}>
        Select File</Button>
      <ul>{fileList}</ul>
    </div>
  );
};




//for Videos
export const DropzoneVidoeComponent = ({updateFormData, videoFiles}) => {
  const onDrop = useCallback((acceptedFiles) => {
    const fileVideo =
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),  })
      
    );
    updateFormData('detailed','bannerVideo', fileVideo);
    console.log(acceptedFiles);
  }, [updateFormData]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {  'video/*': ['.mp4','.mpeg','.webm' , '.mov']
  } ,
    maxFiles: 1,
  });

   const fileList = videoFiles.map((file) => (
    <li key={file.name}>
    <video style={ImagePreview} src={file.preview} alt={file.name} />
    <span style={FileName}>{file.name}</span>
  </li>
   
  )); 

  return (
    <div style={ isDragActive  ? { dropzoneStyle, activeDropzoneStyle }  : dropzoneStyle   }
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <img src={uploadImage} alt="Hello" style={{width: '30px', height: '30px'}} />
      <p style={DropzoneText}>
      Drag and drop your Video files here
      </p>
      <p style={DropzoneText}>or</p>
      <Button style={{backgroundColor: '#4E84C4', borderRadius: 20, width: 100, color: '#FFFFFF', height: 30, fontSize: 10}}>
        Select File</Button>
      <ul>{fileList}</ul>
      
    </div>
  );
};


