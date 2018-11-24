import json

from flask import Flask, request
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)

api_link = '/api/'

err = {"message":"Not found"}

class RESTApi(Resource):
    def get(self):
        return {'REST': 'api'}

class Fleets(Resource):
    def get(self):
        with open('fleets.json') as file:
            data = json.loads(file.read())
            return data

class Fleet(Resource):
    def get(self, id):
        with open('fleets.json') as file:
            data = json.loads(file.read())
            print(request.args['parameters'])
            if request.args['parameters']:
                return data[id]['parameters'] or err
            elif request.args['drivers']:
                return data[id]['drivers'] or err
            elif request.args['trucks']:
                return data[id]['trucks'] or err
            return data[id]

class FleetField(Resource):
    def get(self, id, field):
        with open('fleets.json') as file:
            data = json.loads(file.read())
            if field == 'properties':
                return data[id]['properties'] or err
            elif field =='drivers':
                return data[id]['drivers'] or err
            elif field == 'trucks':
                return data[id]['trucks'] or err
            else:
                return err

class Drivers(Resource):
    def get(self):
        with open('fleets.json') as file:
            data = json.loads(file.read())
            drivers = []
            for fleet in data.keys():
                drivers.extend(data[fleet]['drivers'])
        return drivers

class Driver(Resource):
    def get(self, id):
        with open('fleets.json') as file:
            data = json.loads(file.read())
            for fleet in data.keys():
                for driver in data[fleet]['drivers']:
                    print(driver)
                    if driver['driverid'] == id:
                        return driver
        return err

class Trucks(Resource):
    def get(self):
        with open('fleets.json') as file:
            data = json.loads(file.read())
            trucks = []
            for fleet in data.keys():
                trucks.extend(data[fleet]['trucks'])
        return trucks

# Api base
api.add_resource(RESTApi, api_link)

# Fleets
api.add_resource(Fleets, api_link + 'fleets/')
api.add_resource(Fleet, api_link + 'fleets/<string:id>/')
api.add_resource(FleetField, api_link + 'fleets/<string:id>/<string:field>')

# Drivers
api.add_resource(Drivers, api_link + 'drivers/')
api.add_resource(Driver, api_link + 'drivers/<string:id>/')

# Trucks
api.add_resource(Trucks, api_link + 'trucks/')


if __name__ == '__main__':
    app.run(debug=True)