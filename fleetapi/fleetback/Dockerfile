FROM python:3

WORKDIR /app

ADD . ./

RUN pip install -r requirements.txt
RUN chmod -R a+rw .

ENV FLASK_APP=api.py

CMD [ "python3", "-m", "flask", "run", "--host=0.0.0.0" ]
