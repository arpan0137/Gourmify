import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import uniqid from 'uniqid';

export async function POST(req) {//upload image to amazon aws-S3
    const data = await req.formData();
    if (data.get('file')) {
        // upload the file
        const file = data.get('file');
        const s3Client = new S3Client({
            region: 'ap-south-1',
            credentials: {
                accessKeyId: process.env.ACCESS_KEY,
                secretAccessKey: process.env.SECRET_KEY,
            },
        });

        const ext = file.name.split('.').slice(-1)[0]; //extract extension from filename
        const newFileName = uniqid() + '.' + ext; // will generate unique image name

        const chunks = [];
        for await (const chunk of file.stream()) {
            chunks.push(chunk);
        }
        const buffer = Buffer.concat(chunks);

        const bucket = 'gourmify';
        await s3Client.send(new PutObjectCommand({
            Bucket: bucket,
            Key: newFileName,
            ContentType: file.type,
            Body: buffer,
        }));


        const link = 'https://' + bucket + '.s3.amazonaws.com/' + newFileName;
        return NextResponse.json(link);
    }
    return NextResponse.json(false);
}