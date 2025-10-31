import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'; 
import 'aframe';
import HallDeEntrada from './assets/sections/HallDeEntrada';
import Ambiente360 from './assets/sections/Ambiente360';
// import PrimeiraSala from './assets/sections/PrimeiraSala';
import AnteSala from './assets/sections/AnteSala';
import SalaHistoria from './assets/sections/SalaHistoria';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<AnteSala/>}/>
          <Route path='/hallDeEntrada' element={<HallDeEntrada/>}/>
          <Route path='/sala' element={<SalaHistoria/>}/>
          <Route path='/ambiente/:id' element={<Ambiente360/>}/>
        </Routes>
      </Router>
    </div>
  )
}
export default App;