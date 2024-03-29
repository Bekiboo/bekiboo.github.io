import {
    qs,
    onTouch
} from './utilities.js';
import {
    readFromLS,
    writeToLS
} from './ls.js';

let todoList = []
let filterState = "all"

export default class Todos {
    constructor(parentElementId, key) {
        this.parentElement = document.getElementById(parentElementId)
        this.key = key
    }

    addTodo(e) {
        e.preventDefault()
        const todoInput = qs('.todo-input')
        const newTask = todoInput.value
        if (newTask) {
            saveTodo(newTask, this.key)
            this.listTodos()
            todoInput.value = ''
        }
    }

    listTodos() {
        this.filterTodo(filterState)
        taskCounter()
    }

    completeTodo(todoId) {
        const completedTodo = todoList.find(({
            id
        }) => id === parseInt(todoId))
        completedTodo.completed = !completedTodo.completed
        writeToLS(this.key, todoList)
        this.listTodos()
    }

    removeTodo(todoId) {
        todoList = todoList.filter((id) => {
            return id.id != parseInt(todoId);
        });
        writeToLS(this.key, todoList)
        this.listTodos()
    }
    filterTodo(filter) {
        getTodos(this.key)
        switch (filter) {
            case 'all':
                renderTodoList(todoList, this.parentElement)
                filterState = "all"
                break;
            case 'active':
                let activeTodoList = todoList.filter((state) => {
                    return state.completed === false;
                });
                renderTodoList(activeTodoList, this.parentElement)
                filterState = "active"
                break;
                case 'completed':
                    let completedTodoList = todoList.filter((state) => {
                        return state.completed === true;
                    });
                    renderTodoList(completedTodoList, this.parentElement)
                    filterState = "completed"
                break;

            default:
                break;
        }
// THE SWITCH STATEMENT ABOVE NEEDS TO BE CHANGED TO AVOID ANY BUGS WHILE 
// ADDING A NEW IMPUT WHEN ON A FILTER;
    }
}

function saveTodo(task, key) {
    const todo = {
        id: Date.now(),
        content: task,
        completed: false
    }
    getTodos(key)
    todoList.push(todo)
    writeToLS(key, todoList)
}

function getTodos(key) {
    if (todoList.length === 0) {
        todoList = readFromLS(key)
        console.log(todoList);
        if (todoList === null) {
            todoList = []
        }
    }
    return todoList
}

function renderTodoList(list, element) {
    element.innerHTML = ''
    list.forEach(todo => {
        // Create div
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo')
        // Check mark button
        const completedButton = document.createElement('button')
        completedButton.innerHTML = '<i class="fas fa-check"></i>'
        completedButton.classList.add('complete-btn')
        todoDiv.appendChild(completedButton)
        // Create li
        const newTodo = document.createElement('li')
        newTodo.innerText = todo.content
        newTodo.classList.add('todo-item')
        newTodo.setAttribute('data-todoid', todo.id)
        newTodo.setAttribute('data-completed', todo.completed)
        todoDiv.appendChild(newTodo)
        // Check trash button
        const trashButton = document.createElement('button')
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'
        trashButton.classList.add('trash-btn')
        todoDiv.appendChild(trashButton)
        // Append to list
        element.appendChild(todoDiv)
    });
}

function taskCounter() {
    const totalTodos = qs('.total-todo')
    let completed = todoList.filter((state) => {
        return state.completed === false;
    });
    const plural = completed.length > 1 ? 's' : ''
    totalTodos.innerText = `Task${plural} left: ${completed.length}`
}