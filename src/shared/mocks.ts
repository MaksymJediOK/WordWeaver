import { BookOpen, Settings, SquareTerminal } from 'lucide-react'
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
    },
    {
      title: 'Settings',
      url: CurrentPageName.config,
      icon: Settings
    }
  ]
}

export const availableWordsPerPage = [20, 30, 40, 50]
export const supportedLanguages: string[] = [
  'AR - Arabic',
  'BG - Bulgarian',
  'CS - Czech',
  'DA - Danish',
  'DE - German',
  'EL - Greek',
  'EN - English',
  'ES - Spanish',
  'ET - Estonian',
  'FI - Finnish',
  'FR - French',
  'HU - Hungarian',
  'ID - Indonesian',
  'IT - Italian',
  'JA - Japanese',
  'KO - Korean',
  'LT - Lithuanian',
  'LV - Latvian',
  'NB - Norwegian Bokmål',
  'NL - Dutch',
  'PL - Polish',
  'PT - Portuguese (unspecified variant for backward compatibility; please select PT-BR or PT-PT instead)',
  'PT-BR - Portuguese (Brazilian)',
  'PT-PT - Portuguese (all Portuguese variants excluding Brazilian Portuguese)',
  'RO - Romanian',
  'RU - Russian',
  'SK - Slovak',
  'SL - Slovenian',
  'SV - Swedish',
  'TR - Turkish',
  'UK - Ukrainian',
  'ZH - Chinese (unspecified variant for backward compatibility; please select ZH-HANS or ZH-HANT instead)',
  'ZH-HANS - Chinese (simplified)',
  'ZH-HANT - Chinese (traditional)'
]
