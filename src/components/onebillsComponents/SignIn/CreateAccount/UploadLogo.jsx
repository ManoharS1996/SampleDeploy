// MODULE IMPORTS
import { useState } from 'react';
import { SnackbarProvider, enqueueSnackbar } from 'notistack'

// STYLES IMPORT
import { InputsDivs, ImgInput, ImgLabel, ImgInputsDiv, ImgLabel2, ImgTag } from './StyledComponents';

// ICON IMPORTS
import { HiUpload } from "react-icons/hi";

const UploadLogoAndSig = ({ setProfile }) => {
    const [file, setFile] = useState('');

    // HANDLE IMAGE CHANMGE
    const onChangeDp = async (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile && selectedFile.type === 'image/jpeg') {
            setFile(selectedFile);
            setProfile(selectedFile)
        } else {
            enqueueSnackbar(`Please select a JPEG image.`, { preventDuplicate: true, variant: 'success', autoHideDuration: 1000 })
        }

    };

    return (
        <InputsDivs style={{justifyContent:'flex-end'}}>

            <ImgInputsDiv style={{ border: '2px dotted #red' }}>
                <ImgInput id='profilePicture' type='file' accept='.jpg, .jpeg' onChange={(e) => onChangeDp(e)} />
                <ImgLabel htmlFor='profilePicture'>
                    {file !== '' ?
                        <ImgTag src={URL.createObjectURL(file)} alt='profilePicture' /> :
                        <HiUpload />
                    }
                </ImgLabel>
                <ImgLabel2> Profile Picture </ImgLabel2>
            </ImgInputsDiv>

            <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'center' }} />

        </InputsDivs>
    )
}

export default UploadLogoAndSig