// AddChatModal.js
import axios from '../../axios'
import { useState } from 'react';
import Modal from 'react-modal';
import './modal.css'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: '500px'
  }
};

Modal.setAppElement('#root');

export const ChatModal = ({ isOpen, onClose, availableUsers}) => {
    const [chatName, setChatName] = useState('');
    const [selectedParticipants, setSelectedParticipants] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const [selectedFile, setSelectedFile] = useState(null); 
    const [uploading, setUploading] = useState(false); 
    // const [fileName, setFileName] = useState(''); 
    const [fileUrl, setFileUrl] = useState('')
 
    const handleFileChange = (event) => { 
        const file = event.target.files[0]
        setSelectedFile(file);
        // setFileName(file.name)     
    }; 

 
    const handleUpload = async () => { 
        if (!selectedFile) { 
            alert('Пожалуйста, выберите файл для загрузки'); 
            return; 
        } 
 
        setUploading(true); 
        const formData = new FormData(); 
        formData.append('image', selectedFile); 
        const response = await axios.post('/upload', formData, { 
            headers: { 
                'Content-Type': 'multipart/form-data', 
            }, 
        }); 
        setUploading(false)
        setFileUrl(response.data.url)
    }; 

    const handleSubmit = async(e) => {
        e.preventDefault();
        // Здесь вы можете добавить логику для добавления чата
        onClose(); // Закрыть модал после отправки

        try {
            await axios.post('/chat', {
                chatName: chatName,
                participants: selectedParticipants,
                chatUrl: fileUrl
            })
        } catch(err) {

        }
    };

    const handleParticipantSelect = (participant) => {
        if (!selectedParticipants.includes(participant)) {
            setSelectedParticipants([...selectedParticipants, participant]);
        }
        setDropdownVisible(false);
    };

    const handleParticipantRemove = (participant) => {
        setSelectedParticipants(selectedParticipants.filter(p => p !== participant));
    };

    return (
        <Modal 
            isOpen={isOpen} 
            onRequestClose={onClose} 
            style={customStyles} 
            contentLabel="Add Chat Modal" 
        > 
            <h2>Добавление нового чата</h2> 
            <form onSubmit={handleSubmit}> 
                <div> 
                    <label htmlFor="chat-name">Название чата:</label> 
                    <input 
                        type="text" 
                        id="chat-name" 
                        value={chatName} 
                        onChange={(e) => setChatName(e.target.value)} 
                    /> 
                </div> 
                <div> 
                    <label htmlFor="photo-url">Фотография чата:</label> 
                    <input type="file" onChange={handleFileChange}/> 
                    <button onClick={handleUpload} disabled={uploading}> 
                        {uploading ? 'Загрузка...' : 'Загрузить'} 
                    </button>  
                </div> 
                <div> 
                    <label htmlFor="participants">Участники чата:</label> 
                    <div className="participants-input" onClick={() => setDropdownVisible(!dropdownVisible)}>
                        {selectedParticipants.length > 0 ? selectedParticipants.join(', ') : 'Выберите участников'}
                    </div>
                    {dropdownVisible && (
                        <ul className="dropdown"> 
                            {availableUsers.map(user => ( 
                                <li key={user.id} onClick={() => handleParticipantSelect(user._id)}> 
                                    {user.fullName} 
                                </li> 
                            ))} 
                        </ul>
                    )}
                    <ul className="selected-participants">
                        {selectedParticipants.map((participant, index) => ( 
                            <li key={participant.id}>
                                {participant} 
                                <span onClick={() => handleParticipantRemove(participant)}>×</span>
                            </li> 
                        ))} 
                    </ul>
                </div> 
                <button type="submit">Добавить чат</button> 
            </form> 
        </Modal>
    );
};

export default ChatModal;