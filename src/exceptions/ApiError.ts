class ApiError extends Error {
   public status: number;
   public message: string;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
    }

    static badRequest(message: string,) {
        return new ApiError(400, message,);
    }

    static unauthorized() {
        return new ApiError(401, 'пользователь не авторизован');
    }

}

export default ApiError;
