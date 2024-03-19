import multer from "multer";
import uuid from "uuid";

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void
export const storage = multer.diskStorage({
    destination: function (req: Express.Request, file: Express.Multer.File, callback:DestinationCallback) {
        callback(null, 'static');
    },
        // @ts-ignore
    filename: function (req: Request, file: Express.Multer.File, callback: FileNameCallback) {
        const uniqueSuffix = file.originalname + '.' + uuid.v4()
        callback(null, file.fieldname + '-' + uniqueSuffix)
    }
}
)

export default multer({storage});
