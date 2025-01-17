import CPFGenerator from "./components/cpf-generator";
import styles from "./style/page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.code}>
        <p>Gerador de CPF</p>
        <div className={styles.description}>
          <p>By Érika Rocha</p>
        </div>
      </div>
      <CPFGenerator />
      <div className={styles.grid}>
        <a
          href="https://erikarg.github.io/me/"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Portfolio <span>-&gt;</span>
          </h2>
          <p>Visite meu site.</p>
        </a>
        <br />
        <a
          href="http://www.github.com/erikarg"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Projetos <span>-&gt;</span>
          </h2>
          <p>Encontre mais no GitHub.</p>
        </a>
      </div>
    </main>
  );
}
