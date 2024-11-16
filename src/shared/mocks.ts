import { BookOpen, Settings2, SquareTerminal } from 'lucide-react'

export const data = {
  user: {
    name: 'Max',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg'
  },
  navMain: [
    {
      title: 'Manual Input',
      url: 'manual',
      icon: SquareTerminal
    },
    {
      title: 'Words Table',
      url: 'table',
      icon: BookOpen
    },
    {
      title: 'Settings',
      url: 'settings',
      icon: Settings2
    }
  ]
}
