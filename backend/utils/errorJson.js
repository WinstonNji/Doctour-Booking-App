export const errorJson = (code=400, message='An error occured', res) => {
    return res.json({
        success: false,
        message
    })
}