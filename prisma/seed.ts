import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const existingConfig = await prisma.userConfigSelection.findFirst()

  if (!existingConfig) {
    await prisma.userConfigSelection.create({
      data: {
        wordsPerPage: 20,
        fromLang: 'en',
        toLang: 'uk'
      }
    })

    console.log('UserConfigSelection initialized with default values.')
  } else {
    console.log('UserConfigSelection already exists, skipping seeding.')
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
