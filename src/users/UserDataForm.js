import { useState } from 'react'
import styles from "./UserDataForm.module.css"
import LoadingIcon from "./../components/layout/Loading"
import Input from "./../components/form/Input"
import SubmitButton from "./../components/form/SubmitButton"
import logoEnd from '../img/seu_logo.png'
import storage from './../firebase/config'
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'

const UserData = ({ handleSubmit, userData }) => {

    const [user, setUser] = useState(userData)
    const [logo, setLogo] = useState(user.logo || logoEnd);
    const [loading, setLoading] = useState(false)

    const uploadLogo = (event) => {
        
        if (event.target.files[0].size > 10485760) {
            alert("O tamanho do arquivo excede o permitido (10MB)!");
        } else {
            setLoading(true)
            const file = event.target.files[0]
            const logoPath = `logos/${file.name}`
            const logoRef = ref(storage, logoPath)
            const uploadedLogo = ref(storage, logoPath)
            uploadBytes(uploadedLogo, file)
                .then(() => {
                    getDownloadURL(logoRef)
                        .then((url) => {
                            setLogo(url)
                            setUser(prevUser => ({
                                ...prevUser,
                                logo: url
                            }))
                            setLoading(false)
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    const submit = (event) => {
        event.preventDefault()
        handleSubmit(user)
    }

    const handleChange = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value })
    }

    const checkboxHandleChange = () => {
        setUser(prevUser => ({
            ...prevUser,
            emailalert: !user.emailalert
        }))
    };

    return (
        <form onSubmit={submit} className={styles.form}>
            <div className={styles.gridcontainer}>
                <div className={styles.item1}>
                    <Input
                        type='text'
                        text='Nome completo'
                        name='name'
                        placeholder=''
                        handleOnChange={handleChange}
                        value={user?.name ? user?.name : ''}
                    />
                </div>
                <div className={styles.item2}>
                    <Input
                        type='text'
                        text='CPF'
                        name='cpf'
                        placeholder='000.000.000-00'
                        handleOnChange={handleChange}
                        value={user.cpf ? user.cpf : ''}
                    />
                    <Input
                        type='text'
                        text='Telefone celular'
                        name='cel'
                        placeholder='(00) 90000-0000'
                        handleOnChange={handleChange}
                        value={user.cel ? user.cel : ''}
                    />
                </div>
                <div className={styles.item3}>
                    <Input
                        type='text'
                        text='Data de nascimento'
                        name='birthdate'
                        placeholder='dd/mm/aaaa'
                        handleOnChange={handleChange}
                        value={user.birthdate ? user.birthdate : ''}
                    />
                    <Input
                        type='text'
                        text='Telefone fixo'
                        name='phone'
                        placeholder='(00) 0000-0000'
                        handleOnChange={handleChange}
                        value={user.phone ? user.phone : ''}
                    />
                </div>
                <div className={styles.item4}>
                    <Input
                        type='email'
                        text='e-mail'
                        name='email'
                        placeholder='contato@email.com.br'
                        handleOnChange={handleChange}
                        value={user.email ? user.email : ''}

                    />
                    <div className={styles.checkalerts}>
                        <input
                            type="checkbox"
                            name="emailalert"
                            checked={user.emailalert}
                            onChange={checkboxHandleChange}
                        />
                        Quero receber alertas, promoções e novidades por e-mail.
                    </div>
                </div>
                <div className={styles.item5}>
                    <div className={styles.logo}>
                        <h3>Logotipo</h3>
                        <p>O logotipo será incluído ao seu anúncio impresso quando optar por ADICIONAR LOGO.</p>
                        {loading ? <LoadingIcon /> : <img src={logo} alt="Logotipo" />}
                        <label htmlFor="logoFile">Clique para alterar</label>
                        <input
                            type="file"
                            name="logoFile"
                            id="logoFile"
                            onChange={uploadLogo}
                        />
                        <div style={{ display: 'none' }}><Input
                            type='text'
                            text='Logo'
                            name='logo'
                            defaultValue={logo}
                        /></div>
                        <p>Cadastrar imagem em PNG ou JPG, tamanho máximo para arquivo de 10mb.</p>
                    </div>
                </div>
                <div className={styles.item6l}>
                    <h3>Endereço</h3>
                </div>
                <div className={styles.item6}>
                    <Input
                        type='text'
                        text='CEP'
                        name='zipcode'
                        placeholder='00.000-00'
                        handleOnChange={handleChange}
                        value={user.zipcode ? user.zipcode : ''}
                    />
                    <Input
                        type='text'
                        text='Número'
                        name='number'
                        placeholder=''
                        handleOnChange={handleChange}
                        value={user.number ? user.number : ''}
                    />
                </div>
                <div className={styles.item7}>
                    <Input
                        type='text'
                        text='Rua'
                        name='street'
                        placeholder='Nome da rua'
                        handleOnChange={handleChange}
                        value={user.street ? user.street : ''}
                    />
                    <Input
                        type='text'
                        text='Bairro'
                        name='district'
                        placeholder='Nome do bairro'
                        handleOnChange={handleChange}
                        value={user.district ? user.district : ''}
                    />
                </div>
                <div className={styles.item8}>
                    <Input
                        type='text'
                        text='Cidade'
                        name='city'
                        placeholder='Nome da cidade'
                        handleOnChange={handleChange}
                        value={user.city ? user.city : ''}
                    />
                </div>
                <div className={styles.item9}>
                    <Input
                        type='text'
                        text='Estado'
                        name='state'
                        placeholder='Nome do Estado'
                        handleOnChange={handleChange}
                        value={user.state ? user.state : ''}
                    />
                </div>
            </div>
            <div className={styles.button}>
                <SubmitButton text="Editar dados" />
            </div>
            <br />
        </form>
    )
}

export default UserData;