import WordInput from './components/WordInput'
import { MainWindow } from './components/MainWindow'

function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <div>
        <MainWindow />
      </div>
    </>
  )
}

export default App
