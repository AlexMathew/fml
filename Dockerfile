FROM lambci/lambda:build-python3.7

RUN yum update -y 
RUN yum install default-libmysqlclient-dev python3-devel mysql-devel mariadb-devel gcc git -y
RUN pip install pipenv

RUN mkdir /code
ADD . /code/
WORKDIR /code

RUN pipenv install --system

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]