import React from 'react'
import { TableCell, TableRow } from './ui/table'

import { BaseWord } from '@shared/types'

export const TableCells = ({ words }: { words: BaseWord[] }) => {
  return words.map((word) => {
    return (
      <TableRow key={word.id}>
        <TableCell className="font-medium">{word.id}</TableCell>
        <TableCell>{word.originalWord}</TableCell>
        <TableCell>{word.translatedWord}</TableCell>
        <TableCell className="max-w-[400px]">
          {word.example}
          <br /> {word.translatedExample}
        </TableCell>
      </TableRow>
    )
  })
}
