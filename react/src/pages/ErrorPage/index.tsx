import texts from "../../_lang";
import styles from "../../styles/index.module.css";
import { ReactComponent as Logo } from "../../assets/icons/Lockup_Logo.svg";
import ErrorComponent from "../../components/ErrorComponent";
import { ErrorTypes } from "../../types/error";


type Props = {
  error: ErrorTypes;
}

function ErrorPage({ error }: Props) {


  const refreshPage = () => {
    window.location.href = window.location.href
  }

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <Logo width={238} />
      </header>
      <ErrorComponent type={error} refreshAction={refreshPage} />
      <footer className={styles.footer}>
        <a href="/">{texts.footer.register.privacy}</a>
        <a href="/">{texts.footer.register.terms}</a>
      </footer>
    </div>
  )

}

export default ErrorPage