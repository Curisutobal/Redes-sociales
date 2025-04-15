import express from 'express'
import bd from './bd/bd.utils.js'
const app = express()


app.use(express.json())



app.get('/aaloohaa', (req, res) => {
  const response = bd.readTableDB("inventory")
  res.status(200).json(response);
})


app.get('/aaloohaa/:id', (req, res) => {
  const response = bd.readTableDB("inventory")
  const{id} = req.params;
  
  const elementId = response.find((element) => "" + element.id === id)
  
  res.json(elementId);
})


app.post('/aaloohaa', (req, res) => {


  
  const {nombreObjeto, precio} =req.body

  if (!nombreObjeto) 
    return res.status(400).json({error: "debe utilizar nombreObjeto"})

  if (!precio) 
    return res.status(400).json({error: "debe utilizar precio"})
  const toSave = {nombreObjeto, precio};
  bd.addObjectInTable("inventory", toSave);
  
  res.status(200).json(toSave)
})

app.put('/aaloohaa/:id', (req, res) => {
  const {nombreObjeto, precio} =req.body
  const{id} = req.params;
  const toUpdate = bd.updateTableDB("inventory", {
    id: Number(id), nombreObjeto, precio
  })
  if (!nombreObjeto) 
    return res.status(400).json({error: "debe utilizar nombreObjeto"})

  res.status(200).json(toUpdate);
})

app.delete('/aaloohaa/:id', (req, res) => {
  
  const{id} = req.params;
  
  const toDelete = bd.deleteTableDB("inventory", Number(id))


  
  res.status(200).json(toDelete)

})

app.listen(3000)
/*
async function main() {
  const data = await getData("https://pokeapi.co/api/v2/pokemon-species");
  const data2 = await getData(data.next);

  const completedResult = [...data.results, ...data2.results];

  console.log(completedResult);
}




(async() =>
  await main()
)()*/