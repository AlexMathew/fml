FROM python:3.7-slim

ENV PYTHONUNBUFFERED 1
ENV LC_ALL C.UTF-8
ENV LANG C.UTF-8

RUN apt-get update -y 
RUN apt-get install default-libmysqlclient-dev gcc git -y
RUN pip install pipenv

RUN mkdir /code
ADD . /code/
WORKDIR /code

RUN pipenv install --system

EXPOSE 8800

COPY ./start.sh /code/
ENTRYPOINT ["/code/start.sh"]