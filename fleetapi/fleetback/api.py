import json
import datetime

from flask import Flask, request
from flask_restful import Resource, Api, reqparse

app = Flask(__name__)
api = Api(app)

api_link = '/api/'

filename = 'fleets.json'

err = {"message": "Not found", "status": "1"}
suc = {"message": "Values saved succesfully", "status": "0"}

parser = reqparse.RequestParser()
parser.add_argument('eff_kpi', type=str)
parser.add_argument('ran_kpi', type=str)


class RESTApi(Resource):
    def get(self):
        return {'REST': 'api'}

class Fleets(Resource):
    def get(self):
        with open(filename) as file:
            data = json.loads(file.read())
            return data

class Fleet(Resource):
    def get(self, id):
        with open(filename) as file:
            data = json.loads(file.read())
            return data[id]

class FleetField(Resource):
    def get(self, id, field):
        with open(filename) as file:
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
        with open(filename) as file:
            data = json.loads(file.read())
            drivers = []
            for fleet in data.keys():
                drivers.extend(data[fleet]['drivers'])
        return drivers

class Driver(Resource):
    def get(self, driverid):
        with open(filename) as file:
            data = json.loads(file.read())
            return self._fetch_driver(data, driverid) or err
        return err

    def post(self, driverid):
        with open(filename, 'r') as file:
            data = json.loads(file.read())
            driver = self._fetch_driver(data, driverid)
            args = parser.parse_args()
            if args['eff_kpi']:
                driver['eff_kpi'].append({
                    'time': str(datetime.datetime.now()),
                    'value': args['eff_kpi']
                    })
            if args['ran_kpi']:
                driver['ran_kpi'].append({
                    'time': str(datetime.datetime.now()),
                    'value': args['ran_kpi']
                    })
        with open(filename, 'w') as file:
            json.dump(data, file, indent=4, sort_keys=True)

        return suc

    def _fetch_driver(self, data, driverid):
        for fleet in data.keys():
            for driver in data[fleet]['drivers']:
                if driver['driverid'] == driverid:
                    return driver
        return None
    
    def _write_driver(self, data, new_driver, driverid):
        for fleet in data.keys():
            for driver in data[fleet]['drivers']:
                if driver['driverid'] == driverid:
                    return driver

class Trucks(Resource):
    def get(self):
        with open('fleets.json') as file:
            data = json.loads(file.read())
            trucks = []
            for fleet in data.keys():
                trucks.extend(data[fleet]['trucks'])
        return trucks

class Leaderboard(object):
    def update(self):
        pass

    def fetch(self):
        pass


    

# Api base
api.add_resource(RESTApi, api_link)

# Fleets
api.add_resource(Fleets, api_link + 'fleets/')
api.add_resource(Fleet, api_link + 'fleets/<string:id>/')
api.add_resource(FleetField, api_link + 'fleets/<string:driverid>/<string:field>')

# Drivers
api.add_resource(Drivers, api_link + 'drivers/')
api.add_resource(Driver, api_link + 'drivers/<string:driverid>/')

# Trucks
api.add_resource(Trucks, api_link + 'trucks/')


if __name__ == '__main__':
    leadboard = Leaderboard()
    app.run(debug=True)