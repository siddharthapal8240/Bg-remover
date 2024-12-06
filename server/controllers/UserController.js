import { Webhook } from "svix"

//API Controller Function to manage Clerk User with Database
//https://localhost:4000/api/user/webhooks

const clerkWebhook = async (req, res) => {
    try {
        
        //create a svix intance with clerk webhook secret
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        })

            const{data, type} = req.body

            switch (type) {
                case "user.created":{

                    const userData={
                        clerkId: data.id,
                        email: data.email_addresses[0].email_addresses,
                        photo: data.photo,
                        firstName: data.first_name,
                        lastName: data.last_name,
                        photo: data.image_url
                    }

                    await userModel.create(userData)
                    res.json({ success: true, message: "User created successfully" })

                    break;
                }
                case "user.updated":{


                    const userData={
                        email: data.email_addresses[0].email_addresses,
                        photo: data.photo,
                        firstName: data.first_name,
                        lastName: data.last_name,
                        photo: data.image_url
                    }

                    await userModel.findOneAndUpdate({clerkId: data.id}, userData)
                    res.json({ success: true, message: "User updated successfully" })

                    break;
                }
                case "user.deleted":{

                    await userModel.findOneAndDelete({clerkId: data.id})
                    res.json({ success: true, message: "User deleted successfully" })
                    break;
                }
            
                default:
                    break;
            }

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
        
    }
}

export { clerkWebhook }
