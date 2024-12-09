import styles from './Header.module.css'

import todoLogo from '../assets/rocket.svg'

export const Header = () => {

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={todoLogo} alt="Logotipo do todo" />
        <div className={styles.todo}>
          to<span>do</span>
        </div>
      </div>
    </header>
  )
}