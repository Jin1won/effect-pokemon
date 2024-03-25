import './App.css'
import {  usePokemonQurey } from './service/pokemon';

function App() {
  const { data } = usePokemonQurey("1");
  if(!data) return <div>loading</div>
  return (
    <>
      <img src={data.imageUrl} />
      <div>{data.name}</div>
    </>
  )
}

export default App
