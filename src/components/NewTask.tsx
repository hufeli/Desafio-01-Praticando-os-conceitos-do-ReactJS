import { useState, ChangeEvent, FormEvent } from 'react'
import styles from './NewTask.module.css'
import { PlusCircle } from '@phosphor-icons/react'
import { TodoListProps } from './TodoList'


export const NewTask = ({ todoList }: TodoListProps) => {

  const [newTask, setNewTask] = useState('')

  const isNewTaskEmpty = newTask.trim().length === 0

  const handleNewTodoList = (event: FormEvent) => {
    event.preventDefault()

    todoList(newTask)
    setNewTask('')
  }

  const handleNewTaskChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value)
  }

  return (

    <form onSubmit={handleNewTodoList} className={styles.newTask}>
      <input type="text" onChange={handleNewTaskChange} value={newTask} placeholder='Adicione uma nova tarefa' required />
      <button type='submit' disabled={isNewTaskEmpty}>
        Criar
        <PlusCircle size={16} />
      </button>
    </form>

  )
}