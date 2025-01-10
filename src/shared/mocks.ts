import { BookOpen, SquareTerminal } from 'lucide-react'
import { CurrentPageName } from './types'

export const data = {
  user: {
    name: 'Max',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg'
  },
  navMain: [
    {
      title: 'Manual Input',
      url: CurrentPageName.manual,
      icon: SquareTerminal
    },
    {
      title: 'Words Table',
      url: CurrentPageName.table,
      icon: BookOpen
    }
  ]
}
