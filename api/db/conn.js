import mongoose from 'mongoose'
import chalk  from 'chalk'
// mongodb+srv://harshit007:${process.env.PASSWORD}@harshit007.ffeuyle.mongodb.net/?retryWrites=true&w=majority
const connectDB = async () => {
    try{
        await mongoose.connect(`mongodb+srv://harshit007:${process.env.PASSWORD}@harshit007.ffeuyle.mongodb.net/?retryWrites=true&w=majority`)
        console.log(chalk.red.bgBlue.bold('Database Connected Successfully'))
    } catch(e) {
        console.log(e)
        process.exit(1)
    }
  
}

export default connectDB