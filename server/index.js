const express = require("express");
const app = express(); 
const cors = require("cors");
const pool = require("./db")

//middleware
app.use(cors());
app.use(express.json()) //gives us access to request.body, then we can get json data

app.listen(5000, () => (
    console.log("server has started on port 5000")
))

//ROUTES// (running queries)

//create a todo 

app.post("/todos", async (req, res) =>{ //is post because were going to be adding data
  try{
      const { description } = req.body; 
      const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *", //insert into command specifies table youre inserting into, and column, then enter value of description (value is placeholder)
      [description] //represents $1
);

res.json(newTodo.rows[0]); 
  } catch(err){
      console.error(err.message);
  }
});

//get all todos

app.get("/todos", async(req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo")
        res.json(allTodos.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//get a todo

app.get("/todos/:id", async(req, res) => { 
    try {
        const {id} = req.params; 
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]) //where clause specifies what type of todo we want
        //where clause allows us to specify what we are trying to get
        res.json(todo.rows[0]); 
    } catch (err) {
        console.error(err.message)
    }
})

//update a todo

app.put("/todos/:id", async (req, res) => {
    try {
        const {id} = req.params; 
        const {description} = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", //update in todos table set description to $1
         [description, id] //specify table
        );

        res.json("Todo was updated!")
    } catch (err) {
        console.error(err.message)
    }
})

//delete a todo 

app.delete("/todos/:id", async (req, res) =>{
    try {
        const {id} = req.params; 
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [ //specify delete from, specify table, see where it was located at 
            id
        ])

        res.json("Todo was deleted!"); 
    } catch (err) {
        console.log(err.message)
    }
})