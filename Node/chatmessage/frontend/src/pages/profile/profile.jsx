import React, { useState } from 'react'; 
import axios from '../../axios'; 
import { useSelector } from 'react-redux';
 
const Profile = () => { 
    const [selectedFile, setSelectedFile] = useState(null); 
    const [uploading, setUploading] = useState(false); 
    const [uploadUrl, setUploadUrl] = useState(''); 
    const [fileName, setFileName] = useState(''); 
    const me = useSelector(state => state.auth.data)
 
    const handleFileChange = (event) => { 
        const file = event.target.files[0]
        setSelectedFile(file);
        setFileName(file.name)     
    }; 
    console.log(fileName)
 
    const handleUpload = async () => { 
        if (!selectedFile) { 
            alert('Пожалуйста, выберите файл для загрузки'); 
            return; 
        } 
 
        setUploading(true); 
        const formData = new FormData(); 
        formData.append('image', selectedFile); 
 
        try { 
            const response = await axios.post('/upload', formData, { 
                headers: { 
                    'Content-Type': 'multipart/form-data', 
                }, 
            });
            const updatingResponse = await axios.patch(`/profile/${me._id}`,
                {avatarUrl: `http://localhost:5000/uploads/${fileName}`}
            )
            console.log(updatingResponse)

            console.log(response)
            // Сохраняем URL загруженного изображения 
            setUploadUrl(response.data.url); 
            alert('Файл успешно загружен!'); 
        } catch (error) { 
            console.error('Ошибка загрузки файла:', error); 
            alert('Ошибка загрузки файла: ' + (error.response ? error.response.data : 'Неизвестная ошибка')); 
        } finally { 
            setUploading(false); 
        } 
    }; 
 
    return ( 
        <div> 
            <div className='container'>
                <input type="file" onChange={handleFileChange}/> 
                <button onClick={handleUpload} disabled={uploading}> 
                    {uploading ? 'Загрузка...' : 'Загрузить'} 
                </button> 
                {uploadUrl && ( 
                    <div> 
                        <h3>Загруженное изображение:</h3> 
                        <img src={uploadUrl} alt="Uploaded" style={{ maxWidth: '300px' }} /> 
                    </div> 
                )} 
            </div>
        </div> 
    ); 
}; 
 
export default Profile;