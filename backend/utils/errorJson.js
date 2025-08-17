export const errorJson = (code=400, message='An error occured', res) => {
    console.log("status:",code)
    console.log("message:",message)
    console.log("result:",res)
    return res.json({
        success: false,
        message
    })
}