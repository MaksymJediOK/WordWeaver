import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { AddWordTo } from './components/AddWordTo'
import { ManualCreation } from './components/ManualCreation'

const Square = ({ text, onClick }: { text: string; onClick: () => void }) => (
  <Button
    className="w-[220px] h-24 flex items-center justify-center text-lg font-semibold gap-6"
    variant="outline"
    onClick={onClick}
  >
    {text}
  </Button>
)

const AutoAdd = ({ onBack }: { onBack: () => void }) => (
  <div className="w-full max-w-md">
    <AddWordTo />
    <BackButton onBack={onBack} />
  </div>
)

const CreateManually = ({ onBack }: { onBack: () => void }) => (
  <div className="w-full max-w-md">
    <ManualCreation />
    <BackButton onBack={onBack} />
  </div>
)

const BackButton = ({ onBack }: { onBack: () => void }) => (
  <Button variant="outline" onClick={onBack} className="flex items-center">
    <ArrowLeft className="mr-2 h-4 w-4" /> Back
  </Button>
)

const CreateOptions = () => {
  const [clickedSquare, setClickedSquare] = useState<number | null>(null)

  const handleSquareClick = (squareNumber: number) => {
    setClickedSquare(squareNumber)
  }

  const handleBack = () => {
    setClickedSquare(null)
  }

  if (clickedSquare === 1) {
    return <AutoAdd onBack={handleBack} />
  }

  if (clickedSquare === 2) {
    return <CreateManually onBack={handleBack} />
  }

  return (
    <div className="flex space-x-4">
      <Square text="Add word" onClick={() => handleSquareClick(1)} />
      <Square text="Create manually" onClick={() => handleSquareClick(2)} />
    </div>
  )
}
export { CreateOptions }
