import multiparty from 'multiparty';
import { S3Client } from '@aws-sdk/client-s3';

export default async function handle(req, res) {
    const client = new S3Client({region: 'us-east-1'});
    const form = new multiparty.Form();  // Corrected initialization
    const { fields, files } = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve({ fields, files });  // Corrected this line
        });
    });
    res.json({ fields, files });
    console.log(files);
}

export const config = {
    api: { bodyParser: false }
};
