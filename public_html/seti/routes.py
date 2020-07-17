#!/home/c/cp36696/myenv/bin/python3
from flask import Flask, request, jsonify, render_template, flash, redirect, make_response, url_for
import time
from seti import seti
import requests
import json
from flask_cors import CORS
import random
import os
import json
import base64
import time
from flaskext.mysql import MySQL
from seti import db
from seti.models import routers, home_routers

CORS(seti)
application = seti

seti.config['SECRET_KEY'] = 'you never never never now this a really really really really long secret key'
seti.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://cp36696_hereseti:tZ7QLea8@localhost/cp36696_hereseti'
	
'''	
@seti.route('/js/<path:path>')
def send_js(path):
	return send_from_directory(r'templates/js', path)


@seti.route('/css/<path:path>')
def send_css(path):
	return send_from_directory(r'templates/css', path)
'''	


	
@seti.route('/getzero', methods = ['GET'])
def getzero():
	all_obj = eval(str(routers.query.all()))  
	#all_obj = eval(str(home_routers.query.all())) 
	for obj in all_obj: 
		id = obj['id']
		router =  routers.query.get(id)
		router.inf_count = 0
		db.session.commit()
	return jsonify({"result" : 'good'})



def send_inf_rout(id):
	def information_send(route_id, gigabytes):
		gigs = gigabytes
		rout_obj = home_routers.query.get(route_id)
		if rout_obj != None:
			rout_obj.inf_count += gigabytes 
			db.session.commit()
		else:
			rout_obj = routers.query.get(route_id)
			rout_obj.inf_count += gigabytes 
			db.session.commit()
	gigabytes = random.randrange(0, 100, 10)
	
	while id != 0: 
		information_send(id, gigabytes)
		if routers.query.get(id):
			id = routers.query.get(id).connect_id
			
		else:
			id = home_routers.query.get(id).connect_id
			



@seti.route('/send_inf', methods = ['GET', 'POST'])
def send_ind_rout():
	all_home_routers  =  eval(str(home_routers.query.all()))
	for router in all_home_routers: 
		send_inf_rout(router['id'])
	return jsonify({"result" : 'good'})



@seti.route('/', methods = ['GET', 'POST'])
def index():
	return render_template('index.html')
	


@seti.route('/api/db/add_router', methods = ['GET', 'POST'])
def router():
	data = request.data
	json = eval(data)
	latitude = str(json["lat"])
	longitude = str(json["lng"])
	model = str(json["model"]) 
	connect_id = str(json["connect_id"])
	on_off = str(json["on_off"])
	Type = str(json["Type"])
	inf_count = str(json["inf_count"])
	smotr = str(json["smotr"])
	type_of_cabel = str(json["type_of_cabel"])
	type_of_connection = str(json["type_of_connection"])
	db.session.add(routers(latitude, longitude, model, connect_id, on_off, Type, inf_count, smotr, type_of_cabel, type_of_connection))
	db.session.commit()
	db.session.close()
	json = eval(str(db.session.query(routers).order_by(routers.id.desc()).first()))
	return jsonify({"result" : json['id']})
	
@seti.route('/api/db/add_home_router', methods = ['GET', 'POST'])
def home_router():
	data = request.data
	json = eval(data)
	model = str(json["model"]) 
	connect_id = str(json["connect_id"])
	on_off = str(json["on_off"])
	Type = str(json["Type"])
	inf_count = str(json["inf_count"])
	type_of_cabel = str(json["type_of_cabel"])
	type_of_connection = str(json["type_of_connection"])
	db.session.add(home_routers(model, connect_id, on_off, Type, inf_count, type_of_cabel, type_of_connection))
	db.session.commit()
	db.session.close()
	json = eval(str(db.session.query(home_routers).order_by(home_routers.id.desc()).first()))
	return jsonify({"result" : json['id']})
	
@seti.route('/api/db/update_router', methods = ['GET', 'POST'])
def update_router():
	data = request.data
	json = eval(data)
	ID = str(json["id"])
	latitude = str(json["lat"])
	longitude = str(json["lng"])
	model = str(json["model"])
	connect_id = str(json["connect_id"])
	on_off = str(json["on_off"])
	Type = str(json["Type"])
	inf_count = str(json["inf_count"])
	smotr = str(json["smotr"])
	type_of_cabel = str(json["type_of_cabel"])
	type_of_connection = str(json["type_of_connection"])
	if ID:
		device = routers.query.get(ID)
	if latitude:
		device.latitude = latitude
	if longitude:
		device.longitude = longitude
	if model:
		device.model = model
	if connect_id:
		device.connect_id = connect_id
	if on_off:
		device.on_off = on_off
	if Type:
		device.Type = Type
	if inf_count:
		device.inf_count = inf_count
	if smotr:
		device.smotr = smotr
	if type_of_cabel:
		device.type_of_cabel = type_of_cabel
	if type_of_connection:
		device.type_of_connection = type_of_connection
	db.session.commit()
	db.session.close()
	return jsonify({"result" : "good"})
	
