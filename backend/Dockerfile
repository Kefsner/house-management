FROM python:3.11

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /backend

COPY ./backend .

RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

COPY ./backend/.env.example ./backend/.env

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]