require("dotenv").config()

const express = require("express")
const cors = require("cors")
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const app = express()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

app.use(cors())
app.use(express.json())

// GET ALL GAMES
app.get("/games", async (req, res) => {
  try {
    const games = await prisma.game.findMany({
      orderBy: {
        createdAt: "desc"
      }
    })

    res.json(games)

  } catch (err) {
    console.log(err)

    res.status(500).json({
      error: "Erreur serveur"
    })
  }
})

// GET ONE GAME
app.get("/games/:id", async (req, res) => {
  try {
    const game = await prisma.game.findUnique({
      where: {
        id: req.params.id
      }
    })

    res.json(game)

  } catch (err) {
    res.status(500).json({
      error: "Erreur serveur"
    })
  }
})

// ADD GAME
app.post("/games", async (req, res) => {
  try {
    const game = await prisma.game.create({
      data: req.body
    })

    res.json(game)

  } catch (err) {
    console.log(err)

    res.status(500).json({
      error: "Erreur serveur"
    })
  }
})

// REGISTER
app.post("/register", async (req, res) => {
  try {

    const { username, email, password } = req.body

    // Vérification mot de passe sécurisé
const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d).{8,}$/

if (!passwordRegex.test(password)) {
  return res.status(400).json({
    error:
      "Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre"
  })
}

    // Vérifie si le compte existe déjà
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email },
          { username: username }
        ]
      }
    })

    if (existingUser) {
      return res.status(400).json({
        error: "Utilisateur déjà existant"
      })
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10)

    // Création utilisateur
    const user = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword
      }
    })

    // Création token
    const token = jwt.sign(
      { id: user.id },
      "SECRET_KEY"
    )

    // Réponse
    res.json({
      token: token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    })

  } catch (err) {

    console.log(err)

    res.status(500).json({
      error: "Erreur serveur"
    })

  }
})

// LOGIN
app.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body

    // Cherche utilisateur
    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    })

    // Si compte inexistant
    if (!user) {
      return res.status(400).json({
        error: "Compte introuvable"
      })
    }

    // Vérifie mot de passe
    const validPassword = await bcrypt.compare(
      password,
      user.password
    )

    if (!validPassword) {
      return res.status(400).json({
        error: "Mot de passe incorrect"
      })
    }

    // Token
    const token = jwt.sign(
      { id: user.id },
      "SECRET_KEY"
    )

    // Réponse
    res.json({
      token: token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    })

  } catch (err) {

    console.log(err)

    res.status(500).json({
      error: "Erreur serveur"
    })

  }
})

// CHANGE PASSWORD
app.post("/change-password", async (req, res) => {
  try {
    // Cherche utilisateur
const user = await prisma.user.findUnique({
  where: {
    id: userId
  }
})

// Vérifie ancien mot de passe
const validPassword = await bcrypt.compare(
  oldPassword,
  user.password
)

if (!validPassword) {
  return res.status(400).json({
    error: "Ancien mot de passe incorrect"
  })
}

const { userId, oldPassword, password } = req.body
    // Sécurité mot de passe
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d).{8,}$/

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error:
          "Le mot de passe doit contenir 8 caractères, une majuscule et un chiffre"
      })
    }

    // Hash nouveau mdp
    const hashedPassword =
      await bcrypt.hash(password, 10)

    // Update utilisateur
    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        password: hashedPassword
      }
    })

    res.json({
      message: "Mot de passe modifié"
    })

  } catch (err) {

    console.log(err)

    res.status(500).json({
      error: "Erreur serveur"
    })

  }
})

app.listen(3001, () => {
  console.log("API ONLINE : http://localhost:3001")
})

