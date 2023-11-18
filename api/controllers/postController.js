import { response } from 'express'
import Post from '../models/PostModel.js'

class PostController{
    static async createPost(req, res){
     
         try{
              const result = await Post.create({
                ...req.body,
                img: req.file.path,
                author: req.user._id
               })
               res.status(200).send({success: true, message: 'Post created successfully'})
            } catch(e){
              console.log(e.message)
              res.status(400).send({success: false, message: e.message})
            }
            
    }
  static async fetchPosts(req, res) {
    try{
        const result = await Post.find({}).populate('author', ['name'])
        res.status(200).send({success: true, posts: result})
    } catch(e){
        res.status(400).send({success: false, message: e.message})
    }
  }
  static async fetchSinglePost(req, res) {
    const id = req.params.id
    try{
        const result = await Post.findById(id).populate('author', ['name'])
        res.status(200).send({success: true, post: result})
    } catch(e){
        console.log(e)
        res.status(400).send({success: false, message: 'Try Again. No Post Found'})
    }
  }
  static async editPost(req, res){
    try{
        const postId = req.params.id;
        const post = await Post.findById(postId)
        if(!post){
          return res.status(400).send({success: false, message: 'No Post Exist'})
        }
        if(!post.author.equals(req.user._id)){
          return res.status(400).send({success: false, message: 'You are not allowed to access this'})
        }
        const {title, summary, content} = req.body
        const newImg = !req.file ? post.img : req.file.path
       
        const dataToBeUpdted = {
          title,
          summary,
          content,
          img: newImg
        }
        const result = await Post.findByIdAndUpdate(postId, dataToBeUpdted, { new: true, upsert: true })
        res.status(200).send({success: true, message: 'Post updated successfully'})
       
    } catch(e){
        res.status(400).send({success: false, message: 'Try again...'})
    }
  }
 static async deletePost(req, res) {
    try{
      const id = req.params.id
      const post = await Post.findById(id)
        if(!post){
          return res.status(400).send({success: false, message: 'No Post Exist'})
        }
        if(!post.author.equals(req.user._id)){
          return res.status(400).send({success: false, message: 'You are not allowed to access this'})
        }
      const result = await Post.findByIdAndDelete(id)
      res.status(200).send({success: true, message: 'Post deleted successfully'})
    } catch(e){
      res.status(400).send({success: false, message: 'Post not deleted'})
    }
 }
}

export default PostController