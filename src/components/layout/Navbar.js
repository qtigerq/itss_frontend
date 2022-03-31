import styles from "./Navbar.module.css"
import { IoMdMenu } from "react-icons/io";
import { Link } from 'react-router-dom';

const Navbar = ({ userId, userName }) => {

    return (
        <nav className={styles.navbar}>
            <a href="/"><div className={styles.logo}></div></a>
            <div className={styles.dropdown}>
                <button className={styles.dropbtn}><IoMdMenu /></button>
                <div className={styles.dropdowncontent}>
                    <a href="/"><strong>Olá {userName}!</strong></a>
                    
                    <Link to={`/userdata/${userId}`}>
                    Dados do usuário
                    </Link>
                    <a href="/">Criar anúncio</a>
                    <a href="/">Carrinho</a>
                    <a href="/">Meus anúncios</a>
                    <a href="/">Rascunho</a>
                    <a href="/">Boletos</a>
                    <a href="/">Sair</a>
                    <a href="/" className={styles.linediv}> </a>
                    <a href="/">FAQ</a>
                    <a href="/">Fale conosco</a>
                    <a href="/">Termos de uso</a>
                    <a href="/">Política de privacidade</a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;