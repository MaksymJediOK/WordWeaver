import React from 'react'
import '../assets/tableCells.css'
import { TableCell, TableRow } from './ui/table'
import { BaseWord } from '@shared/types'
import { Button } from './ui/button'

export const TableCells = ({ words, refresh }: { words: BaseWord[]; refresh: () => any }) => {
  const removeWord = async (id: number) => {
    await window.api.removeWord(id)
    await refresh()
  }
  return words.map((word) => {
    return (
      <TableRow key={word.id} className="row-cell">
        <TableCell className="w-1/6">{word.originalWord}</TableCell>
        <TableCell className="w-1/6">{word.translatedWord}</TableCell>
        <TableCell className="max-w-[400px]">
          {word.example}
          <br /> {word.translatedExample}
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
  })
}
