import * as yup from 'yup';

const useHandler = (handler) => {
    return async (req, res) => {
        try {
            try {
                return await handler(req, res);
            } catch (err) {
                if (err instanceof yup.ValidationError) {
                    return res.status(422).json({
                        errors: err.errors.map((message) => ({
                            status: 422,
                            title: 'Validation Erorr',
                            detail: message,
                        })),
                    });
                }
                throw err;
            }
        } catch (err) {
            return res.status(500).json({
                errors: [
                    {
                        status: 500,
                        title: 'Unexpected Error',
                        detail: process.env.APP_DEBUG ? err.message : 'An unexpected error occurred',
                    },
                ],
            });
        }
    };
};

export { useHandler };
