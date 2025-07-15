FROM python:3.11

WORKDIR /code

COPY . .

RUN pip install --no-cache-dir -r requirements.txt

CMD ["fastapi", "run", "main.py", "--port", "8000"]