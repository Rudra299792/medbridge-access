import React, { useState } from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-top: 1px solid #ddd;
  background-color: #f7f7f7;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  flex: 1;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 25px;
  margin-right: 5px;
  background-color: #fff;
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
`;

const FileUpload = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 5px;
`;

const HiddenInput = styled.input`
  display: none;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  padding-left: 10px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  padding: 8px;
  border: none;
  background-color: #a7185d;
  color: white;
  border-radius: 5px;
  cursor: pointer;
`;

const Icon = styled.div`
  width: 20px;
  height: 20px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-color: transparent;
`;

const FileIcon = styled(Icon)`
  background-image: url('/icons/attach-file.png');
`;

const SendIcon = styled(Icon)`
  background-image: url('/icons/send.png');
`;

const FilePreview = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const FilePreviewBox = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const FileUploadedIcon = styled(Icon)`
  background-image: url('icons/document.png');
  width: 40px;
  height: 60px;
  background-size: cover;
  margin-bottom: 7px;
`;

const RemoveButton = styled.button`
  padding: 2px 5px;
  border: none;
  background-color: red;
  color: white;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  top: -7%;
  right: -7%;
`;

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState([]);

  const sendMessage = () => {
    if (message || files.length > 0) {
      onSendMessage({ message, files });
      setMessage('');
      setFiles([]);
    }
  };

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
  };

  const removeFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <InputContainer>
      <InputWrapper>
        {files.length > 0 && (
          <FilePreviewBox>
            {files.map((file, index) => (
              <FilePreview key={index}>
                <FileUploadedIcon />
                <RemoveButton onClick={() => removeFile(index)}>x</RemoveButton>
              </FilePreview>
            ))}
          </FilePreviewBox>
        )}
        <InputBox>
          <FileUpload>
            <FileIcon />
            <HiddenInput type="file" onChange={handleFileUpload} multiple />
          </FileUpload>
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message here..."
          />
        </InputBox>
      </InputWrapper>
      <Button onClick={sendMessage}>
        <SendIcon />
      </Button>
    </InputContainer>
  );
};

export default MessageInput;
