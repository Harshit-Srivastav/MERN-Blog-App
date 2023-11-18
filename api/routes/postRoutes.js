import express from 'express'
import multer from 'multer'
import fs from 'fs'
import path from 'path'
import authorizeBearerToken from '../middleware/auth.js'
import PostController from '../controllers/postController.js'
const postRouter = express.Router()
// Set up Multer storage


// const upload = multer({dest: 'uploads/'})

// postRouter.post('/', authorizeBearerToken, upload.single('file'), async (req, res) => {
//     try{
//         const {title, summary, content} = req.body
//         const {originalname, path} = req.file
//         const parts = originalname.split('.')
//         const ext = parts[parts.length - 1]
//         const newPath = path + Date.now() + '.' + ext
//         fs.renameSync(path, newPath)
//         const result =  await Post.create({
//           title,
//           summary,
//           content,
//           img: newPath,
//           author: req.user._id
//           })
//         console.log("result", result)
       
//     } catch(e) {
//         res.json({status: false, message: e.message})
//     }
// })
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.' + file.originalname.split('.')[1]
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

postRouter.post('/', authorizeBearerToken, upload.single('file'), PostController.createPost)
postRouter.get('/', PostController.fetchPosts)
postRouter.get('/:id', PostController.fetchSinglePost)
postRouter.post('/edit/:id', authorizeBearerToken, upload.single('file'), PostController.editPost)
postRouter.delete('/delete/:id', authorizeBearerToken, PostController.deletePost)
export default postRouter




















        // const {originalname, path} = req.file
        // const parts = originalname.split('.')
        // const ext = parts[parts.length - 1]
        // const newPath = path + '.' + ext
        // fs.renameSync(path, newPath)