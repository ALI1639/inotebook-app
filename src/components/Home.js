import Notes from "./Notes"
import About from './About';
export default function Home(props) {
const {showAlert} = props
  return (

    <div>
      <Notes showAlert={showAlert}/>
      <About/>
    </div>

  )
}