const { Pool } = require('pg');


const pool = new Pool({
    host:'localhost',
    user: 'postgres',
    password: '123',
    database: 'primeraapi',
    port: '5432'
})

const getUser = async (req, res)=>{
   const response =  await pool.query('SELECT * FROM usuarios');
    res.json(response.rows);
}

const getUserById = async (req, res)=>{
    // res.send('update user ID = ' + req.params.id)
     const response = await pool.query("SELECT * FROM usuarios WHERE id = $1", [req.params.id]);
     res.json(response.rows)
}

const createUser = async (req, res)=>{
    // console.log(req.body)
    const { name, email } = req.body;
    response = await pool.query("INSERT INTO usuarios (name, email) VALUES($1, $2)", [name, email])
    console.log(response)
    res.send('user created')
} 

const deleteUser = async (req, res)=>{
    // res.send('deleted user = '+ req.params.id);
    const id = req.params.id
    const response = await pool.query("DELETE FROM usuarios WHERE id = $1", [id])
    console.log(response);
    res.json(`User ${id} deleted successfully`)
}

const updateUser = async (req, res)=>{
    const id = req.params.id;
    const { name, email }= req.body;
    console.log(id, name, email)    
    const response = await pool.query('UPDATE usuarios SET name = $1, email = $2 WHERE id = $3', [name, email, id])
    console.log(response)
    res.json("User updated successfully")
    

}


module.exports = {
    getUser,
    createUser,
    getUserById,
    deleteUser,
    updateUser
}