const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolved(requestHandler(req, res, next)).catch((err) => next(err))
    }
}

export default asyncHandler;