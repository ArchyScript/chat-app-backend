const router = require('express').Router()
const { signup, login, getUserInfo, updateProfile, addProfileImage, removeProfileImage } = require('../controller/auth-controller')
const verifyToken = require('../middleware/auth-middleware')
const multer = require('multer')

const upload = multer({ dest: 'uploads/profiles/' })

router.post('/signup', signup)
router.post('/login', login)
router.get('/user-info', verifyToken, getUserInfo)
router.put('/update-profile', verifyToken, updateProfile)
router.post('/add-profile-image', verifyToken, upload.single('profile-image'), addProfileImage)
router.delete('/remove-profile-image', verifyToken, removeProfileImage)

module.exports = router