@seti.route('/api/db/update_home_router', methods = ['GET', 'POST'])
def update_home_router():
	data = request.data
	json = eval(data)
	ID = str(json["id"])
	model = str(json["model"])
	connect_id = str(json["connect_id"])
	on_off = str(json["on_off"])
	Type = str(json["Type"])
	inf_count = str(json["inf_count"])
	type_of_cabel = str(json["type_of_cabel"])
	type_of_connection = str(json["type_of_connection"])
	if ID:
		device = home_routers.query.get(ID)
	if model:
		device.model = model
	if connect_id:
		device.connect_id = connect_id
	if on_off:
		device.on_off = on_off
	if Type:
		device.Type = Type
	if inf_count:
		device.inf_count = inf_count
	if type_of_cabel:
		device.type_of_cabel = type_of_cabel
	if type_of_connection:
		device.type_of_connection = type_of_connection
	db.session.commit()
	db.session.close()
	return jsonify({"result" : "good"})

@seti.route('/api/db/view_routers', methods=['GET'])
def view_device():
    devices = eval(str(routers.query.all()))  
    filt = request.args.get('filter', default = "all", type = str)
    if filt != "all":
    	devices = [dev for dev in devices if dev["Type"] == filt]
    	return jsonify(devices)
    else:
    	return jsonify(devices)
    	
@seti.route('/api/db/view_home_routers', methods=['GET'])
def view_home_routers():
    devices = eval(str(home_routers.query.all()))
    filt = request.args.get('connect_id', default = 0, type = int)
    if filt != 0:
    	devices = [dev for dev in devices if dev["connect_id"] == filt]
    	return jsonify(devices)
    else:
    	return jsonify(devices)
    return jsonify(devices)


@seti.route('/api/db/view_by_id/<ID>', methods=['GET'])
def view_by_id(ID):
	if eval(str(routers.query.get(ID))) != None:
		return jsonify(eval(str(routers.query.get(ID))))
	else:
		return jsonify({"result" : "fail"})
		
@seti.route('/api/db/view_home_by_id/<ID>', methods=['GET'])
def view_home_by_id(ID):
	if eval(str(home_routers.query.get(ID))) != None:
		return jsonify(eval(str(home_routers.query.get(ID))))
	else:
		return jsonify({"result" : "fail"})


@seti.route('/api/db/delete_home_by_id/<ID>', methods=['GET'])
def delete_home_by_id(ID):
	db.session.delete(home_routers.query.get(ID))
	db.session.commit()
	db.session.close()
	return jsonify({"result" : "good"})

@seti.route('/api/db/delete_by_id/<ID>', methods=['GET'])
def delete_by_id(ID):
	device = routers.query.get(ID)
	if device.on_off == 1:
		per = 0
		device.on_off = per
	else:
		per = 1
		device.on_off = per
	if device.Type == "provider_server":
		for i in range(100):
			dev = routers.query.get(i)
			if dev:
				dev.on_off = per
		for j in range(100):
			devi = home_routers.query.get(j)
			if devi:
				devi.on_off = per
	
	if device.Type == "raion_commutator":
		for i in range(100):
			dev = routers.query.get(i)
			if dev:
				if dev.connect_id == device.id:
					dev.on_off = per
					if dev.Type == "house_commutator":
						for j in range(100):
							devi = home_routers.query.get(j)
							if devi:
								if devi.connect_id == dev.id:
									devi.on_off = per
	
	if device.Type == "house_commutator":
		for j in range(100):
			devi = home_routers.query.get(j)
			if devi:
				if devi.connect_id == device.id:
					devi.on_off = per
					
	db.session.delete(routers.query.get(ID))
	db.session.commit()
	db.session.close()
	return jsonify({"result" : "good"})

def on_of(ID):
	device = routers.query.get(ID)
	if device.on_off == 1:
		per = 0
		device.on_off = per
	else:
		per = 1
		device.on_off = per
	devices = eval(str(routers.query.all()))
	devices = [dev for dev in devices if dev["connect_id"] == ID]
	for dev in devices:
		on_of(dev.id)

@seti.route('/api/db/o_off/<ID>', methods=['GET'])
def o_off(ID):
	s = on_of(ID)
	return jsonify({"result" : s})

@seti.route('/api/db/off/<ID>', methods=['GET'])
def off(ID):
	device = routers.query.get(ID)
	if device.on_off == 1:
		per = 0
		device.on_off = per
	else:
		per = 1
		device.on_off = per
		
	if device.Type == "provider_server":
		for i in range(100):
			devic = routers.query.get(i)
			if devic:
				if devic.Type == "raion_commutator":
					if devic.connect_id == device.id:
						devic.on_off = per
						for g in range(100):
							rou = home_routers.query.get(g)
							if rou:
								if rou.connect_id == devic.id:
									rou.on_off = per
						for i in range(100):
							dev = routers.query.get(i)
							if dev:
								if dev.connect_id == devic.id:
									dev.on_off = per
									if dev.Type == "house_commutator":
										for j in range(100):
											devi = home_routers.query.get(j)
											if devi:
												if devi.connect_id == dev.id:
													devi.on_off = per


	if device.Type == "raion_commutator":
		for g in range(100):
			rou = home_routers.query.get(g)
			if rou:
				if rou.connect_id == device.id:
					rou.on_off = per
		for i in range(100):
			dev = routers.query.get(i)
			if dev:
				if dev.connect_id == device.id:
					dev.on_off = per
					if dev.Type == "house_commutator":
						for j in range(100):
							devi = home_routers.query.get(j)
							if devi:
								if devi.connect_id == dev.id:
									devi.on_off = per
	
	if device.Type == "house_commutator":
		for j in range(100):
			devi = home_routers.query.get(j)
			if devi:
				if devi.connect_id == device.id:
					devi.on_off = per
					
	db.session.commit()
	db.session.close()
	return jsonify({"result" : "good"})
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	