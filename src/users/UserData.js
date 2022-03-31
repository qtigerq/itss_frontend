import { useState } from 'react'
import styles from "./UserData.module.css"
import UserDataForm from "./UserDataForm"

const UserData = ({ userData }) => {

    const [user, setUser] = useState(userData)
    const [showUserDataForm, setShowUserDataForm] = useState(false)
    const [message, setMessage] = useState("")

    const toggleUserDataForm = () => {
        setShowUserDataForm(!showUserDataForm)
        setMessage("")
    }

    const editUser = (newUser) => {

        if (newUser.name.length < 3){
            setMessage("O campo nome precisa ser preenchido com 3 ou mais caracteres.")
        } else if (newUser.email.length === 0) {
            setMessage("O campo email precisa ser preenchido.")
        } else {
            fetch(`http://localhost:8080/user/${newUser.id}`, {
                method: 'PUT',
                headers: {                                                          
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            })
            .then(() => {
                setUser(newUser);
                setMessage("Dados alterados com sucesso!")
                setShowUserDataForm(false)
            })
            .catch((err) => {
                setMessage("Erro na alteração dos dados.")
                console.log(err)
            })
        }
    }
    
    return (
        <div className={styles.userdata}>
            <h3>Dados pessoais <button className={styles.noButton} onClick={toggleUserDataForm}>{showUserDataForm ? 'Fechar' : 'Editar'}</button></h3>

            {showUserDataForm && <UserDataForm handleSubmit={editUser} userData={user}/>}
            {message && <div className={styles.message}>{message}</div>}

        </div>
    )
}

export default UserData;