import React, { useRef } from 'react'
import '../assets/tableCells.css'
import { TableCell, TableRow } from './ui/table'
import { BaseWord } from '@shared/types'
import { Button } from './ui/button'
import { Separator } from './ui/separator'

export const TableRecord = ({ word, refresh }: { word: BaseWord; refresh: () => any }) => {
  const initialWord = useRef<BaseWord>(word)
  const removeWord = async (id: number) => {
    await window.api.removeWord(id)
    await refresh()
  }
  const handleEditOriginalWord = async (id: number, text: string) => {
    if (text === initialWord.current.originalWord) return
    await window.api.editOriginalWord(id, text)
    initialWord.current.originalWord = text
  }

  const handleEditTranslatedWord = async (id: number, text: string) => {
    if (text === initialWord.current.translatedWord) return
    await window.api.editTranslatedWord(id, text)
    initialWord.current.translatedWord = text
  }

  const handleEditExample = async (id: number, text: string) => {
    if (text === initialWord.current.example) return
    await window.api.editExample(id, text)
    initialWord.current.example = text
  }

  const handleEditTranslatedExample = async (id: number, text: string) => {
    if (text === initialWord.current.translatedExample) return
    await window.api.editTranslatedExample(id, text)
    initialWord.current.translatedExample = text
  }
  return (
    <TableRow key={word.id} className="row-cell">
      <TableCell
        className="w-1/6"
        contentEditable
        suppressContentEditableWarning
        onBlur={(event) => handleEditOriginalWord(word.id, event.currentTarget.textContent || '')}
      >
        {word.originalWord}
      </TableCell>
      <TableCell
        className="w-1/6"
        contentEditable
        suppressContentEditableWarning
        onBlur={(event) => handleEditTranslatedWord(word.id, event.currentTarget.textContent || '')}
      >
        {word.translatedWord}
      </TableCell>
      <TableCell className="max-w-[400px]">
        <div
          contentEditable
          suppressContentEditableWarning
          onBlur={(event) => handleEditExample(word.id, event.currentTarget.textContent || '')}
        >
          {word.example}
        </div>
        <Separator />
        <div
          contentEditable
          suppressContentEditableWarning
          onBlur={(event) =>
            handleEditTranslatedExample(word.id, event.currentTarget.textContent || '')
          }
        >
          {word.translatedExample}
        </div>
      </TableCell>
      <TableCell className="max-w-[50px]">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full shadow-sm delete-btn"
          onClick={() => removeWord(word.id)}
        >
          X
        </Button>
      </TableCell>
    </TableRow>
  )
}
