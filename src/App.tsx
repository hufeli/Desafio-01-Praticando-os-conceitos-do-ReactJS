import { Header } from './components/Header'
import { NewTask } from './components/NewTask'

import styles from './App.module.css'
import "./global.css"
import { Task } from './components/Task'

function App() {

  return (
    <div>
      <Header />
      <div className={styles.wrapper} >
        <main>
          <Task />
        </main>
      </div>
    </div>
  )
}

export default App
