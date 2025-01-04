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
    const [selectedParticipantsNames, setSelectedParticipantsNames] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const [selectedFile, setSelectedFile] = useState(null); 
    const [uploading, setUploading] = useState(false); 
    const [fileUrl, setFileUrl] = useState('')
 
    const handleFileChange = (event) => { 
        const file = event.target.files[0]
        setSelectedFile(file);   
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
            console.log(participant)
            setSelectedParticipants([...selectedParticipants, participant]);
            setSelectedParticipantsNames([...selectedParticipantsNames, participant.fullName]);
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
                <div className='chatName__box'>  
                    <input className='chatName__input modal__input' 
                        type="text"  
                        id="chat-name"  
                        placeholder='Название чата' 
                        value={chatName}  
                        onChange={(e) => setChatName(e.target.value)}  
                    />  
                </div>  
                <div className="chatPhoto__box modal__input">  
                    <label htmlFor="photo-url">Фотография чата:</label>  
                    <input type="file" onChange={handleFileChange}/>  
                    <button onClick={handleUpload} disabled={uploading}>  
                        {uploading ? 'Загрузка...' : 'Загрузить'}  
                    </button>   
                </div>  
                <div>  
                    <div className="participants-input modal__input" onClick={() => setDropdownVisible(!dropdownVisible)}> 
                        {selectedParticipantsNames.length > 0 ? selectedParticipantsNames.join(', ') : 'Выберите участников'} 
                    </div> 
                    {dropdownVisible && ( 
                        <ul className="dropdown">  
                            {availableUsers.map(user => (  
                                <li key={user.id} onClick={() => handleParticipantSelect(user)}>  
                                    {user.fullName}  
                                </li>  
                            ))}  
                        </ul> 
                    )} 
                    <ul className="selected-participants"> 
                        {selectedParticipants.map(participant => (  
                            <li key={participant.id}> 
                                {participant.fullName}  
                                <span onClick={() => handleParticipantRemove(participant)}>×</span> 
                            </li>  
                        ))}  
                    </ul> 
                </div>  
                <button className='modal__btn' type="submit">Добавить чат</button>  
            </form>  
        </Modal> 
    );
    
};

export default ChatModal;