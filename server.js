const express = require('express');
const prisma = require('./prisma');
const app = express();
app.use(express.json());



app.get('/employees' , async (req, res) => {
    try{
        const employees = await prisma.employee.findMany();
        res.json(employees)
    }catch(err){
        console.error(err)
    }
});

app.get('/employees/:id', async(req, res)=>{
    const { id } = req.params;
    try {
        const employee = await prisma.employee.findMany({
            where: {id: +id},
        });
        res.status(201).json(employee)
    } catch (error) {
       console.error('couldnt get the user', error);
       res.status(404) 
    }
})

app.put('/employees/:id', async(req, res)=>{
    const { id } = req.params;
    const { name } = req.body;
    try {
        const employee = await prisma.employee.update({
            where: {id: +id},
            data: {name},
        })
        res.status(201).json(employee)
    } catch (error) {
        console.error('couldnt update the new user', error)
        res.status(404)
        
    }
})

app.delete('/employees/:id', async(req, res)=>{
    const { id } = req.params;
  
    try {
        const employee = await prisma.employee.delete({
            where: {id: +id},
        })
        res.status(201).json(employee)
    } catch (error) {
        console.error('couldnt update the new user', error)
        res.status(404)
    }
})    

app.post('/employees' , async (req, res) => {
    const {name} = req.body;
    try{
        const newEmployee = await prisma.employee.create({
            data: {name}
        });
        res.json(newEmployee)
    }catch(err){
        console.error(err)
        res.status(404).json('coudlnt add the employee')
    }
});



app.get('/' , async (req, res) => {
    res.send('Welcome to the prismatic employees')
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});