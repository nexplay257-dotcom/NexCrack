const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const { gamesData } = require('./gamesData');

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

async function main() {
  await prisma.game.deleteMany();
  for (const game of gamesData) {
    await prisma.game.create({
      data: {
        ...game,
        releaseDate: new Date(game.releaseDate),
        slug: slugify(game.title),
      },
    });
  }

  console.log('✅ Jeux ajoutés !');
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });