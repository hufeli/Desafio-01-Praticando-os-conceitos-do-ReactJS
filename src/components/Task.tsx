
import { useState } from 'react'
import { NewTask } from './NewTask'
import { v4 as uuid } from 'uuid'

import styles from './Task.module.css'
import imageClipboard from '../assets/Clipboard.svg'
import { CheckCircle, Circle, Trash } from '@phosphor-icons/react'

interface TodoList {
  id: string,
  text: string,
  checked: boolean
}

export const Task = () => {
  const [todoList, setTodoList] = useState<TodoList[] | null>(null)
  const [hoverCheck, setHoverCheck] = useState<string | null>();
  const [totalCheckedTasks, setTotalCheckedTasks] = useState<number>(0)

  const todoListEmpty = todoList === null

  const handleCreateNewTask = (newTaskText: string) => {
    if (todoListEmpty) {
      setTodoList([
        {
          id: uuid(),
          text: newTaskText,
          checked: false
        }
      ])
    }
    else {
      setTodoList([...todoList, {
        id: uuid(),
        text: newTaskText,
        checked: false
      }])
    }
  }

  const handleCheckedTask = (id: string) => {
    const updateTask = todoList?.map(item => {
      if (item.id === id) {
        setTotalCheckedTasks(item.checked ? totalCheckedTasks - 1 : totalCheckedTasks + 1)
        item.checked = !item.checked
        return item
      }
      return item

    })
    setTodoList(updateTask!)
  }

  const handleRemoveTask = (id: string) => {
    const removeTask = todoList?.filter(item => item.id !== id)
    setTotalCheckedTasks(totalCheckedTasks > 0 ? totalCheckedTasks - 1 : 0)

    setTodoList(removeTask!)
  }

  return (
    <>
      <NewTask todoList={handleCreateNewTask} />

      <div className={styles.taskContent}>
        <div className={styles.taskInfo}>
          <div className={styles.taskCreated}>
            Tarefas criadas <span>{todoList !== null ? todoList?.length : '0'}</span>
          </div>

          <div className={styles.taskDone}>
            Concluídas <span>{todoList !== null && todoList.length > 0 ? `${totalCheckedTasks} de ${todoList?.length}` : '0'}</span>
          </div>
        </div>


        {todoListEmpty && (
          <div className={styles.taskListEmptyContent}>
            <div className={styles.taskListEmpty}>
              <img src={imageClipboard} alt="Imagem de um clipboard" />
              <p>Você ainda não tem tarefas cadastradas</p>
              <span>Crie tarefas e organize seus itens a fazer</span>
            </div>
          </div>
        )}

        <div className={styles.taskListContent}>
          {todoList?.map(todo => (
            <div
              key={todo.id}
              className={styles.task}
            >
              <button
                className={styles.taskChecked}
                onClick={() => handleCheckedTask(todo.id)}
                onMouseEnter={() => setHoverCheck(todo.id)}
                onMouseLeave={() => setHoverCheck(null)}
              >
                {todo.checked ? (
                  <CheckCircle size={24} className={styles.checkedIcon} weight="fill" />
                ) : (
                  <Circle
                    size={24}
                    className={styles.circleIcon}
                    weight={hoverCheck === todo.id ? 'duotone' : 'regular'}
                  />
                )}
              </button>
              <p>{todo.text}</p>
              <button
                className={styles.taskTrash}
                onClick={() => handleRemoveTask(todo.id)}
              >
                <Trash size={20} />
              </button>
            </div>
          ))}
        </div>

      </div >
    </>
  )
}