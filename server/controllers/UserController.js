import svix from 'svix';  // Use default import for CommonJS module

// Destructure the `Webhook` from the default import
const { Webhook } = svix;

//API controller function to manage Clerk User with database
// http://localhost:4000/api/user/webhooks

const clerkWebhooks = async (req, res) => {
    
    try {
        
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-signature": req.headers["svix-signature"],
            "svix-timestamp": req.headers["svix-timestamp"]
        })

        const {data, type} = req.body

        switch (type) {
            case "user.created": {

                const userData = {
                    clerkId: data.id,
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url
                }

                await userModel.create(userData)
                res.json({})

                break;

            }
            case "user.updated": {

                const userData = {
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url
                }

                await userModel.findOneAndUpdate({clerkId: data.id}, userData)
                res.json({})

                break;

            }
            case "user.deleted": {
                await userModel.findOneAndDelete({clerkId: data.id})
                res.json({})

                break;

            }
                
        
            default:
                break;
        }




    } catch (error) {

        console.log(error.message)
        res.json({success: false, message: error.message})
        
    }
}

export {clerkWebhooks}