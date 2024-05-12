from typing import Union
import os
from fastapi import FastAPI, File, UploadFile
import boto3
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from typing_extensions import Annotated

load_dotenv()

s3_client = boto3.client('s3',
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
)
app = FastAPI()

origins = ['http://localhost:3000', 'https://localhost:3000']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/convert/')
async def convert(
    file: Annotated[UploadFile, File()]
):
    with open(f"tmp/{file.filename}", "wb") as buffer:
        buffer.write(file.file.read())

    try:
        filename = os.path.splitext(os.path.basename(file.filename))[0]
        convert_file_to_pdf(f"tmp/{file.filename}")
        upload_file(f"tmp/{filename}.pdf", os.getenv('BUCKET_NAME'), f"{filename}.pdf")
        presigned_url = create_presigned_url(os.getenv('BUCKET_NAME'), f"{filename}.pdf")
        if presigned_url == None:
            return JSONResponse(status_code=500, content={"message": "Internal server error"})
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": "Internal server error"})
    finally:
        file.file.close()
        os.remove(f"tmp/{file.filename}")
        os.remove(f"tmp/{filename}.pdf")

    return JSONResponse(status_code=200, content={"message": "File converted successfully", "url": presigned_url})


def convert_file_to_pdf(file_content):
    os.system(f"unoconv -f pdf {file_content}")
    return f"{file_content}.pdf"


def create_presigned_url(bucket_name, object_name, expiration=3600):
    response = s3_client.generate_presigned_url('get_object',
                                                Params={'Bucket': bucket_name,
                                                        'Key': object_name},
                                                ExpiresIn=expiration)
    return response

def upload_file(file_name, bucket, object_name=None):
    if object_name is None:
        object_name = os.path.basename(file_name)
    response = s3_client.upload_file(file_name, bucket, object_name)
    return response

if __name__ == '__main__':
    if not os.path.exists('tmp'):
        os.makedirs('tmp')
    import uvicorn
    uvicorn.run(app)
