const input = document.getElementById("taskInput")
const addBtn = document.getElementById("addBtn")
const taskList = document.getElementById("taskList")
const taskCount = document.getElementById("taskCount")
const filters = document.querySelectorAll(".filters button")

let tasks = JSON.parse(localStorage.getItem("tasks")) || []
let currentFilter = "all"

renderTasks()

addBtn.onclick = () => {

if(input.value === "") return

tasks.push({
text: input.value,
completed:false
})

input.value = ""

saveTasks()
renderTasks()

}

function renderTasks(){

taskList.innerHTML=""

let filtered = tasks.filter(task =>{

if(currentFilter === "pending") return !task.completed
if(currentFilter === "completed") return task.completed
return true

})

filtered.forEach((task,index)=>{

const li = document.createElement("li")

const span = document.createElement("span")
span.textContent = task.text

if(task.completed){
span.classList.add("completed")
}

span.onclick = () =>{

task.completed = !task.completed

saveTasks()
renderTasks()

}

const del = document.createElement("button")
del.textContent="X"
del.classList.add("delete")

del.onclick = ()=>{

tasks.splice(index,1)

saveTasks()
renderTasks()

}

li.appendChild(span)
li.appendChild(del)

taskList.appendChild(li)

})

updateCount()

}

function updateCount(){

const total = tasks.length
const completed = tasks.filter(t=>t.completed).length

taskCount.textContent = `Total: ${total} | Concluídas: ${completed}`

}

function saveTasks(){

localStorage.setItem("tasks", JSON.stringify(tasks))

}

filters.forEach(btn=>{

btn.onclick = ()=>{

currentFilter = btn.dataset.filter
renderTasks()

}

})