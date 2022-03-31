import styles from "./Home.module.css"

const Home = ({ userName }) => {
    return (
        <div className={styles.home}>
            <h1>Seja bem vindo {userName}</h1>
        </div>
    )
}

export default Home;