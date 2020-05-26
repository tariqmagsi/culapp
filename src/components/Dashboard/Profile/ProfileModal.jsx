import React, { useState } from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import Files from "react-butterfiles";
import { Photo } from "@material-ui/icons";

export default function ProfileModal({show, handleClose, setFile, base64, closeHandle, uploadImage}) {
    const [errors, setErrors] = useState([]);

    return (
      <>
        <Modal show={show} onHide={closeHandle}>
            <Modal.Header closeButton>
                <Modal.Title style={{marginBottom: "-90px"}}>Upload Profile Picture</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Files
                multiple={false} 
                maxSize="1000mb"
                convertToBase64={true}
                accept={["image/jpg","image/jpeg", "image/png"]}
                onSuccess={files => {
                            setFile(files)
                            setErrors([]);
                          }}
                onError={errors => {
                            setFile([]);
                            setErrors(errors);
                        }}
            >
                {({ browseFiles, getDropZoneProps, getLabelProps }) => (
                    <>
                        <div {...getDropZoneProps({ className: "myDropZone" })}/>
                        <div>
                            {base64.length > 0 && 
                                <div>
                                    <img src={base64} alt="profile" style={{width: "100%", height: "auto"}}/>
                                    <br/>
                                </div>
                            }
                        </div>
                        {errors.map(error => (
                            <Alert variant="danger" key={error} style={{fontSize: "12px"}}>
                                {error.file.name} - {error.type}
                            </Alert>
                        ))}
                        
                        <br/>
                        <div 
                            style={{textAlign: "center", cursor: "pointer", fontSize: "20px", color: "#229a88", width: "100%", paddingTop: "30px", paddingBottom: "30px", background: "rgba(34, 154, 136,0.5)", margin: 0}} 
                            onClick={browseFiles}
                            className="profile-modal-upload"
                        >
                            <Photo style={{fontSize: "30px"}}/>
                            <span style={{marginLeft: "5px"}}>Select Photo</span>
                        </div>
                    </>
                )}
            </Files>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} size="sm">
                    Cancel
                </Button>
                {base64.length > 0 && <Button variant="success" onClick={uploadImage} size="sm">
                    Upload
                </Button>}
            </Modal.Footer>
        </Modal>
      </>
    );
}